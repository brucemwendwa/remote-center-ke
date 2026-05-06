import api from './axios';
import { normalizeProduct, normalizeProducts } from '@/lib/products';

const unwrap = (data) => data?.data || data?.products || data || [];

export const fetchProducts = async (params = {}) => {
  try {
    const { data } = await api.get('/products', { params });
    return normalizeProducts(unwrap(data));
  } catch {
    return [];
  }
};

export const fetchProduct = async (slug) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return normalizeProduct(data?.data || data?.product || data);
  } catch {
    return null;
  }
};

export const fetchFeatured = async () => {
  try {
    const { data } = await api.get('/products', { params: { featured: true, limit: 8 } });
    return normalizeProducts(unwrap(data));
  } catch {
    return [];
  }
};

export const fetchRelated = async (slug) => {
  try {
    const { data } = await api.get(`/products/${slug}/related`);
    return normalizeProducts(unwrap(data));
  } catch {
    return [];
  }
};

export const submitReview = (idOrSlug, payload) =>
  api.post(`/products/${idOrSlug}/reviews`, payload).then((r) => r.data);
