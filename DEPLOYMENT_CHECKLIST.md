# Deployment Checklist

## Pre-Deployment (Local)

- [ ] Clone/pull latest code from GitHub
- [ ] Verify `website-frontend/package.json` has all dependencies
- [ ] Test locally: `cd website-frontend && npm run dev`
- [ ] Backend server is running on `http://localhost:3033`
- [ ] App loads without errors in browser console

## Vercel Setup

- [ ] Project connected to GitHub repo: `jayeshpandey01/yt_video_d`
- [ ] Vercel project created at https://vercel.com/dashboard
- [ ] Git branch connected: `main` or your desired branch

## Environment Variables (CRITICAL)

### In Vercel Dashboard:
1. Go to **Settings → Environment Variables**
2. Set the following variable:

- [ ] `VITE_BACKEND_URL` is set
  - [ ] Value is your backend server URL (not localhost!)
  - [ ] Applied to: Production, Preview, Development
  - [ ] Example: `https://api.your-domain.com`

## Configuration Files

- [ ] ✓ `vercel.json` - Updated to modern format
- [ ] ✓ `website-frontend/src/hooks/useRPC.ts` - Added env var support
- [ ] ✓ `.env.example` - Contains `VITE_BACKEND_URL=http://localhost:3033`

## Deployment

- [ ] Push code to GitHub (on your connected branch)
- [ ] Wait for Vercel auto-deployment to trigger
- [ ] Check deployment logs for errors
- [ ] Verify deployment shows "Ready"
- [ ] Redeploy manually if environment variables were just added:
  - Go to Deployments → Latest → Click menu (···) → Redeploy

## Post-Deployment Testing

- [ ] Visit deployment URL in browser
- [ ] Open browser console (F12 → Console tab)
- [ ] Verify you see logs starting with `[v0]`:
  ```
  [v0] Backend URL from env: https://...
  [v0] RPC HTTP endpoint: https://.../rpc/http
  [v0] RPC WebSocket endpoint: wss://.../rpc/ws
  ```
- [ ] No connection errors in console
- [ ] Click on features and test they connect to backend
- [ ] Check Network tab for failed requests (should be none)

## If 404 Error Persists

Try these steps in order:

1. **Check Environment Variables**
   - [ ] `VITE_BACKEND_URL` is definitely set in Vercel
   - [ ] No typos in the variable name
   - [ ] URL doesn't have trailing slash

2. **Clear Vercel Cache**
   - [ ] Go to Settings → Git
   - [ ] Find your deployment or branch
   - [ ] Click menu (···) → Clear cache
   - [ ] Click menu (···) → Redeploy

3. **Verify Backend Access**
   - [ ] Test backend URL in browser directly
   - [ ] Example: https://your-backend.com/rpc/http
   - [ ] Should return JSON response (not 404)

4. **Check Build Output**
   - [ ] Go to Deployments → Failed/Latest
   - [ ] Click "Logs" tab at top
   - [ ] Look for any errors during build
   - [ ] Look for "VITE_BACKEND_URL" being used

5. **Rebuild Frontend**
   - [ ] Push a small change to trigger rebuild
   - [ ] Or manually trigger redeploy in Vercel

## Backend API Endpoints

The app connects to these endpoints on your backend:

- `POST ${VITE_BACKEND_URL}/rpc/http` - HTTP RPC calls
- `WebSocket ${VITE_BACKEND_URL}/rpc/ws` - Live updates

Example with backend at `https://api.example.com`:
- HTTP: `https://api.example.com/rpc/http`
- WebSocket: `wss://api.example.com/rpc/ws`

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 on all routes | Routes not rewritten to index.html | vercel.json has `{ "handle": "filesystem" }` and rewrite rule |
| Backend connection failed | VITE_BACKEND_URL not set | Add env var in Vercel Settings |
| CORS errors | Backend doesn't allow frontend domain | Configure CORS on backend server |
| WebSocket fails | Backend not serving WebSocket | Ensure backend supports /rpc/ws endpoint |
| Blank page | Build failed silently | Check Vercel Logs tab in Deployments |

## Contact & Support

If issues persist:
1. Check Vercel build logs: Deployments → Latest → Logs
2. Check browser console for errors: F12 → Console tab
3. Verify backend is running and accessible
4. Check GitHub for recent changes that might have broken build
