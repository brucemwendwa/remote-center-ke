import api from './axios';
import { normalizeProduct, normalizeProducts } from '@/lib/products';
import { getDemoProduct, getDemoProducts } from '@/lib/demoStore';

const unwrap = (data) => data?.data || data?.products || data || [];
const mergeDemo = (products, params = {}) => {
  const normalized = normalizeProducts(products);
  const ids = new Set(normalized.map((p) => p.id || p.slug));
  const demo = getDemoProducts(params).filter((p) => !ids.has(p.id) && !ids.has(p.slug));
  return normalizeProducts([...demo, ...normalized]);
};

export const fetchProducts = async (params = {}) => {
  try {
    const { data } = await api.get('/products', { params });
    return mergeDemo(unwrap(data), params);
  } catch {
    return getDemoProducts(params);
  }
};

export const fetchProduct = async (slug) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return normalizeProduct(data?.data || data?.product || data) || getDemoProduct(slug);
  } catch {
    return getDemoProduct(slug);
  }
};

export const fetchFeatured = async () => {
  try {
    const { data } = await api.get('/products', { params: { featured: true, limit: 8 } });
    return mergeDemo(unwrap(data), { featured: true, limit: 8 });
  } catch {
    return getDemoProducts({ featured: true, limit: 8 });
  }
};

export const fetchRelated = async (slug) => {
  try {
    const { data } = await api.get(`/products/${slug}/related`);
    const related = normalizeProducts(unwrap(data));
    if (related.length) return related;
    return getDemoProducts().filter((p) => p.slug !== slug).slice(0, 4);
  } catch {
    return getDemoProducts().filter((p) => p.slug !== slug).slice(0, 4);
  }
};

export const submitReview = (idOrSlug, payload) =>
  api.post(`/products/${idOrSlug}/reviews`, payload).then((r) => r.data);
