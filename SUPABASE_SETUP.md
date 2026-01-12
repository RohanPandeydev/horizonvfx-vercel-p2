# Quick Supabase Setup Guide

## Step 1: Create Supabase Account

1. Go to: **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub or Google (takes 30 seconds)

## Step 2: Create Your Project

1. Click **"New Project"**
2. Fill in:
   - **Name**: `horizonvfx`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you (e.g., Singapore for India)
3. Click **"Create new project"**
4. Wait ~2 minutes for it to set up

## Step 3: Get Database URL

1. Once ready, go to: **Project Settings** (gear icon ⚙️)
2. Click **"Database"** in the left sidebar
3. Find **"Connection String"** section
4. Select **"URI"** tab
5. Copy the connection string - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

## Step 4: Update Your .env File

Replace the DATABASE_URL in your `.env` file with the Supabase connection string:

```env
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
```

**Important**: Change `postgres` to `postgres.xxxxx` format (the .xxxxx is your project ref)

## Step 5: Run Prisma Commands

Once you've updated the `.env` file, come back and I'll run:
```bash
npx prisma generate
npx prisma db push
```

---

## Need Help?

- Your project reference (xxxxx) is in the dashboard URL
- The database password is what you set when creating the project
- Copy the connection string directly from Supabase settings to avoid typos

**Let me know once you have the connection string!**
