import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/crypto';
import { verifyPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get all users
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    const user = users[0];
    const decryptedEmail = decrypt(user.email);

    // Test password
    const testPassword = 'Admin@123';
    const isPasswordValid = await verifyPassword(testPassword, user.password);

    return NextResponse.json({
      userCount: users.length,
      userEmail: decryptedEmail,
      userId: user.id,
      role: user.role,
      passwordTest: isPasswordValid,
      hasEncryptionSecret: !!process.env.ENCRYPTION_SECRET,
      encryptionSecretLength: process.env.ENCRYPTION_SECRET?.length || 0,
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return NextResponse.json(
      { error: 'Test failed', details: String(error) },
      { status: 500 }
    );
  }
}
