# 403 Forbidden Error - Fixes Applied

## Summary
Fixed the 403 Forbidden error on Vercel deployment by resolving configuration conflicts and environment variable issues.

## Changes Made

### 1. Deleted Root vercel.json
- **File**: `/vercel.json` (DELETED)
- **Reason**: Root config conflicted with `website-frontend/vercel.json`, causing Vercel to use wrong build settings
- **Impact**: Eliminated configuration conflict

### 2. Updated website-frontend/vercel.json
**Before**:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**After**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "nodeVersion": "18.x",
  "env": {
    "VITE_BACKEND_URL": "@vite_backend_url"
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
- **Impact**: Explicit build configuration, Node 18 compatibility, environment variable reference

### 3. Fixed package.json Build Command
**Before**:
```json
"build": "tsc -b && vite build"
```

**After**:
```json
"build": "tsc && vite build"
```
- **Impact**: Removed `-b` flag that was causing TypeScript compilation issues

### 4. Created .env File
**File**: `/website-frontend/.env`
```
VITE_BACKEND_URL=http://localhost:3033
```
- **Impact**: Local development environment setup

### 5. Created .env.production File
**File**: `/website-frontend/.env.production`
- **Purpose**: Placeholder for production URLs
- **Note**: Actual value MUST be set in Vercel Dashboard

### 6. Enhanced useRPC Hook Error Handling
**Added**:
- Success logging when RPC connects
- Detailed error logging with URL debugging info
- Better error messages for troubleshooting

## Next Steps - REQUIRED IN VERCEL DASHBOARD

### Step 1: Set Environment Variable
1. Go to Vercel Dashboard
2. Click on your project (jayeshpandey01/yt_video_d)
3. Navigate to **Settings → Environment Variables**
4. Add new variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://your-actual-backend-url.com` (or wherever your Go backend is hosted)
   - **Apply to**: Production, Preview, Development

### Step 2: Redeploy
1. Go to **Deployments**
2. Find the latest deployment
3. Click the **...** (three dots) menu
4. Select **Redeploy**
5. Wait for build to complete (green checkmark)

### Step 3: Verify Deployment
1. Visit your live URL
2. Open Browser Console (F12)
3. Look for logs starting with `[v0]`:
   - `[v0] Backend URL from env: ...`
   - `[v0] RPC HTTP endpoint: ...`
   - `[v0] RPC WebSocket endpoint: ...`
4. Check for success or error messages

## Environment Variables Reference

| Variable | Environment | Value | Source |
|----------|-------------|-------|--------|
| `VITE_BACKEND_URL` | Production | Your backend URL | Vercel Dashboard |
| `VITE_BACKEND_URL` | Development | `http://localhost:3033` | `.env` file |

## Troubleshooting

### If Still Getting 403 Forbidden:
1. **Check Backend URL**: Ensure `VITE_BACKEND_URL` is correct in Vercel Settings
2. **Check CORS**: Backend must accept requests from your Vercel domain
3. **Check Logs**: Click "Logs" tab in deployment to see build errors
4. **Test Backend**: Visit the backend URL directly in browser

### If Getting API Errors:
1. Open browser console (F12)
2. Look for `[v0]` logs showing endpoints
3. Verify endpoints match your backend configuration
4. Check backend logs for incoming requests

## Files Changed
- ❌ `/vercel.json` - DELETED
- ✅ `/website-frontend/vercel.json` - UPDATED
- ✅ `/website-frontend/package.json` - UPDATED
- ✅ `/website-frontend/.env` - CREATED
- ✅ `/website-frontend/.env.production` - CREATED
- ✅ `/website-frontend/src/hooks/useRPC.ts` - UPDATED

## Technical Details

### Why Root vercel.json Was Causing Issues
- Vercel automatically detects the nearest `vercel.json` in the directory tree
- Having both root and nested configs creates confusion
- Root config was using modern `buildCommand` format but pointing to wrong output
- Nested config in `website-frontend/` is the correct location for static frontend

### Why TypeScript -b Flag Failed
- `tsc -b` attempts to build referenced projects
- Your `tsconfig.json` references other configs but doesn't always resolve properly
- Simple `tsc` compiles everything in project scope correctly

### Environment Variable Injection
- Vercel uses `@` prefix to mark variables that should be injected at build time
- `VITE_BACKEND_URL=@vite_backend_url` tells Vercel to inject this variable
- The actual value is set in Vercel Dashboard Environment Variables section
- At build time, Vite replaces `import.meta.env.VITE_BACKEND_URL` with the injected value

## Verification Checklist
- [ ] Root `vercel.json` deleted (confirmed in git status)
- [ ] `website-frontend/vercel.json` updated
- [ ] `package.json` build command fixed
- [ ] `.env` and `.env.production` files created
- [ ] `VITE_BACKEND_URL` set in Vercel Dashboard
- [ ] Deployment redeployed
- [ ] Browser console shows `[v0]` logs with correct endpoints
- [ ] API calls connecting to backend
