# 🚀 Quick Vercel Deployment Guide

## One-Command Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel
```

## 📝 Setup Steps

### 1️⃣ Generate Environment Secrets

```bash
pnpm generate-secrets
```

Copy the output and add to Vercel environment variables.

### 2️⃣ Deploy & Add Database

1. Push code to GitHub
2. Import in Vercel
3. Add Vercel Postgres database
4. Add environment variables from step 1

### 3️⃣ Add Required Environment Variables in Vercel

Go to: **Settings → Environment Variables**

**Required:**
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ENCRYPTION_SECRET`
- `DATABASE_URL` (auto-added by Vercel Postgres)
- `DIRECT_URL` (auto-added by Vercel Postgres)

**Optional:**
- `FRONTEND_URL` (update with your Vercel URL)
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`

### 4️⃣ Redeploy

After adding environment variables, trigger a redeploy from Vercel dashboard.

## ✅ Verification

After deployment:

1. Visit your Vercel URL
2. Go to `/admin/login`
3. Login with:
   - Email: `admin@horizonvfx.com`
   - Password: `Admin@123`

## 📚 Full Documentation

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔧 Local Development with Production Database

```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# Run development server
pnpm dev
```

## 🗄️ Database Management

```bash
# View database in Prisma Studio
pnpm db:studio

# Push schema changes
pnpm db:push

# Seed database
pnpm db:seed
```

## 🐛 Troubleshooting

**Build fails?**
- Check all environment variables are set
- Verify DATABASE_URL is present

**Can't login?**
- Run `pnpm db:seed` to create admin user
- Check database connection

**File uploads not working?**
- Verify S3 credentials
- Check bucket permissions

---

**Need help?** Check [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
