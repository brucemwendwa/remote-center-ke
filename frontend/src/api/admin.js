import api from './axios';
import { normalizeProducts } from '@/lib/products';
import {
  getDemoBanners,
  getDemoCoupons,
  getDemoCustomers,
  getDemoOrders,
  getDemoProducts,
  getDemoStats,
  removeDemoProduct,
  saveDemoProduct,
} from '@/lib/demoStore';

const unwrap = (data) => data?.data || data?.products || data || [];

export const adminStats = async () => {
  try {
    return await api.get('/admin/stats').then((r) => r.data);
  } catch {
    return getDemoStats();
  }
};

export const adminProducts = async () => {
  try {
    const { data } = await api.get('/products', { params: { limit: 100 } });
    const products = normalizeProducts(unwrap(data));
    if (products.length) return products;
  } catch {}
  return getDemoProducts();
};

export const adminOrders = async () => {
  try {
    return await api.get('/orders/admin').then((r) => unwrap(r.data));
  } catch {
    return getDemoOrders();
  }
};

export const adminCustomers = async () => {
  try {
    return await api.get('/users').then((r) => unwrap(r.data));
  } catch {
    return getDemoCustomers();
  }
};

export const adminCoupons = async () => {
  try {
    return await api.get('/coupons').then((r) => unwrap(r.data));
  } catch {
    return getDemoCoupons();
  }
};

export const adminBanners = async () => {
  try {
    return await api.get('/banners').then((r) => unwrap(r.data));
  } catch {
    return getDemoBanners();
  }
};

export const createProduct = async (p) => {
  try {
    return await api.post('/products', p).then((r) => r.data);
  } catch {
    return saveDemoProduct(p);
  }
};
export const updateProduct = (id, p) => api.put(`/products/${id}`, p).then((r) => r.data);
export const deleteProduct = async (id) => {
  try {
    return await api.delete(`/products/${id}`).then((r) => r.data);
  } catch {
    return removeDemoProduct(id);
  }
};
