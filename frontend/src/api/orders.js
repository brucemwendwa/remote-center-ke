import api from './axios';

export const createOrder = (payload) => api.post('/orders', payload).then((r) => r.data);
export const myOrders = () => api.get('/orders/me').then((r) => r.data);
export const trackOrder = (trackingNumber) =>
  api.get(`/orders/track/${trackingNumber}`).then((r) => r.data);
