# DreamWalletBot

Monorepo with Telegram Mini App (Vite React TS) and Node API + Bot.

## Setup

1. Create a `.env` file at repo root with:

```
BOT_TOKEN=your_bot_token
WEB_APP_URL=http://localhost:5173
PORT=4000
```

2. Install deps:

```
npm install
cd web && npm install
```

## Development

Run frontend:

```
npm run dev:web
```

Run backend/bot:

```
npm run dev:server
```

## Production build

```
npm run build:web
npm run build:server
```


