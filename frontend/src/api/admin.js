import api from './axios';
import { normalizeProducts } from '@/lib/products';

const unwrap = (data) => data?.data || data?.products || data || [];

export const adminStats = () => api.get('/admin/stats').then((r) => r.data);
export const adminProducts = () => api.get('/products', { params: { limit: 100 } }).then((r) => normalizeProducts(unwrap(r.data)));
export const adminOrders = () => api.get('/orders/admin').then((r) => r.data);
export const adminCustomers = () => api.get('/users').then((r) => r.data);
export const adminCoupons = () => api.get('/coupons').then((r) => r.data);
export const adminBanners = () => api.get('/banners').then((r) => r.data);
export const createProduct = (p) => api.post('/products', p).then((r) => r.data);
export const updateProduct = (id, p) => api.put(`/products/${id}`, p).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);
