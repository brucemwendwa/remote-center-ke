import mongoose from 'mongoose';

let connectionPromise = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  const uri =
    process.env.MONGO_URI ||
    (process.env.NODE_ENV === 'production' ? null : 'mongodb://127.0.0.1:27017/remote_center_ke');
  if (!uri) throw new Error('MONGO_URI is not set');
  if (!process.env.MONGO_URI) {
    console.warn('[db] MONGO_URI not set, using local development database');
  }
  mongoose.set('strictQuery', true);
  connectionPromise = mongoose
    .connect(uri, { autoIndex: true })
    .then(() => {
      console.log('[db] connected');
      return mongoose.connection;
    })
    .catch((err) => {
      connectionPromise = null;
      throw err;
    });

  return connectionPromise;
}
