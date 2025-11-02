import { Router } from 'express';

const router = Router() ;

router.get('/health', (_req, res) => {
    res.json({
        ok: true,
        service: 'codenector-pos-backend',
        time: new Date().toISOString()
    });
});

export default router;
