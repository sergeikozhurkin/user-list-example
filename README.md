# User List Application

Monorepo with shared types between frontend and backend.

## Structure

```
├── frontend/          # React + Vite + Tailwind
├── backend/           # Node.js + Express
└── shared/
    └── types/         # Shared TypeScript types
```

## Setup

```bash
pnpm install
```

## Development

Run all in separate terminals:

```bash
# Terminal 1 - Backend
pnpm dev:backend

# Terminal 2 - Frontend  
pnpm dev:frontend
```

Or from root:
```bash
pnpm dev:backend
pnpm dev:frontend
```

## Shared Types

Types are defined in `shared/types/src/index.ts` and imported as `@repo/types` in both frontend and backend.

To add new types:
1. Edit `shared/types/src/index.ts`
2. Run `pnpm build:types` (or it auto-rebuilds in watch mode)
3. Use in frontend/backend: `import { User } from '@repo/types'`
