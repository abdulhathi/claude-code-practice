# Implementation Plan

## Phase 1 — Project Setup & Infrastructure ✅

### Part 1 — Scaffolding & Database
1. ✅ Initialize monorepo structure with a root `package.json` using Bun workspaces (`client`, `server`)
2. ✅ Set up Vite + React + TypeScript project in `/client` using `bun create vite`
3. ✅ Set up Bun + Express + TypeScript project in `/server`
4. ✅ Set up PostgreSQL database (local dev), add `.env` and `.env.example`

### Part 2 — Tooling & Configuration
5. ✅ Configure Tailwind CSS v4 in the client (Vite plugin)
6. ✅ Initialize Prisma v7 and connect to PostgreSQL via pg adapter
7. ✅ Configure ESLint across both projects

---

## Phase 2 — Database Schema & Auth ✅

8. ✅ Define Prisma schema: `User`, `Session`, `Account`, `Verification` (Better Auth schema)
9. ✅ Run initial migration
10. ✅ Set up Better Auth on the server (`lib/auth.ts`) — email/password sign-in, database sessions
11. ✅ Mount Better Auth handler at `POST /api/auth/*`
12. ✅ Build `requireAuth` middleware — validates session token on protected routes
13. ✅ Seed the database with an initial admin account (`prisma/seed.ts`)
14. ✅ Set up React Router with protected route wrapper (`ProtectedRoute`) and auth context
15. ✅ Build login page and navbar showing signed-in user info

---

## Phase 3 — Ticket Core

16. Build `POST /tickets` — create a ticket manually
17. Build `GET /tickets` — list tickets with filtering (status, category) and sorting
18. Build `GET /tickets/:id` — get a single ticket with its messages
19. Build `PATCH /tickets/:id` — update status (open → resolved → closed)
20. Build `POST /tickets/:id/messages` — add an agent reply to a ticket
21. Add `Ticket` and `Message` models to Prisma schema and migrate
22. Build the ticket list page with filter/sort controls
23. Build the ticket detail page showing the conversation thread and reply form

---

## Phase 4 — User Management (Admin)

24. Build `GET /users` — list all agents (admin only)
25. Build `POST /users` — create a new agent account (admin only)
26. Build `DELETE /users/:id` — deactivate an agent account (admin only)
27. Build the user management page in the dashboard

---

## Phase 5 — Email Ingestion

28. Configure SendGrid Inbound Parse webhook
29. Build `POST /webhooks/email` — parse inbound email, create a ticket
30. Map email sender, subject, and body to ticket fields
31. Validate webhook authenticity (SendGrid signature)

---

## Phase 6 — AI Features

32. Integrate Anthropic Claude API in the backend (`claude-sonnet-4-6`)
33. Build ticket classification — on ticket creation, call Claude to assign a category
34. Build AI summary — generate a short summary of the ticket thread on demand
35. Build AI-suggested reply — generate a draft reply for agents based on ticket context and knowledge base
36. Build auto-response — on email ingestion, generate and send an initial human-friendly reply
37. Expose AI endpoints: `POST /tickets/:id/summarize`, `POST /tickets/:id/suggest-reply`
38. Wire AI summary and suggested reply into the ticket detail UI

---

## Phase 7 — Dashboard & Polish

39. Build the dashboard home — aggregate stats (open, resolved, closed counts by category)
40. Add pagination to the ticket list
41. Add toast notifications for actions (reply sent, status changed, etc.)
42. Handle loading and error states across all pages
43. Ensure role-based UI (hide admin-only sections from agents)

---

## Phase 8 — Deployment

44. Build and deploy the React client (Vercel or Nginx)
45. Deploy the Express server (Railway or Render)
46. Set production environment variables (DB URL, Claude API key, SendGrid key)
47. Point SendGrid inbound webhook to the production server URL
48. Smoke test the full flow end-to-end in production
