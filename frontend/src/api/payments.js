import api from './axios';

export const initiateMpesa = (payload) =>
  api.post('/payments/mpesa/stk', payload).then((r) => r.data);
export const createStripeIntent = (payload) =>
  api.post('/payments/stripe/intent', payload).then((r) => r.data);
export const confirmCOD = (payload) =>
  api.post('/payments/cod/confirm', payload).then((r) => r.data);
