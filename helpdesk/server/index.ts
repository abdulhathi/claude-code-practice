import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { requireAuth } from "./middleware/requireAuth";
import prisma from "./lib/prisma";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/me", requireAuth, (req, res) => {
  res.json(res.locals.session);
});

app.get("/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: "ok", db: "connected" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
