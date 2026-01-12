import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateResetToken } from '@/lib/auth';
import { decrypt } from '@/lib/crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Always return success to prevent email enumeration
    // Even if user doesn't exist, we return success
    if (!user) {
      return NextResponse.json(
        {
          message: 'If an account with this email exists, a password reset link has been sent',
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store reset token in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // Decrypt email for sending
    const decryptedEmail = decrypt(user.email);

    // In a real application, you would send an email here
    // For now, we'll just log it (or you can integrate with nodemailer, sendgrid, etc.)
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

    console.log('Password reset link:', resetLink);
    console.log('For email:', decryptedEmail);

    // TODO: Send email using your email service
    // await sendEmail({
    //   to: decryptedEmail,
    //   subject: 'Password Reset',
    //   html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`
    // });

    return NextResponse.json(
      {
        message: 'If an account with this email exists, a password reset link has been sent',
        // For development only, remove in production
        devMode: process.env.NODE_ENV !== 'production' ? { resetLink, email: decryptedEmail } : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
