# Quick Vercel Deployment Setup

## Step 1: Set Environment Variables

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Click on your project: `yt_video_d`
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

### Required Variables:

**Variable Name:** `VITE_BACKEND_URL`
**Value:** *(Your backend server URL)*
- For development: `http://localhost:3033`
- For production: `https://your-backend-domain.com`

**Environments:** Check all (Production, Preview, Development)

5. Click **"Save"**

## Step 2: Redeploy from Git

1. In Vercel dashboard, go to **Deployments**
2. Find the latest deployment (or your branch)
3. Click the three dots menu → **Redeploy**
4. Confirm the redeploy

The app will rebuild with the environment variables.

## Step 3: Verify Deployment

1. Wait for the deployment to complete (shows ✓ when done)
2. Click the **"Visit"** button to open your app
3. Check the browser console (F12 → Console tab) for any errors
4. Look for the logs:
   ```
   [v0] Backend URL from env: https://your-backend...
   [v0] RPC HTTP endpoint: https://your-backend.../rpc/http
   [v0] RPC WebSocket endpoint: wss://your-backend.../rpc/ws
   ```

## Troubleshooting

### Still showing 404?
- Check that `VITE_BACKEND_URL` environment variable is set ✓
- Check that the backend server is running and accessible ✓
- Clear Vercel cache: Settings → Git → clear cache and redeploy

### Backend connection errors?
- Ensure backend URL is correct in environment variables
- Test the URL in your browser to verify it's accessible
- Check backend server logs for CORS issues

### Build failed?
- Check Vercel build logs: Deployments → Click failed build → Logs tab
- Ensure `website-frontend/package.json` dependencies are correct
- Try clearing cache and redeploying

## File Changes Made

- **`vercel.json`**: Updated to use modern Vercel config format
- **`website-frontend/src/hooks/useRPC.ts`**: Added environment variable support with logging
- **`DEPLOYMENT.md`**: Complete deployment documentation
- **`VERCEL_SETUP.md`**: This quick setup guide

All configuration is now ready for Vercel deployment!
