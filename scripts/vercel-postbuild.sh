#!/bin/bash

# Vercel Post-Build Script
# This script runs after the build completes on Vercel

set -e

echo "🔧 Running post-build setup..."

# Check if we're in production
if [ "$NODE_ENV" = "production" ]; then
  echo "📊 Production environment detected"

  # Generate Prisma client
  echo "📦 Generating Prisma client..."
  npx prisma generate

  # Push database schema to Vercel Postgres
  # This will create/update tables automatically
  echo "🗄️  Setting up database schema..."
  npx prisma db push --skip-generate

  # Optional: Seed database with initial data
  # Uncomment the line below to enable seeding
  # npx prisma db seed

  echo "✅ Database setup complete"
else
  echo "🔍 Non-production environment, skipping database setup"
fi

echo "✨ Post-build setup complete!"
