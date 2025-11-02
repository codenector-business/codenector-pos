import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response) {
    res.status(404).json({ ok: false, error: 'Not Found' });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    const message = err instanceof Error ? err.message : "Unkown error";
    const status = (err as any)?.status || 500;
    res.status(status).json({ ok: false, error: message });
}