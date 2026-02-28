#!/usr/bin/env node

const crypto = require('crypto');

/**
 * Generate secure random strings for environment variables
 * Run this script to get values for your Vercel environment variables
 */

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

console.log('🔐 Generated Environment Variables for Vercel:\n');
console.log('Copy these values to your Vercel project environment variables:\n');

console.log('========================================');
console.log('Required Environment Variables:');
console.log('========================================\n');

console.log('# JWT Secrets');
console.log(`JWT_ACCESS_SECRET="${generateSecret(48)}"`);
console.log(`JWT_REFRESH_SECRET="${generateSecret(48)}"`);
console.log('');

console.log('# Encryption Secret (minimum 32 characters)');
console.log(`ENCRYPTION_SECRET="${generateSecret(48)}"`);
console.log('');

console.log('# Token Expiration (optional, defaults shown)');
console.log('ACCESS_TOKEN_EXPIRES_IN="15m"');
console.log('REFRESH_TOKEN_EXPIRES_IN="7d"');
console.log('');

console.log('========================================');
console.log('\nAfter deploying, update these:');
console.log('========================================\n');
console.log('# Frontend URL (update with your actual domain)');
console.log('FRONTEND_URL="https://your-project.vercel.app"');
console.log('');

console.log('========================================');
console.log('\nOptional Email Configuration (SMTP):');
console.log('========================================\n');
console.log('# For password reset emails');
console.log('SMTP_HOST="smtp.gmail.com"');
console.log('SMTP_PORT="587"');
console.log('SMTP_USER="your-email@gmail.com"');
console.log('SMTP_PASSWORD="your-app-specific-password"');
console.log('EMAIL_FROM="noreply@your-project.vercel.app"');
console.log('');

console.log('========================================');
console.log('\nS3/Storage Configuration:');
console.log('========================================\n');
console.log('# AWS S3 or Cloudflare R2 credentials');
console.log('AWS_ACCESS_KEY_ID="your-access-key"');
console.log('AWS_SECRET_ACCESS_KEY="your-secret-key"');
console.log('AWS_REGION="us-east-1"');
console.log('AWS_S3_BUCKET="your-bucket-name"');
console.log('');

console.log('========================================');
console.log('\nDatabase Configuration:');
console.log('========================================\n');
console.log('# These will be automatically set by Vercel Postgres');
console.log('# DATABASE_URL and DIRECT_URL are set automatically');
console.log('# when you add the Postgres database in Vercel dashboard');
console.log('');
