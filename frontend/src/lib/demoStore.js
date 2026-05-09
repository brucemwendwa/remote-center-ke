import { sampleProducts } from '@/data/brands';

export const DEMO_DATA_EVENT = 'rck-demo-data-change';

export const DEMO_STORAGE_KEYS = {
  products: 'rck-demo-products',
  orders: 'rck-demo-orders',
  coupons: 'rck-demo-coupons',
  banners: 'rck-demo-banners',
};

const sampleOrders = [
  { id: 'RCK-1042', customer: 'Wanjiku M.', email: 'wanjiku@example.com', status: 'shipped', total: 2150, date: Date.now() - 86400000 },
  { id: 'RCK-1041', customer: 'Brian O.', email: 'brian@example.com', status: 'delivered', total: 950, date: Date.now() - 86400000 * 2 },
  { id: 'RCK-1040', customer: 'Faith A.', email: 'faith@example.com', status: 'processing', total: 3200, date: Date.now() - 86400000 * 3 },
  { id: 'RCK-1039', customer: 'Kevin K.', email: 'kevin@example.com', status: 'placed', total: 600, date: Date.now() - 3600000 },
];

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

const clampMin = (value, min = 0) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, number);
};

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `product-${Date.now()}`;

const read = (key, fallback) => {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  if (!canUseStorage()) return value;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(DEMO_DATA_EVENT, { detail: { key } }));
  return value;
};

