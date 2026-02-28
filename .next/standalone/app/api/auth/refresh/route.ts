import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, generateTokens } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Verify refresh token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Check if refresh token exists in database
    const storedToken = await prisma.token.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.type !== 'refresh') {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      // Delete expired token
      await prisma.token.delete({
        where: { token: refreshToken },
      });
      return NextResponse.json(
        { error: 'Refresh token expired' },
        { status: 401 }
      );
    }

    // Generate new tokens
    const newTokens = generateTokens({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    // Calculate expiration dates
    const accessExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store new access token in database
    await prisma.token.create({
      data: {
        token: newTokens.accessToken,
        userId: payload.userId,
        type: 'access',
        expiresAt: accessExpiresAt,
      },
    });

    // Update refresh token (delete old, create new)
    await prisma.token.delete({
      where: { token: refreshToken },
    });

    await prisma.token.create({
      data: {
        token: newTokens.refreshToken,
        userId: payload.userId,
        type: 'refresh',
        expiresAt: refreshExpiresAt,
      },
    });

    return NextResponse.json(
      {
        message: 'Token refreshed successfully',
        ...newTokens,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
