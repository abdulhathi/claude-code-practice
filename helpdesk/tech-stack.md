# Tech Stack

## Frontend
- **React + TypeScript** — component-based UI with type safety
- **React Router v7** — client-side routing and navigation
- **Tailwind CSS** — utility-first styling

## Backend
- **Bun** — JavaScript runtime and package manager (replaces Node.js + npm)
- **Express** — REST API server (runs natively on Bun, no build step needed)
- **Prisma** — type-safe ORM for database access and migrations

## Database
- **PostgreSQL** — relational DB for tickets, users, sessions, and categories

## Authentication
- **Database sessions** — sessions stored in PostgreSQL; Express middleware validates session tokens on each request
- No third-party auth provider

## AI
- **Anthropic Claude API** (`claude-sonnet-4-6`) — ticket classification, AI summaries, suggested replies, and knowledge base responses

## Email Ingestion
- **SendGrid Inbound Parse** — receives support emails via webhook and creates tickets

## Deployment
- **Frontend** — Vite build, served as static assets (e.g. Vercel or Nginx)
- **Backend** — Node.js server (e.g. Railway or Render)
