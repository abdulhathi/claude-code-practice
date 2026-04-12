# Tech Stack

## Frontend
- **Next.js (App Router)** — full-stack React framework; handles routing, SSR, and API routes in one project
- **Tailwind CSS** — utility-first styling for the dashboard UI
- **shadcn/ui** — pre-built accessible components (tables, modals, forms)

## Backend / API
- **Next.js API Routes** — unified full-stack; no separate server needed at this scale
- **Prisma** — type-safe ORM with schema migrations

## Database
- **PostgreSQL** — relational DB for structured ticket/user/category data; hosted on **Supabase**

## Auth
- **Database sessions** — session tokens stored in PostgreSQL, looked up on each request; no JWTs
- Session management handled manually via Prisma (sessions table with userId, token, expiresAt)

## AI
- **Anthropic Claude API** (`claude-sonnet-4-6`) — ticket classification, AI summaries, suggested replies, knowledge base responses

## Email Ingestion
- **Resend** (inbound email webhooks) or **SendGrid Inbound Parse** — receives support emails and creates tickets via webhook

## Deployment
- **Vercel** — native Next.js deployment, zero-config
