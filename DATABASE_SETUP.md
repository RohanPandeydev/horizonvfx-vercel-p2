# Database Setup Guide for HorizonVFX

## Option 1: SQLite (Recommended for Local Development)

SQLite is the **easiest option** - no installation required, just a file-based database.

### Steps:

1. **Change Prisma schema to SQLite:**

   Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update `.env` file:**
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Run Prisma commands:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Done!** Your database is a file called `dev.db` in the project folder.

---

## Option 2: PostgreSQL (Production-Ready)

### For Windows (since you're on Windows):

#### Method A: Install PostgreSQL Locally

1. **Download PostgreSQL Installer:**
   - Go to: https://www.postgresql.org/download/windows/
   - Download the latest version (16.x recommended)
   - Run the installer

2. **During Installation:**
   - Set a password for the `postgres` user (remember this!)
   - Keep default port `5432`
   - Ensure pgAdmin 4 is installed (optional GUI tool)

3. **Create a database:**
   - Open **pgAdmin 4** (installed with PostgreSQL)
   - Right-click on "Databases" → "Create Database"
   - Name it: `horizonvfx`
   - Click "Save"

4. **Update `.env` with your credentials:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/horizonvfx?schema=public"
   ```
   Replace `YOUR_PASSWORD` with the password you set during installation.

5. **Run Prisma commands:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

#### Method B: Use Docker (Alternative)

If you have Docker installed:

```bash
docker run --name horizonvfx-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=horizonvfx -p 5432:5432 -d postgres:16
```

Then update `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/horizonvfx?schema=public"
```

---

## Option 3: Cloud PostgreSQL (Easiest, No Installation)

### Supabase (Free, Recommended)

1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up/login
4. Create new project → name: `horizonvfx`
5. Wait for setup (~2 minutes)
6. Go to: Project Settings → Database
7. Copy the **Connection String**
8. Update `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

### Neon (Free, Serverless)

1. Go to: https://neon.tech
2. Sign up and create project
3. Copy connection string
4. Update `.env`:
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[database]?sslmode=require"
   ```

---

## Quick Start (My Recommendation)

**For local development, use SQLite:**

1. I'll update your configuration to SQLite
2. Run `npx prisma generate`
3. Run `npx prisma db push`
4. Start coding immediately!

When you're ready for production, switch to PostgreSQL (Supabase is great).

---

## Troubleshooting

### PostgreSQL Connection Issues
- Ensure PostgreSQL service is running:
  - Windows: Search "Services" → find "postgresql-x64-16" → Start
- Check firewall is not blocking port 5432
- Verify password in connection string

### Prisma Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# View database in Prisma Studio
npx prisma studio
```

---

## Next Steps

Let me know which option you want:
- **Option 1**: SQLite (easiest, I'll set it up now)
- **Option 2**: Local PostgreSQL (I'll guide you through installation)
- **Option 3**: Cloud PostgreSQL (I'll help with Supabase/Neon)
