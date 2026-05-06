import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

let socket = null;

export function getSocket() {
  if (!socket) {
    const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    socket = io(url, { autoConnect: true, transports: ['websocket'], reconnection: true });
  }
  return socket;
}

export function useSocket(event, handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => {
    if (!event) return;
    const s = getSocket();
    const fn = (...args) => handlerRef.current?.(...args);
    s.on(event, fn);
    return () => s.off(event, fn);
  }, [event]);
}
