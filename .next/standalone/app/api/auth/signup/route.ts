import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateTokens, generateVerificationToken } from '@/lib/auth';
import { validateSignUp } from '@/lib/validation';
import { encrypt, decrypt } from '@/lib/crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Validate input
    const validation = validateSignUp({ email, password, firstName, lastName });
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Encrypt email for database storage
    const encryptedEmail = encrypt(email.toLowerCase());

    // Check if user already exists (need to check with encryption)
    const allUsers = await prisma.user.findMany();
    const existingUser = allUsers.find(user => {
      try {
        return decrypt(user.email) === email.toLowerCase();
      } catch {
        return false;
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Encrypt sensitive fields
    const encryptedFirstName = firstName ? encrypt(firstName) : null;
    const encryptedLastName = lastName ? encrypt(lastName) : null;

    // Create user with encrypted data
    const user = await prisma.user.create({
      data: {
        email: encryptedEmail,
        password: hashedPassword,
        firstName: encryptedFirstName,
        lastName: encryptedLastName,
        verificationToken: generateVerificationToken(),
      },
    });

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: email.toLowerCase(),
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

    // Return user data and tokens (decrypt for response)
    const { password: _, ...userWithoutPassword } = user;
    const decryptedUser = {
      ...userWithoutPassword,
      email: decrypt(user.email),
      firstName: user.firstName ? decrypt(user.firstName) : null,
      lastName: user.lastName ? decrypt(user.lastName) : null,
    };

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: decryptedUser,
        ...tokens,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
