import mongoose from 'mongoose';

export async function connectMongo(uri?: string) {
    if(!uri) {
        console.warn('⚠️  No MONGO_URI provided. Starting API without database connection.')
        return;
    };
    try {
        await mongoose.connect(uri);
        console.log('✅ MongoDB connected')
    } catch (err) {
        console.error('❌ MongoDB connection failed:', (err as Error).message);
        process.exit(1);
    }
}