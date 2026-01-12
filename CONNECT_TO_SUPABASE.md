# Supabase Connection Troubleshooting

## Current Status
The Supabase database host cannot be reached. Please check the following:

## Steps to Fix:

### 1. Verify Your Supabase Project is Ready

1. Go to: https://supabase.com/dashboard
2. Check if your `horizonvfx` project shows as **"Active"** (not "Initializing")
3. If still initializing, wait 2-5 minutes

### 2. Get the CORRECT Connection String

1. In Supabase, go to **Project Settings** (⚙️ icon)
2. Click **"Database"** in left sidebar
3. Scroll to **"Connection String"** section
4. Select **"URI"** tab
5. Select **"Transaction"** mode (not Session)
6. Copy the connection string

### 3. Correct Connection String Format

It should look like:
```
postgresql://postgres.[PROJECT_REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**IMPORTANT**: The username format is `postgres.[PROJECT_REF]` not just `postgres`

Example for your project:
```
postgresql://postgres.izejbosxolttntmzjtsj:R0m@nreings1@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

Note the `.` (dot) between `postgres` and `izejbosxolttntmzjtsj`

### 4. Update .env

Replace the DATABASE_URL line with the CORRECT format from above.

### 5. Try Again

Once updated, run:
```bash
npx prisma db push
```

## Alternative: Test Connection in Beekeeper

You can also test the connection in Beekeeper Studio:
- Create new PostgreSQL connection
- Use credentials from connection string
- Test if it connects

## If Still Not Working

Check:
- Firewall/antivirus isn't blocking the connection
- You have internet access
- Supabase project is Active (not paused/suspended)
- Password doesn't have special characters that need URL encoding
