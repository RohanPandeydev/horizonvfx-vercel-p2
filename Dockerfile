# syntax=docker/dockerfile:1.7

FROM node:20-bookworm-slim AS deps
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --no-audit --no-fund

FROM node:20-bookworm-slim AS builder
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Placeholders to satisfy build-time env validation. Real values come from
# /srv/horizonvfx/.env.production via env_file at container runtime.
ENV NEXT_TELEMETRY_DISABLED=1 \
    DATABASE_URL=mysql://build:build@localhost:3306/build \
    JWT_ACCESS_SECRET=build-only-placeholder-not-used-at-runtime-ever \
    JWT_REFRESH_SECRET=build-only-placeholder-not-used-at-runtime-eve \
    ENCRYPTION_SECRET=build-only-placeholder-32-bytes-x
RUN npx prisma generate
RUN npm run build

FROM node:20-bookworm-slim AS runner
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates wget \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
# Whole @prisma scope (client + engines + internals) so the prisma CLI can
# run `db push` and `migrate deploy` from inside the runtime container.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/tsx ./node_modules/tsx
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
