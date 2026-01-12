import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateTokens } from '@/lib/auth';
import { validateLogin } from '@/lib/validation';
import { decrypt } from '@/lib/crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Find user (need to check all users and decrypt emails to match)
    const allUsers = await prisma.user.findMany();
    const user = allUsers.find(u => {
      try {
        return decrypt(u.email) === email.toLowerCase();
      } catch {
        return false;
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Decrypt email for token
    const decryptedEmail = decrypt(user.email);

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: decryptedEmail,
      role: user.role,
    });

    // Calculate expiration dates
    const accessExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store tokens in database
    await prisma.token.createMany({
      data: [
        {
          token: tokens.accessToken,
          userId: user.id,
          type: 'access',
          expiresAt: accessExpiresAt,
        },
        {
          token: tokens.refreshToken,
          userId: user.id,
          type: 'refresh',
          expiresAt: refreshExpiresAt,
        },
      ],
    });

    // Return user data and tokens (decrypt fields for response)
    const { password: _, ...userWithoutPassword } = user;
    const decryptedUser = {
      ...userWithoutPassword,
      email: decryptedEmail,
      firstName: user.firstName ? decrypt(user.firstName) : null,
      lastName: user.lastName ? decrypt(user.lastName) : null,
    };

    return NextResponse.json(
      {
        message: 'Login successful',
        user: decryptedUser,
        ...tokens,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
