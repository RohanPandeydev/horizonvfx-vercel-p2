import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '../lib/crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash password
  const password = 'Admin@123';
  const hashedPassword = await bcrypt.hash(password, 12);

  // Encrypt sensitive data
  const email = 'rohan.kr.pandey2.0@gmail.com';
  const encryptedEmail = encrypt(email);
  const encryptedFirstName = encrypt('Rohan');
  const encryptedLastName = encrypt('Pandey');

  // Check if admin user already exists
  const allUsers = await prisma.user.findMany();
  const existingAdmin = allUsers.find(user => {
    try {
      return decrypt(user.email) === email;
    } catch {
      return false;
    }
  });

  let admin;
  if (existingAdmin) {
    // Update existing admin
    admin = await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        password: hashedPassword,
        firstName: encryptedFirstName,
        lastName: encryptedLastName,
        role: 'admin',
        emailVerified: true,
      },
    });
    console.log('✅ Admin user updated successfully!');
  } else {
    // Create admin user
    admin = await prisma.user.create({
      data: {
        email: encryptedEmail,
        password: hashedPassword,
        firstName: encryptedFirstName,
        lastName: encryptedLastName,
        role: 'admin',
        emailVerified: true,
      },
    });
    console.log('✅ Admin user created successfully!');
  }

  console.log('📧 Email:', email);
  console.log('🔑 Password: Admin@123');
  console.log('👤 Name: Rohan Pandey');
  console.log('👤 Role: admin');
  console.log('🆔 User ID:', admin.id);
  console.log('🔒 Data is encrypted in database');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
