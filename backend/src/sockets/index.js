import { Server } from 'socket.io';

let io = null;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL || '*', credentials: true },
  });
  io.on('connection', (socket) => {
    socket.on('order:subscribe', (trackingNumber) => {
      if (trackingNumber) socket.join(`order:${trackingNumber}`);
    });
    socket.on('order:unsubscribe', (trackingNumber) => {
      if (trackingNumber) socket.leave(`order:${trackingNumber}`);
    });
  });
  return io;
}

export function getIO() {
  return io;
}

export function emitOrderStatus(order) {
  if (!io || !order) return;
  const room = `order:${order.trackingNumber}`;
  io.to(room).emit('order:status', {
    trackingNumber: order.trackingNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    at: new Date(),
  });
}

export function emitOrderTracking(order, location, note) {
  if (!io || !order) return;
  io.to(`order:${order.trackingNumber}`).emit('order:tracking', {
    trackingNumber: order.trackingNumber,
    location,
    note,
    at: new Date(),
  });
}
