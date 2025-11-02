import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().optional(),
    MONGO_URI: z.string().optional(),
    CORS_ORIGIN: z.string().optional()
});

const _env = envSchema.safeParse(process.env);
if(!_env.success) {
    console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
    process.exit(1);
};


export const env = _env.data;