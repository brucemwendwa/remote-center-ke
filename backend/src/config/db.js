import mongoose from 'mongoose';

export async function connectDB() {
  const uri =
    process.env.MONGO_URI ||
    (process.env.NODE_ENV === 'production' ? null : 'mongodb://127.0.0.1:27017/remote_center_ke');
  if (!uri) throw new Error('MONGO_URI is not set');
  if (!process.env.MONGO_URI) {
    console.warn('[db] MONGO_URI not set, using local development database');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: true });
  console.log('[db] connected');
}
