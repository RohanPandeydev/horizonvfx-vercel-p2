# HorizonVFX - Full Stack Project Structure

## 📁 Folder Structure

```
horizonvfx_frontend/
├── app/                      # Next.js App Router
│   ├── (website)/           # Website routes group
│   │   ├── about/
│   │   ├── contact/
│   │   ├── showcase/
│   │   ├── team/
│   │   ├── page.tsx        # Homepage (/)
│   │   └── layout.tsx      # Website layout
│   │
│   ├── admin/              # Admin routes (/admin/*)
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── media/
│   │   ├── pages/
│   │   ├── settings/
│   │   ├── team/
│   │   └── layout.tsx
│   │
│   ├── api/                # API Routes (/api/*)
│   │   ├── auth/          # Authentication endpoints
│   │   ├── content/       # Content management
│   │   └── media/         # Media upload/management
│   │
│   └── globals.css
│
├── components/             # React Components
│   ├── website/          # Website-specific components
│   ├── admin/            # Admin-specific components
│   └── shared/           # Shared/reusable components
│
├── lib/                   # Utilities & Helpers
│   ├── api/             # API clients
│   ├── auth/            # Auth utilities
│   ├── db/              # Database utilities
│   ├── utils/           # General helpers
│   └── validations/     # Zod schemas
│
├── prisma/               # Database
│   └── schema.prisma    # Database schema
│
├── public/              # Static assets
│   └── logo.svg
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── tailwind.config.ts
```

## 🚀 Routes

### Website Routes (Public)
- `/` - Homepage
- `/about` - About page
- `/showcase` - Portfolio/Showcase
- `/team` - Team page
- `/contact` - Contact page

### Admin Routes (Protected)
- `/admin` - Admin section
- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard
- `/admin/media` - Media library
- `/admin/pages` - Page management
- `/admin/settings` - Settings
- `/admin/team` - Team management

### API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/content/*` - Content CRUD operations
- `/api/media/*` - Media upload/management

## 🔒 Security & Architecture
- Separate route groups for website and admin
- API routes with proper authentication
- Prisma ORM for database operations
- Clean separation of concerns

## 📦 Current Dependencies
- **Framework**: Next.js 16, React 19
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion, GSAP, Lenis
- **Icons**: Lucide React
- **Database**: Prisma (to be configured)

## 🔄 Next Steps
1. Setup Prisma schema
2. Configure authentication
3. Build admin dashboard
4. Implement API routes
5. Add middleware for admin protection
