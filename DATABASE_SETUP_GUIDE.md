# Quick Database Setup for HorizonVFX

## Option 1: Use Beekeeper Studio (Recommended - You already have this!)

1. **Open Beekeeper Studio**

2. **Create a new connection:**
   - Click "New Connection"
   - Select "PostgreSQL"
   - Enter these details:
     - **Name**: HorizonVFX Dev
     - **Host**: localhost
     - **Port**: 5432
     - **User**: postgres
     - **Password**: postgres
     - **Database**: postgres (default database)

3. **Test Connection** and click "Save"

4. **Create the horizonvfx database:**
   - Connect to the database
   - Click on "Query" tab
   - Run this SQL:
     ```sql
     CREATE DATABASE horizonvfx;
     ```

5. **Verify database created:**
   - You should see "horizonvfx" in your databases list

6. **Run Prisma setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Option 2: Switch to SQLite (Easiest - No PostgreSQL needed!)

If PostgreSQL setup is too complex, we can use SQLite (file-based database):

1. I'll update your configuration to SQLite
2. Just run `npx prisma db push`
3. Done! Your database is a file

---

## Which option do you prefer?

**Option 1**: Use Beekeeper to set up PostgreSQL (better for production)
**Option 2**: Switch to SQLite (quickest, works with Beekeeper too)

Let me know and I'll complete the setup!
