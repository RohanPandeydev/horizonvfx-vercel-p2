import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'horizonvfx.in',
      },
      // Add your S3 bucket hostname here
      // {
      //   protocol: 'https',
      //   hostname: '*.amazonaws.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: '*.r2.cloudflarestorage.com',
      // },
    ],
  },
  // Exclude .env from standalone output (it has dev S3 credentials)
  outputFileTracingExcludes: {
    '*': ['.env', '.env.local'],
  },
  // Enable experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Optimize for Vercel
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
