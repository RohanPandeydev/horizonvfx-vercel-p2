import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/crypto';
import { verifyPassword } from '@/lib/auth';

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json({ error: 'No users in database' });
    }

    const user = users[0];
    const testEmail = 'rohan.kr.pandey2.0@gmail.com';
    const testPassword = 'Admin@123';

    let decryptedEmail = '';
    let decryptError = null;

    try {
      decryptedEmail = decrypt(user.email);
    } catch (e) {
      decryptError = String(e);
    }

    let passwordValid = false;
    let passwordError = null;

    try {
      passwordValid = await verifyPassword(testPassword, user.password);
    } catch (e) {
      passwordError = String(e);
    }

    return NextResponse.json({
      userCount: users.length,
      userRole: user.role,
      encryptedEmailLength: user.email.length,
      decryptedEmail,
      decryptError,
      emailMatch: decryptedEmail === testEmail,
      passwordValid,
      passwordError,
      encryptionSecretLength: process.env.ENCRYPTION_SECRET?.length,
      hasEncryptionSecret: !!process.env.ENCRYPTION_SECRET,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
