import 'dotenv/config';
import { createServer } from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initSocket } from './sockets/index.js';

const PORT = Number(process.env.PORT) || 5000;

async function main() {
  await connectDB();
  const server = createServer(app);
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`[server] Remote Center Kenya API listening on :${PORT}`);
  });
}

main().catch((err) => {
  console.error('[server] Fatal startup error', err);
  process.exit(1);
});
