# Vercel Deployment Guide

## Environment Variables Required

The following environment variables must be set in your Vercel project settings:

### For Website Frontend (`website-frontend`)

1. **VITE_BACKEND_URL** (Required for Production)
   - **Description**: The backend API endpoint URL
   - **Example**: `https://your-backend-api.example.com`
   - **Default (Local)**: `http://localhost:3033`
   - **Production Value**: Replace with your actual backend server URL

## Setup Instructions

### 1. Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: Your backend API URL (e.g., `https://your-yt-dlp-backend.com`)
   - **Environments**: Select Production, Preview, and Development

### 2. Build Configuration

The `vercel.json` is configured to:
- Build the `website-frontend` directory
- Output static files to `website-frontend/dist`
- Redirect all routes to `index.html` for client-side routing

### 3. Deployment Steps

1. Push changes to your GitHub repository
2. Vercel will automatically trigger a deployment
3. Check the deployment logs for any errors
4. Verify the `VITE_BACKEND_URL` environment variable is set

## Troubleshooting

### "404 Not Found" Error

**Cause**: The app is building but routes are returning 404
- **Solution**: Ensure `VITE_BACKEND_URL` is set in Vercel environment variables
- **Check**: Verify the backend URL is accessible from your browser

### Build Failures

**Cause**: Missing dependencies or build errors
- **Solution**: 
  1. Clear Vercel cache (Settings → Git → Redeploy)
  2. Check build logs in Vercel dashboard
  3. Ensure `website-frontend/package.json` has all dependencies

### WebSocket Connection Errors

**Cause**: Backend WebSocket endpoint not accessible
- **Solution**: 
  1. Ensure VITE_BACKEND_URL uses a protocol that supports WebSocket (wss:// for secure)
  2. Configure CORS on your backend if needed
  3. Check backend server is running and accessible

## Backend URL Configuration

The application automatically converts the `VITE_BACKEND_URL` to WebSocket endpoints:
- **HTTP RPC Endpoint**: `${VITE_BACKEND_URL}/rpc/http`
- **WebSocket RPC Endpoint**: `${VITE_BACKEND_URL}/rpc/ws` (auto-converts http → ws/wss)

Example with backend at `https://api.example.com`:
- HTTP: `https://api.example.com/rpc/http`
- WebSocket: `wss://api.example.com/rpc/ws`

## Local Development

For local development:
```bash
cd website-frontend
npm install
VITE_BACKEND_URL=http://localhost:3033 npm run dev
```

The default `.env.example` already contains the local backend URL.
