import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.ts';
import { connectMongo } from './db/connect.ts';
import healthRouter from './routes/health.route.ts';

async function bootstrap() {
    const app = express();

    // === Middleware ===
    app.use(cors({ origin: env.CORS_ORIGIN || "*", credentials: true }));
    app.use(express.json());
    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

    // === Routes ===
    app.use('/api', healthRouter);

    // === Error Handling ===
    const { notFound, errorHandler } = await import('./middleware/error.ts');
    app.use(notFound);
    app.use(errorHandler);

    const port = Number(env.PORT || 8001);

    //  === Database ===
    await connectMongo(env.MONGO_URI);

    app.listen(port, () => {
        console.log(`✅ API running on http://dashboard.haultime.org`)
    })
}

bootstrap()