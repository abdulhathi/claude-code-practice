# Implementation Plan

## Phase 1 — Project Setup & Infrastructure

### Part 1 — Scaffolding & Database
1. Initialize monorepo structure with a root `package.json` using Bun workspaces (`client`, `server`)
2. Set up Vite + React + TypeScript project in `/client` using `bun create vite`
3. Set up Bun + Express + TypeScript project in `/server` using `bun init`
4. Set up PostgreSQL database (local dev + hosted), add `.env.example`

### Part 2 — Tooling & Configuration
5. Configure Tailwind CSS in the client
6. Initialize Prisma and connect to PostgreSQL
7. Configure ESLint and Prettier across both projects

---

## Phase 2 — Database Schema & Auth

8. Define Prisma schema: `User`, `Session`, `Ticket`, `Message`
9. Run initial migration
10. Build `POST /auth/login` — validate credentials, create session in DB
11. Build `POST /auth/logout` — delete session from DB
12. Build session middleware — validate session token on protected routes
13. Seed the database with an initial admin account
14. Set up React Router with a protected route wrapper

---

## Phase 3 — Ticket Core

15. Build `POST /tickets` — create a ticket manually
16. Build `GET /tickets` — list tickets with filtering (status, category) and sorting
17. Build `GET /tickets/:id` — get a single ticket with its messages
18. Build `PATCH /tickets/:id` — update status (open → resolved → closed)
19. Build `POST /tickets/:id/messages` — add an agent reply to a ticket
20. Build the ticket list page with filter/sort controls
21. Build the ticket detail page showing the conversation thread and reply form

---

## Phase 4 — User Management (Admin)

22. Build `GET /users` — list all agents (admin only)
23. Build `POST /users` — create a new agent account (admin only)
24. Build `DELETE /users/:id` — deactivate an agent account (admin only)
25. Build the user management page in the dashboard

---

## Phase 5 — Email Ingestion

26. Configure SendGrid Inbound Parse webhook
27. Build `POST /webhooks/email` — parse inbound email, create a ticket
28. Map email sender, subject, and body to the ticket fields
29. Validate webhook authenticity (SendGrid signature)

---

## Phase 6 — AI Features

30. Integrate Anthropic Claude API in the backend (`claude-sonnet-4-6`)
31. Build ticket classification — on ticket creation, call Claude to assign a category
32. Build AI summary — generate a short summary of the ticket thread on demand
33. Build AI-suggested reply — generate a draft reply for agents based on ticket context and knowledge base
34. Build auto-response — on email ingestion, generate and send an initial human-friendly reply
35. Expose AI endpoints: `POST /tickets/:id/summarize`, `POST /tickets/:id/suggest-reply`
36. Wire AI summary and suggested reply into the ticket detail UI

---

## Phase 7 — Dashboard & Polish

37. Build the dashboard home — aggregate stats (open, resolved, closed counts by category)
38. Add pagination to the ticket list
39. Add toast notifications for actions (reply sent, status changed, etc.)
40. Handle loading and error states across all pages
41. Ensure role-based UI (hide admin-only sections from agents)

---

## Phase 8 — Deployment

42. Build and deploy the React client (Vercel or Nginx)
43. Deploy the Express server (Railway or Render)
44. Set production environment variables (DB URL, Claude API key, SendGrid key)
45. Point SendGrid inbound webhook to the production server URL
46. Smoke test the full flow end-to-end in production
