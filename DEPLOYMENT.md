# Frontend Deployment Guide

This guide covers deploying the Lakeview Health Services frontend to Vercel or other hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deploying to Vercel](#deploying-to-vercel)
- [Deploying to Other Platforms](#deploying-to-other-platforms)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure:

1. ✅ Backend is deployed and running at: `https://lakeview-page-backend.onrender.com`
2. ✅ Backend health check passes: `https://lakeview-page-backend.onrender.com/health`
3. ✅ All environment variables are configured correctly
4. ✅ Frontend builds successfully locally: `npm run build`

---

## Environment Variables

### Required Environment Variables

Only one environment variable is required for the frontend:

```bash
NEXT_PUBLIC_API_URL=https://lakeview-page-backend.onrender.com
```

### Optional Environment Variables

```bash
NODE_ENV=production
```

**Note:** The frontend automatically falls back to the production backend URL if `NEXT_PUBLIC_API_URL` is not set, so this variable is technically optional but recommended for clarity.

---

## Deploying to Vercel

Vercel is the recommended platform for Next.js deployments.

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd landing-page_frontend
   vercel
   ```

4. **Set Environment Variables:**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   # Enter: https://lakeview-page-backend.onrender.com
   ```

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. **Import Project:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Connect your GitHub repository
   - Select the `landing-page_frontend` folder as the root directory

2. **Configure Build Settings:**
   - Framework Preset: **Next.js**
   - Root Directory: `landing-page_frontend` (if not detected automatically)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add:
     - **Name:** `NEXT_PUBLIC_API_URL`
     - **Value:** `https://lakeview-page-backend.onrender.com`
     - **Environments:** Production, Preview, Development (select all)

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (typically 2-3 minutes)

5. **Configure Custom Domain (Optional):**
   - After deployment, go to Project Settings → Domains
   - Add your custom domain: `www.lakeviewhsl.com`
   - Follow DNS configuration instructions

---

## Deploying to Other Platforms

### Netlify

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: `landing-page_frontend`

2. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL=https://lakeview-page-backend.onrender.com`

3. **netlify.toml (Optional):**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
     base = "landing-page_frontend"

   [build.environment]
     NEXT_PUBLIC_API_URL = "https://lakeview-page-backend.onrender.com"
     NODE_ENV = "production"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### AWS Amplify

1. **App Settings:**
   - Framework: Next.js - SSR
   - Build command: `npm run build`
   - Base directory: `landing-page_frontend`

2. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL=https://lakeview-page-backend.onrender.com`

3. **Build Specification (amplify.yml):**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### DigitalOcean App Platform

1. **App Settings:**
   - Type: Static Site (for static export) or Web Service (for SSR)
   - Build Command: `npm run build`
   - Output Directory: `.next`

2. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL=https://lakeview-page-backend.onrender.com`

---

## Testing

### 1. Test Build Locally

Before deploying, always test the production build locally:

```bash
cd landing-page_frontend

# Build the application
npm run build

# Start production server
npm start

# Test in browser
# Open: http://localhost:3000
```

### 2. Test Production Deployment

After deploying, test these critical flows:

#### Homepage (Public)
- [ ] Homepage loads without errors
- [ ] Pricing section displays correctly
- [ ] Navigation works
- [ ] Mobile responsive

#### Booking Flow
- [ ] Navigate to booking form
- [ ] Fill out booking details
- [ ] Submit booking (should redirect to Paystack)
- [ ] Complete test payment (use Paystack test cards)
- [ ] Verify callback redirects correctly
- [ ] Check confirmation email

#### Contact Form
- [ ] Submit contact form
- [ ] Verify email notification

#### Admin Dashboard
- [ ] Login at `/admin` with credentials:
  - Email: `lakeviewhealthservices1@gmail.com`
  - Password: `1234P@$$word`
- [ ] Dashboard statistics load
- [ ] Bookings page displays all bookings
- [ ] Can update booking status
- [ ] Payments page shows all payments
- [ ] Content management works (Services, FAQs, Testimonials, Pricing)

### 3. Test API Connectivity

Use browser DevTools (F12 → Network tab) to verify:

- All API calls use: `https://lakeview-page-backend.onrender.com`
- No requests to `localhost:5000`
- Responses return `200 OK` status
- CORS headers present

---

## Troubleshooting

### Issue: Build Fails on Vercel

**Symptoms:**
- Build exits with error code
- TypeScript errors during build

**Solutions:**

1. **Check TypeScript Errors:**
   ```bash
   npm run build
   ```
   Fix any TypeScript errors locally first.

2. **Check Node Version:**
   - Vercel uses Node 18.x by default
   - Add `.nvmrc` file if needed:
     ```
     18
     ```

3. **Clear Build Cache:**
   - In Vercel dashboard: Settings → General → Clear Build Cache

### Issue: API Calls Failing (404/Network Error)

**Symptoms:**
- Frontend loads but API calls fail
- Console shows network errors
- "Failed to fetch" errors

**Solutions:**

1. **Verify Environment Variable:**
   - Check Vercel dashboard: Settings → Environment Variables
   - Ensure `NEXT_PUBLIC_API_URL=https://lakeview-page-backend.onrender.com`
   - **Must start with `NEXT_PUBLIC_` to be exposed to browser**

2. **Redeploy After Adding Environment Variables:**
   - Environment variables require a new deployment
   - Click "Deployments" → "Redeploy"

3. **Check Backend Health:**
   ```bash
   curl https://lakeview-page-backend.onrender.com/health
   ```
   Should return:
   ```json
   {"status":"OK","timestamp":"..."}
   ```

4. **Check CORS:**
   - Backend must allow frontend domain in CORS
   - Backend `.env` should have:
     ```
     FRONTEND_URL=https://www.lakeviewhsl.com
     ```

### Issue: CORS Errors

**Symptoms:**
- Console shows: `Access to fetch...has been blocked by CORS policy`
- Requests fail with CORS error

**Solutions:**

1. **Update Backend CORS:**
   - Edit `landing-page_backend/src/app.js`
   - Add your Vercel domain to `allowedOrigins`:
     ```javascript
     const allowedOrigins = [
       'http://localhost:3000',
       'https://www.lakeviewhsl.com',
       'https://your-vercel-domain.vercel.app' // Add this
     ];
     ```

2. **Redeploy Backend:**
   - Push changes to GitHub
   - Render will automatically redeploy

### Issue: Admin Login Fails

**Symptoms:**
- Invalid credentials error
- Token not set

**Solutions:**

1. **Verify Credentials:**
   - Email: `lakeviewhealthservices1@gmail.com`
   - Password: `1234P@$$word`

2. **Check JWT Secret:**
   - Backend `.env` must have `JWT_SECRET` set
   - Check Render environment variables

3. **Clear Browser Storage:**
   ```javascript
   // In browser console:
   localStorage.clear();
   document.cookie.split(";").forEach(c => {
     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
   });
   ```

### Issue: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 for images

**Solutions:**

1. **Check Image Paths:**
   - Next.js requires images in `/public` folder
   - Use absolute paths: `/images/logo.png`

2. **Configure Image Domains (if using external images):**
   - Edit `next.config.ts`:
     ```typescript
     images: {
       domains: ['your-cdn-domain.com'],
     }
     ```

### Issue: Hydration Errors

**Symptoms:**
- Console warnings about hydration mismatch
- Content flashing

**Solutions:**

1. **Use Mounted State:**
   - Already implemented in PricingSection
   - Apply same pattern to other components with dynamic content:
     ```typescript
     const [mounted, setMounted] = useState(false);
     useEffect(() => setMounted(true), []);
     if (!mounted) return <div>Loading...</div>;
     ```

### Issue: Slow Cold Starts

**Symptoms:**
- First request takes 10-30 seconds
- Render backend sleeping

**Solutions:**

1. **Keep Backend Warm:**
   - Use external monitoring service to ping backend every 10 minutes
   - Example: UptimeRobot, Pingdom

2. **Upgrade Render Plan:**
   - Free tier sleeps after inactivity
   - Paid plans ($7/month) stay awake

### Issue: Payment Webhook Not Working

**Symptoms:**
- Payment succeeds on Paystack but booking status not updated
- No confirmation email

**Solutions:**

1. **Configure Paystack Webhook:**
   - Login to Paystack dashboard
   - Settings → Webhooks
   - Add: `https://lakeview-page-backend.onrender.com/api/payments/paystack/webhook`

2. **Verify Webhook Secret:**
   - Backend `.env` must have `PAYSTACK_SECRET_KEY`

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Frontend accessible at production URL
- [ ] All pages load without errors
- [ ] API calls use production backend
- [ ] Booking flow works end-to-end
- [ ] Payment integration functional
- [ ] Admin login works
- [ ] Dashboard loads data
- [ ] Email notifications sending
- [ ] Mobile responsive on real devices
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if applicable)

---

## Production URLs

- **Frontend:** https://www.lakeviewhsl.com (or your Vercel domain)
- **Backend:** https://lakeview-page-backend.onrender.com
- **Backend Health Check:** https://lakeview-page-backend.onrender.com/health
- **Backend API Docs:** https://lakeview-page-backend.onrender.com/api-docs (Swagger)

---

## Support

If you encounter issues not covered here:

1. Check browser console for errors (F12)
2. Check Vercel deployment logs
3. Check backend Render logs
4. Verify all environment variables
5. Test API endpoints directly with Postman/curl

For urgent issues, check:
- Backend status: https://lakeview-page-backend.onrender.com/health
- Render dashboard: https://dashboard.render.com
- Vercel dashboard: https://vercel.com/dashboard

---

## Next Steps

After successful deployment:

1. **Configure DNS:**
   - Point your domain to Vercel
   - Update CORS in backend to include your domain

2. **Set Up Monitoring:**
   - Enable Vercel Analytics
   - Set up error tracking (Sentry, LogRocket)
   - Monitor backend with UptimeRobot

3. **Performance Optimization:**
   - Enable Next.js Image Optimization
   - Configure CDN for static assets
   - Implement caching strategies

4. **Security:**
   - Enable rate limiting on sensitive endpoints
   - Configure Content Security Policy (CSP)
   - Regular security audits

5. **Production Paystack Keys:**
   - Replace test keys with production keys
   - Update backend environment variables
   - Test with real payment

---

**Deployment completed!** 🚀

Your frontend is now live and connected to the production backend.
