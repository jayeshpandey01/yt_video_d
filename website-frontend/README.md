# Website Frontend

This frontend talks to the Go backend JSON-RPC endpoints:

- HTTP RPC: `/rpc/http`
- WebSocket stream: `/rpc/ws`

## Local Development

1. Start backend from repo root:

```bash
go run main.go
```

2. Configure frontend env:

```bash
cp .env.example .env
```

Set:

```env
VITE_BACKEND_URL=http://localhost:3033
```

3. Run frontend:

```bash
pnpm install
pnpm dev
```

## Production Build

```bash
pnpm install
pnpm build
pnpm preview
```

Build output is in `dist/`.

## Deploy Notes

- Deploy this folder as a static app (Vercel/Netlify/Nginx).
- Set `VITE_BACKEND_URL` to your backend public URL, for example:

```env
VITE_BACKEND_URL=https://api.yourdomain.com
```

- Backend must expose and allow:
  - `POST /rpc/http`
  - `GET /rpc/ws` (WebSocket upgrade)
  - CORS for your frontend origin
