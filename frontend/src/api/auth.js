import api from './axios';

export const login = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const register = (payload) => api.post('/auth/register', payload).then((r) => r.data);
export const forgotPassword = (payload) => api.post('/auth/forgot-password', payload).then((r) => r.data);
export const resetPassword = (payload) => api.post('/auth/reset-password', payload).then((r) => r.data);
export const me = () => api.get('/auth/me').then((r) => r.data);
export const updateProfile = (payload) => api.put('/users/me', payload).then((r) => r.data);
