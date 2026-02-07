# NeuroCleanse - Deployment Guide

Comprehensive deployment documentation for the NeuroCleanse ADHD Focus Workspace application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [Local Development](#local-development)
5. [Production Deployment](#production-deployment)
6. [Platform-Specific Guides](#platform-specific-guides)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## Quick Start

For rapid deployment, use the automated deployment script:

```bash
./deploy.sh
```

This script will:
- Check your environment
- Install all dependencies
- Build the production bundle
- Generate a deployment report
- Provide next steps

---

## Prerequisites

### Required Software

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (or pnpm 9.0.0+)
- **Git**: For version control

### Verify Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

### System Requirements

- **Memory**: Minimum 2GB RAM for build process
- **Disk Space**: At least 500MB free space
- **Operating System**: Linux, macOS, or Windows with WSL2

---

## Environment Configuration

### 1. Create Environment File

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

```env
# Application Settings
NEXT_PUBLIC_APP_NAME="NeuroCleanse"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration (if using database features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Security
NODE_ENV=production
```

### 3. Environment-Specific Configurations

#### Development
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Staging
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.neurocleanse.app
```

#### Production
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://neurocleanse.app
```

---

## Local Development

### Installation

```bash
# Install dependencies
npm install --force

# Or using pnpm (recommended)
pnpm install
```

### Development Server

```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Building Locally

```bash
# Create production build
npm run build

# Start production server
npm run start
```

---

## Production Deployment

### Manual Deployment Steps

1. **Install Dependencies**
   ```bash
   npm install --force
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Test Build**
   ```bash
   npm run start
   ```

4. **Deploy to Hosting**
   ```bash
   # Follow platform-specific instructions below
   ```

---

## Platform-Specific Guides

### Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications.

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Method 2: GitHub Integration

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Deploy

**Environment Variables to Set:**
- Add all variables from your `.env` file in Vercel dashboard
- Go to Project Settings → Environment Variables

**Build Settings:**
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install --force
```

---

### Netlify

#### Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

#### Build Settings

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Docker Deployment

#### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm install --force --legacy-peer-deps

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build and Run Docker Container

```bash
# Build image
docker build -t neurocleanse .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  neurocleanse
```

---

### AWS (EC2 / Elastic Beanstalk)

#### EC2 Deployment

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 LTS
   - t2.micro or larger

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and Deploy**
   ```bash
   git clone your-repo-url
   cd your-repo
   npm install --force
   npm run build

   # Use PM2 for process management
   sudo npm install -g pm2
   pm2 start npm --name "neurocleanse" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Static Export (Optional)

For pure static hosting (disables some Next.js features):

1. **Update next.config.mjs**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   }
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy `out` directory** to any static host (GitHub Pages, AWS S3, etc.)

---

## Troubleshooting

### Common Issues

#### Build Fails with Dependency Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --force
```

#### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)
```

#### Out of Memory During Build

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### TypeScript Build Errors

The build is configured to ignore TypeScript errors for faster builds. If you want to enable type checking:

```bash
# Remove ignoreBuildErrors from next.config.mjs
# Then run
npm run build
```

---

## Performance Optimization

### Production Checklist

- [ ] Environment variables configured correctly
- [ ] Database indexes optimized (if using database)
- [ ] Static assets minified and compressed
- [ ] CDN configured for static files
- [ ] Caching headers properly set
- [ ] Analytics and monitoring enabled
- [ ] Error tracking configured (e.g., Sentry)
- [ ] SSL certificate installed
- [ ] Compression enabled (gzip/brotli)
- [ ] Security headers configured

### Monitoring

Consider implementing:

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance Monitoring**: Vercel Analytics, Google Analytics
- **Error Tracking**: Sentry, LogRocket
- **User Analytics**: PostHog, Mixpanel

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** in production
4. **Set security headers** in next.config.mjs:
   ```javascript
   async headers() {
     return [
       {
         source: '/(.*)',
         headers: [
           {
             key: 'X-Content-Type-Options',
             value: 'nosniff'
           },
           {
             key: 'X-Frame-Options',
             value: 'DENY'
           },
           {
             key: 'X-XSS-Protection',
             value: '1; mode=block'
           }
         ]
       }
     ]
   }
   ```

---

## Support and Resources

- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Community**: [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- **Issues**: Report bugs in the project repository

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] Database migrations applied (if applicable)
- [ ] Performance tested
- [ ] Security headers configured
- [ ] SSL certificate installed
- [ ] Monitoring and analytics enabled
- [ ] Backup strategy in place
- [ ] Documentation updated

---

**Last Updated**: $(date +%Y-%m-%d)
**Version**: 1.0.0
