import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/middleware';
import { decrypt } from '@/lib/crypto';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);

    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status || 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: authResult.user!.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Decrypt sensitive fields for response
    const decryptedUser = {
      ...user,
      email: decrypt(user.email),
      firstName: user.firstName ? decrypt(user.firstName) : null,
      lastName: user.lastName ? decrypt(user.lastName) : null,
    };

    return NextResponse.json(
      { user: decryptedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
