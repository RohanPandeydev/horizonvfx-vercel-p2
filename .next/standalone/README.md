# HorizonVFX

A modern VFX company website built with Next.js 15, featuring a dynamic admin panel, authentication system, and media management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm installed (recommended) or npm/yarn
- Database (SQLite for local, PostgreSQL for production)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Generate secrets for local development
pnpm generate-secrets

# Set up database
pnpm db:push

# Seed database (creates admin user)
pnpm db:seed

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🔐 Default Admin Credentials

**Email:** `admin@horizonvfx.com`
**Password:** `Admin@123`

⚠️ **Important:** Change these credentials immediately after first login!

## 📦 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:push      # Push database schema
pnpm db:seed      # Seed database with initial data
pnpm db:studio    # Open Prisma Studio
pnpm generate-secrets  # Generate secure secrets for env vars
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

See [DEPLOY.md](./DEPLOY.md) for quick deployment guide or [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

**Quick Steps:**

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add Vercel Postgres database
4. Add environment variables (run `pnpm generate-secrets`)
5. Deploy!

### Environment Variables

Required for production:

```bash
# Database (auto-added by Vercel Postgres)
DATABASE_URL
DIRECT_URL

# Authentication
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
ENCRYPTION_SECRET

# Frontend URL
FRONTEND_URL

# S3 Storage (optional - for file uploads)
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET
```

See [.env.example](./.env.example) for all available variables.

## 🏗️ Project Structure

```
├── app/                  # Next.js app directory
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   └── (public pages)   # Public-facing pages
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   └── (public)        # Public components
├── lib/                # Utility functions
├── prisma/             # Database schema and migrations
└── public/             # Static assets
```

## 🗄️ Database

### Local Development

Uses SQLite by default. Database file: `prisma/dev.db`

### Production

Uses Vercel Postgres (PostgreSQL). Schema in `prisma/schema.production.prisma`

## 📝 Features

- ✅ Modern Next.js 15 with App Router
- ✅ Admin panel with authentication
- ✅ Dynamic page content management
- ✅ Media upload and management
- ✅ Contact form submissions
- ✅ JWT-based authentication
- ✅ Responsive design
- ✅ 3D animations with Three.js
- ✅ File upload with S3 integration

## 🔧 Tech Stack

- **Framework:** Next.js 15
- **UI:** React 19, Tailwind CSS
- **Database:** Prisma ORM
- **Authentication:** JWT
- **Storage:** AWS S3 / Cloudflare R2
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** GSAP, Framer Motion

## 📚 Documentation

- [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) - Complete Vercel deployment guide
- [DEPLOY.md](./DEPLOY.md) - Quick deployment reference
- [DATABASE_SETUP_GUIDE.md](./DATABASE_SETUP_GUIDE.md) - Database setup instructions
- [FILE_UPLOAD_GUIDE.md](./FILE_UPLOAD_GUIDE.md) - File upload configuration
- [S3_SETUP_GUIDE.md](./S3_SETUP_GUIDE.md) - S3 storage setup
- [ENCRYPTION_GUIDE.md](./ENCRYPTION_GUIDE.md) - Security and encryption

## 🐛 Troubleshooting

### Database Issues

```bash
# Reset database
rm prisma/dev.db
pnpm db:push
pnpm db:seed
```

### Build Issues

```bash
# Clean build
rm -rf .next node_modules
pnpm install
pnpm build
```

### Environment Variables

Ensure all required variables are set. Check `.env.example` for reference.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions, please refer to the documentation files or create an issue in the repository.

---

Built with ❤️ using Next.js and Vercel
