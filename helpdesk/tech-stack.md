# Tech Stack

## Frontend
- **React 19 + TypeScript** — component-based UI with type safety
- **React Router v7** — client-side routing and navigation
- **Tailwind CSS v4** — utility-first styling (Vite plugin, no config file needed)
- **Better Auth client** — auth state management and session handling on the client

## Backend
- **Bun** — JavaScript runtime and package manager (replaces Node.js + npm)
- **Express v5** — REST API server (runs natively on Bun, no build step needed)
- **Prisma v7** — type-safe ORM with pg adapter for database access and migrations
- **Better Auth** — authentication library handling sessions, accounts, and email/password sign-in

## Database
- **PostgreSQL** — relational DB for users, sessions, accounts, and (upcoming) tickets

## Authentication
- **Better Auth** — manages email/password auth, database sessions, and account linking
- Sessions stored in PostgreSQL; `requireAuth` middleware validates session tokens on protected routes
- Roles (`ADMIN`, `AGENT`) stored on the `User` model and enforced server-side

## AI
- **Anthropic Claude API** (`claude-sonnet-4-6`) — ticket classification, AI summaries, suggested replies, and knowledge base responses

## Email Ingestion
- **SendGrid Inbound Parse** — receives support emails via webhook and creates tickets

## Deployment
- **Frontend** — Vite build, served as static assets (e.g. Vercel or Nginx)
- **Backend** — Bun server (e.g. Railway or Render)
