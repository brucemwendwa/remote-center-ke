import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';
import User from '../models/User.js';

const CATEGORY_DEFS = [
  { name: 'TV Replacement Remotes', slug: 'tv-replacement-remotes', type: 'replacement' },
  { name: 'Smart TV Remotes', slug: 'smart-tv-remotes', type: 'replacement' },
  { name: 'Voice Control Remotes', slug: 'voice-control-remotes', type: 'voice' },
  { name: 'Android TV Remotes', slug: 'android-tv-remotes', type: 'voice' },
  { name: 'Remote Covers', slug: 'remote-covers', type: 'cover' },
  { name: 'Silicone Anti-Dust Covers', slug: 'silicone-anti-dust-covers', type: 'cover' },
  { name: 'Rechargeable Remotes', slug: 'rechargeable-remotes', type: 'rechargeable' },
  { name: 'Universal Remotes', slug: 'universal-remotes', type: 'universal' },
  { name: 'Soundbar Remotes', slug: 'soundbar-remotes', type: 'replacement' },
];

const BRAND_NAMES = [
  'Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Xiaomi',
  'Skyworth', 'Vision Plus', 'Vitron', 'JBL', 'Fire TV Stick',
];

const PRICE_RANGES = {
  cover: [350, 800],
  replacement: [800, 2000],
  voice: [1800, 3500],
  universal: [1200, 2500],
  rechargeable: [2500, 4500],
};

const COLORS = ['Black', 'White', 'Grey', 'Silver', 'Blue'];
const BATTERY = ['2x AAA', '2x AA', 'Built-in Li-ion', 'USB-C Rechargeable'];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}
function randPrice(type) {
  const [lo, hi] = PRICE_RANGES[type] || [800, 2000];
  return rand(lo, hi);
}

function makeProductName(brand, type, model) {
  if (type === 'cover') return `${brand} Silicone Anti-Dust Remote Cover ${model}`;
  if (type === 'voice') return `${brand} Voice Control Smart TV Remote ${model}`;
  if (type === 'universal') return `${brand}-Compatible Universal TV Remote ${model}`;
  if (type === 'rechargeable') return `${brand} Rechargeable Smart TV Remote ${model}`;
  return `${brand} Smart TV Replacement Remote ${model}`;
}

function makeModelCode() {
  const letters = ['BN', 'AKB', 'RM', 'EN', 'CT', 'RC'];
  return `${pick(letters)}${rand(10, 99)}-${rand(10000, 99999)}${pick(['', 'A', 'B'])}`;
}

function makeDescription(name, type) {
  const base = `${name} is a high-quality remote designed for everyday use in Kenyan homes.`;
  const detail = {
    cover: 'The silicone sleeve protects against dust, drops and spills while keeping all buttons fully responsive.',
    replacement: 'Plug-and-play replacement with no programming required — works out of the box with the matching TV models.',
    voice: 'Built-in microphone enables voice search across YouTube, Netflix and your smart TV launcher.',
    universal: 'Programmable for most major TV brands using simple code-entry pairing in under a minute.',
    rechargeable: 'Built-in lithium battery charges via USB-C and lasts weeks on a single charge.',
  }[type];
  return `${base} ${detail} Backed by a local 6-month warranty and same-day Nairobi dispatch.`;
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: true });
  console.log('[seed] connected');

  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({}),
    Brand.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log('[seed] cleared');

  const categories = await Category.insertMany(
    CATEGORY_DEFS.map((c) => ({ name: c.name, slug: c.slug, isActive: true }))
  );
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  console.log(`[seed] ${categories.length} categories`);

  const brands = await Brand.insertMany(BRAND_NAMES.map((name) => ({ name, isActive: true })));
  const brandByName = Object.fromEntries(brands.map((b) => [b.name, b]));
  console.log(`[seed] ${brands.length} brands`);

  // 40 products
  const products = [];
  const featuredIdx = new Set();
  while (featuredIdx.size < 7) featuredIdx.add(rand(0, 39));
  const bestSellerIdx = new Set();
  while (bestSellerIdx.size < 8) bestSellerIdx.add(rand(0, 39));

  for (let i = 0; i < 40; i++) {
    const def = pick(CATEGORY_DEFS);
    const brandName = pick(BRAND_NAMES);
    const model = makeModelCode();
    const name = makeProductName(brandName, def.type, model);
    const price = randPrice(def.type);
    const compareAt = Math.random() < 0.5 ? price + rand(100, 800) : undefined;
    const stock = rand(5, 80);
    const rating = Number((Math.random() * (4.9 - 3.8) + 3.8).toFixed(1));
    const numReviews = rand(2, 120);
    const soldCount = rand(0, 250);

    products.push({
      name,
      sku: `RCK-${1000 + i}`,
      description: makeDescription(name, def.type),
      shortDescription: `${brandName} ${def.name.toLowerCase()} — ready-to-use replacement.`,
      price,
      compareAtPrice: compareAt,
      currency: 'KES',
      images: [
        `https://picsum.photos/seed/rck-${i}/600/600`,
        `https://picsum.photos/seed/rck-${i}-b/600/600`,
      ],
      category: catBySlug[def.slug]._id,
      brand: brandByName[brandName]._id,
      stock,
      isActive: true,
      isFeatured: featuredIdx.has(i),
      rating,
      numReviews,
      soldCount: bestSellerIdx.has(i) ? Math.max(soldCount, 150) : soldCount,
      tags: [brandName.toLowerCase(), def.type, 'remote', 'kenya'],
      attributes: {
        brand: brandName,
        type: def.type,
        color: pick(COLORS),
        batteryType: pick(BATTERY),
      },
    });
  }

  // Use create() so pre-validate slug hook fires
  const createdProducts = [];
  for (const p of products) {
    createdProducts.push(await Product.create(p));
  }
  console.log(`[seed] ${createdProducts.length} products`);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@remotecenter.ke',
    password: 'Admin@123',
    role: 'admin',
    emailVerified: true,
  });
  const customer = await User.create({
    name: 'Jane Wanjiku',
    email: 'jane@example.com',
    password: 'Pass@123',
    role: 'customer',
    emailVerified: true,
    phone: '0712345678',
  });
  console.log(`[seed] users: ${admin.email}, ${customer.email}`);

  console.log('---- SEED SUMMARY ----');
  console.log(`Categories : ${categories.length}`);
  console.log(`Brands     : ${brands.length}`);
  console.log(`Products   : ${createdProducts.length}`);
  console.log(`Featured   : ${featuredIdx.size}`);
  console.log(`BestSellers: ${bestSellerIdx.size}`);
  console.log(`Admin login: admin@remotecenter.ke / Admin@123`);
  console.log(`Customer   : jane@example.com / Pass@123`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed] failed', err);
  process.exit(1);
});
