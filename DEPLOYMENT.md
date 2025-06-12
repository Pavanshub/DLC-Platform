# Deployment Guide

This guide covers various deployment options for the Digital Literacy Course website.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended for beginners)

**Option A: Drag & Drop**
1. Run `npm run build` locally
2. Go to [Netlify](https://netlify.com)
3. Drag the `out` folder to the deploy area
4. Your site is live!

**Option B: Git Integration**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out`
5. Deploy automatically on every push

### 2. Vercel (Recommended for developers)

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

**Option B: Git Integration**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Auto-deploys on every push

### 3. GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to package.json scripts:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d out"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Advanced Deployment

### AWS S3 + CloudFront

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create S3 bucket**:
   - Enable static website hosting
   - Upload contents of `out` folder

3. **Setup CloudFront**:
   - Create distribution pointing to S3
   - Configure custom error pages for SPA routing

4. **Configure Route 53** (optional):
   - Point your domain to CloudFront

### Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/out /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**:
   ```nginx
   events {
     worker_connections 1024;
   }

   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;

     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;

       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and run**:
   ```bash
   docker build -t dlc-website .
   docker run -p 80:80 dlc-website
   ```

## 🌐 Custom Domain Setup

### Netlify Custom Domain
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS records as shown

### Vercel Custom Domain
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records

### Cloudflare Setup (Recommended)
1. Add your site to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption
4. Configure caching rules

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Optimize images
npm install next-optimized-images
```

### CDN Configuration
- Enable gzip compression
- Set proper cache headers
- Use image optimization services

### Monitoring Setup
- Google Analytics
- Core Web Vitals monitoring
- Error tracking (Sentry)

## 🔒 Security Configuration

### Content Security Policy
Add to your hosting platform:
```
Content-Security-Policy: default-src 'self'; img-src 'self' https://images.pexels.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
```

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './out'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🧪 Pre-deployment Checklist

- [ ] All pages load correctly
- [ ] Navigation works on mobile
- [ ] Accessibility features function
- [ ] Language switching works
- [ ] High contrast mode applies
- [ ] Forms submit properly
- [ ] Images load from CDN
- [ ] Performance is optimized
- [ ] SEO meta tags are present
- [ ] Analytics is configured

## 🆘 Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Images Not Loading**
- Verify image URLs are accessible
- Check Content Security Policy
- Ensure proper CORS headers

**Routing Issues**
- Configure server for SPA routing
- Check _redirects file for Netlify
- Verify nginx configuration

**Performance Issues**
- Enable compression
- Optimize images
- Configure caching headers
- Use CDN for static assets

### Getting Help
1. Check deployment logs
2. Test locally first
3. Verify environment variables
4. Check browser console for errors
5. Contact hosting support if needed

---

**Need help with deployment? Check our troubleshooting guide or contact support.**