const uniqueSlug = (name, products, currentId) => {
  const base = slugify(name);
  let slug = base;
  let index = 2;
  while (products.some((p) => p.slug === slug && p.id !== currentId)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
};

const normalizeDemoProduct = (product, products = []) => {
  const id = product.id || product._id || `demo-${Date.now()}`;
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const name = product.name || 'Untitled Product';
  return {
    ...product,
    id,
    slug: product.slug || uniqueSlug(name, products, id),
    name,
    brand: product.brand || product.brandName || 'Remote Center',
    category: product.category || product.categoryName || 'universal',
    price: clampMin(product.price),
    originalPrice: product.originalPrice ? clampMin(product.originalPrice) : undefined,
    stock: clampMin(product.stock),
    rating: product.rating || 0,
    reviews: product.reviews || 0,
    image: product.image || images[0] || `https://picsum.photos/seed/${id}/600/600`,
    images,
  };
};

const withLatestSampleCatalog = (products) => {
  let changed = false;
  const sampleById = new Map(sampleProducts.map((product) => [product.id, product]));
  const seen = new Set();
  const next = products.map((product) => {
    const sample = sampleById.get(product.id);
    if (!sample) return product;
    seen.add(product.id);
    if (
      product.name === sample.name &&
      product.price === sample.price &&
      product.image === sample.image &&
      product.slug === sample.slug
    ) {
      return product;
    }
    changed = true;
    return normalizeDemoProduct(sample, products);
  });
  sampleProducts.forEach((sample) => {
    if (seen.has(sample.id)) return;
    changed = true;
    next.push(normalizeDemoProduct(sample, next));
  });
  return { changed, products: next };
};

export function getDemoProducts(params = {}) {
  const stored = read(DEMO_STORAGE_KEYS.products, null);
  let products = stored || write(DEMO_STORAGE_KEYS.products, sampleProducts.map((p) => normalizeDemoProduct(p, sampleProducts)));
  if (stored) {
    const refreshed = withLatestSampleCatalog(products);
    if (refreshed.changed) products = write(DEMO_STORAGE_KEYS.products, refreshed.products);
  }
  const q = params.q?.toString().toLowerCase().trim();
  const min = params.min === '' || params.min == null ? null : clampMin(params.min);
  const max = params.max === '' || params.max == null ? null : clampMin(params.max);

  let filtered = products;
  if (params.category) filtered = filtered.filter((p) => p.category === params.category);
  if (params.brand) filtered = filtered.filter((p) => p.brand === params.brand);
  if (q) filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  if (min != null) filtered = filtered.filter((p) => p.price >= min);
  if (max != null) filtered = filtered.filter((p) => p.price <= max);
  if (params.featured) filtered = filtered.filter((p) => p.isBestseller || p.isNew || p.stock > 0);
  if (params.limit) filtered = filtered.slice(0, Number(params.limit));
  return filtered;
}

export function getDemoProduct(slugOrId) {
  return getDemoProducts().find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
}

export function saveDemoProduct(payload) {
  const products = getDemoProducts();
  const id = payload.id || payload._id || `demo-${Date.now()}`;
  const nextProduct = normalizeDemoProduct({ ...payload, id }, products);
  const exists = products.some((p) => p.id === id);
  const next = exists ? products.map((p) => (p.id === id ? { ...p, ...nextProduct } : p)) : [nextProduct, ...products];
  write(DEMO_STORAGE_KEYS.products, next);
  return nextProduct;
}

export function removeDemoProduct(id) {
  const next = getDemoProducts().filter((p) => p.id !== id && p.slug !== id);
  write(DEMO_STORAGE_KEYS.products, next);
  return { success: true };
}

export function getDemoOrders() {
  return read(DEMO_STORAGE_KEYS.orders, null) || write(DEMO_STORAGE_KEYS.orders, sampleOrders);
}

export function saveDemoOrder(payload, order = {}) {
  const id = order.trackingNumber || order._id || `RCK-${Date.now().toString().slice(-6)}`;
  const saved = {
    id,
    _id: order._id || id,
    trackingNumber: id,
    customer: payload.shippingAddress?.name || 'Walk-in Customer',
    email: payload.shippingAddress?.email || '',
    phone: payload.shippingAddress?.phone || '',
    status: 'placed',
    total: clampMin(payload.total),
    date: Date.now(),
    items: payload.items || [],
    shippingAddress: payload.shippingAddress,
    deliveryMethod: payload.deliveryMethod,
    paymentMethod: payload.paymentMethod,
  };
  write(DEMO_STORAGE_KEYS.orders, [saved, ...getDemoOrders()]);
  return saved;
}

export function updateDemoOrderStatus(id, status) {
  const orders = getDemoOrders().map((order) => (order.id === id || order._id === id ? { ...order, status } : order));
  write(DEMO_STORAGE_KEYS.orders, orders);
  return orders.find((order) => order.id === id || order._id === id);
}

export function getDemoCustomers() {
  const byEmail = new Map();
  getDemoOrders().forEach((order) => {
    const email = order.email || `${order.customer}@demo.local`;
    const current = byEmail.get(email) || { name: order.customer, email, orders: 0, spent: 0 };
    current.orders += 1;
    current.spent += clampMin(order.total);
    byEmail.set(email, current);
  });
  return Array.from(byEmail.values());
}

export function getDemoStats() {
  const products = getDemoProducts();
  const orders = getDemoOrders();
  return {
    revenue: orders.reduce((sum, order) => sum + clampMin(order.total), 0),
    orders: orders.length,
    customers: getDemoCustomers().length,
    products: products.length,
    lowStock: products.filter((p) => p.stock <= 10).length,
  };
}

export const getDemoCoupons = () => read(DEMO_STORAGE_KEYS.coupons, []);
export const saveDemoCoupon = (coupon) =>
  write(DEMO_STORAGE_KEYS.coupons, [{ ...coupon, id: coupon.id || `coupon-${Date.now()}` }, ...getDemoCoupons()]);
export const removeDemoCoupon = (id) => write(DEMO_STORAGE_KEYS.coupons, getDemoCoupons().filter((coupon) => coupon.id !== id));

export const getDemoBanners = () => read(DEMO_STORAGE_KEYS.banners, []);
export const saveDemoBanner = (banner) =>
  write(DEMO_STORAGE_KEYS.banners, [{ ...banner, id: banner.id || `banner-${Date.now()}` }, ...getDemoBanners()]);
export const removeDemoBanner = (id) => write(DEMO_STORAGE_KEYS.banners, getDemoBanners().filter((banner) => banner.id !== id));
