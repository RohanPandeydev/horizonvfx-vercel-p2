# Vercel Deployment Guide

This guide will walk you through deploying your HorizonVFX application to Vercel with automatic database setup, storage configuration, and environment variables.

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account (sign up at [vercel.com](https://vercel.com))
- AWS S3 or Cloudflare R2 account for file storage (optional but recommended)

## 🚀 Quick Start Deployment

### Step 1: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click **"Deploy"**

Vercel will automatically detect Next.js and deploy your application.

### Step 2: Set Up Database (Vercel Postgres)

1. After deployment, go to your project dashboard
2. Click **"Storage"** tab in the top navigation
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Click **"Continue"** and then **"Create"**

Vercel will automatically set these environment variables:
- `DATABASE_URL`
- `DIRECT_URL`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- etc.

### Step 3: Generate Environment Variables

1. Open your terminal in the project root
2. Run the secret generator:
   ```bash
   node scripts/generate-secrets.js
   ```
3. Copy the generated values

### Step 4: Add Environment Variables in Vercel

1. Go to **"Settings"** → **"Environment Variables"**
2. Add the following variables:

**Required Variables:**
```bash
JWT_ACCESS_SECRET=<paste from generator>
JWT_REFRESH_SECRET=<paste from generator>
ENCRYPTION_SECRET=<paste from generator>
```

**Optional Variables (with defaults):**
```bash
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

**Frontend URL (update after deployment):**
```bash
FRONTEND_URL=https://your-project.vercel.app
```

**Email (optional - for password reset):**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@your-project.vercel.app
```

**S3/Storage (if using file uploads):**
```bash
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
S3_PRESIGNED_URL_EXPIRES_IN=300
S3_PRESIGNED_GET_URL_EXPIRES_IN=3600
```

3. Click **"Save"** after adding each variable
4. Click **"Redeploy"** to apply changes

### Step 5: Set Up Database Tables

1. Go to **"Storage"** → **"Postgres"**
2. Click **"Query"** tab
3. Click **"Browse"** to see your tables
4. The tables will be automatically created on first deployment

**Alternative:** Run migrations manually:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Pull environment variables
vercel env pull .env.local

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database (creates admin user)
npx prisma db seed
```

### Step 6: Configure S3 Storage (Optional)

For file uploads, you need to set up S3 or compatible storage:

**Option A: AWS S3**
1. Create an AWS account
2. Go to S3 and create a bucket
3. Create an IAM user with S3 access
4. Add credentials to Vercel environment variables

**Option B: Cloudflare R2 (Recommended - Free)**
1. Create a Cloudflare account
2. Go to R2 and create a bucket
3. Create an API token
4. Use R2 credentials in environment variables
5. Update `next.config.ts` to add R2 hostname:
   ```typescript
   {
     protocol: 'https',
     hostname: '*.r2.cloudflarestorage.com',
   }
   ```

### Step 7: Update Image Domains

If using S3/R2, update [next.config.ts](next.config.ts):

```typescript
images: {
  remotePatterns: [
    // ... existing patterns
    {
      protocol: 'https',
      hostname: '*.amazonaws.com', // For AWS S3
    },
    // OR
    {
      protocol: 'https',
      hostname: '*.r2.cloudflarestorage.com', // For Cloudflare R2
    },
  ],
}
```

## 🔐 Default Admin Credentials

After seeding the database, you can login with:

**Email:** `admin@horizonvfx.com`
**Password:** `Admin@123`

⚠️ **Important:** Change these credentials immediately after first login!

## 📱 Post-Deployment Checklist

- [ ] Database is connected and tables are created
- [ ] Environment variables are all set
- [ ] Admin login works
- [ ] File uploads work (if S3 is configured)
- [ ] Test all API routes
- [ ] Update `FRONTEND_URL` to your production domain
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## 🔄 Automatic Deployments

Vercel will automatically deploy when you push to your main branch:
- Push to `main` → Production deployment
- Push to other branches → Preview deployment

## 🐛 Troubleshooting

### Build Errors

**"Invalid environment variables"**
- Check all required environment variables are set in Vercel dashboard
- Ensure `DATABASE_URL` and `DIRECT_URL` are set by Vercel Postgres

**"Prisma Client initialization error"**
- Make sure DATABASE_URL is correct
- Run `npx prisma generate` during build

### Runtime Errors

**Database connection issues**
- Verify DATABASE_URL in Vercel environment variables
- Check Vercel Postgres is properly linked to your project

**CORS errors**
- Update `FRONTEND_URL` to match your production domain
- Check CORS settings in API routes

**File upload failures**
- Verify S3 credentials are correct
- Check S3 bucket permissions
- Ensure bucket region matches `AWS_REGION`

### Reset Everything

If you need to start fresh:

```bash
# Delete all tables
vercel postgres reset

# Re-run migrations
npx prisma db push

# Re-seed database
npx prisma db seed
```

## 📊 Monitoring

Vercel provides built-in monitoring:
- **Analytics**: View traffic and performance
- **Logs**: Check deployment and function logs
- **Speed Insights**: Monitor Core Web Vitals

Access these from your project dashboard.

## 🎯 Custom Domain

1. Go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `FRONTEND_URL` environment variable

## 💡 Best Practices

1. **Never commit** `.env.local` or `.env` files
2. **Use different** secrets for production and development
3. **Rotate secrets** periodically
4. **Monitor** Vercel logs regularly
5. **Set up** alerts for build failures
6. **Use preview deployments** for testing

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Vercel Guide](https://www.prisma.io/docs/guides/deployment/vercel)

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Check database connectivity
4. Review Prisma schema matches database
5. Contact support or create an issue in GitHub

---

**Deployment Complete!** 🎉

Your application is now live on Vercel with automatic database setup, secure authentication, and file storage support.
