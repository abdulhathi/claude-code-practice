import type { Request, Response, NextFunction } from "express";

export function requireAdmin(_req: Request, res: Response, next: NextFunction) {
  const role = res.locals.session?.user?.role;
  if (role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
}
