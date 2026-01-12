import { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export async function authenticate(request: NextRequest): Promise<{
  user?: AuthUser;
  error?: string;
  status?: number;
}> {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        error: 'Authorization token required',
        status: 401,
      };
    }

    const accessToken = authHeader.substring(7);

    // Verify token
    let payload;
    try {
      payload = verifyAccessToken(accessToken);
    } catch (error) {
      return {
        error: 'Invalid or expired token',
        status: 401,
      };
    }

    // Check if token exists in database
    const storedToken = await prisma.token.findUnique({
      where: { token: accessToken },
    });

    if (!storedToken || storedToken.type !== 'access') {
      return {
        error: 'Invalid token',
        status: 401,
      };
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      // Delete expired token
      await prisma.token.delete({
        where: { token: accessToken },
      });
      return {
        error: 'Token expired',
        status: 401,
      };
    }

    return {
      user: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      error: 'Authentication failed',
      status: 500,
    };
  }
}

export async function requireAuth(request: NextRequest): Promise<{
  user: AuthUser;
} | never> {
  const result = await authenticate(request);

  if (result.error) {
    const error = new Error(result.error);
    (error as any).status = result.status;
    throw error;
  }

  return { user: result.user! };
}

export function requireRole(allowedRoles: string[]) {
  return async (request: NextRequest) => {
    const result = await requireAuth(request);

    if (!allowedRoles.includes(result.user.role)) {
      const error = new Error('Insufficient permissions');
      (error as any).status = 403;
      throw error;
    }

    return result;
  };
}
