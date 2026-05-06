import { z } from 'zod';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';
import { paginate, meta } from '../utils/paginate.js';

export const list = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginate(req.query);
  const { q, category, brand, minPrice, maxPrice, sort } = req.query;
  const filter = { isActive: true };
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  let sortBy = { createdAt: -1 };
  if (sort === 'price_asc') sortBy = { price: 1 };
  else if (sort === 'price_desc') sortBy = { price: -1 };
  else if (sort === 'rating') sortBy = { rating: -1 };
  else if (sort === 'best_sellers') sortBy = { soldCount: -1 };

  const [items, total] = await Promise.all([
    Product.find(filter).populate('category brand').sort(sortBy).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);
  ok(res, items, 'Products', meta(total, page, limit));
});

export const featured = asyncHandler(async (_req, res) => {
  const items = await Product.find({ isActive: true, isFeatured: true })
    .populate('category brand')
    .limit(12)
    .sort({ createdAt: -1 });
  ok(res, items);
});

export const bestSellers = asyncHandler(async (_req, res) => {
  const items = await Product.find({ isActive: true })
    .populate('category brand')
    .sort({ soldCount: -1, rating: -1 })
    .limit(12);
  ok(res, items);
});

export const getBySlug = asyncHandler(async (req, res) => {
  const item = await Product.findOne({ slug: req.params.slug }).populate('category brand');
  if (!item) throw new ApiError(404, 'Product not found');
  ok(res, item);
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  categoryName: z.string().optional(),
  brand: z.string().optional(),
  brandName: z.string().optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sku: z.string().optional(),
});

export const createProduct = asyncHandler(async (req, res) => {
  const item = await Product.create(req.body);
  created(res, item);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) throw new ApiError(404, 'Product not found');
  ok(res, item, 'Updated');
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const item = await Product.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Product not found');
  ok(res, null, 'Deleted');
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().optional(),
});

export const addReview = asyncHandler(async (req, res) => {
  const product = await Product.findOne(
    req.params.id.match(/^[a-f\d]{24}$/i) ? { _id: req.params.id } : { slug: req.params.id }
  );
  if (!product) throw new ApiError(404, 'Product not found');
  const review = await Review.findOneAndUpdate(
    { product: product._id, user: req.user._id },
    { ...req.body, product: product._id, user: req.user._id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  // recompute aggregates
  const agg = await Review.aggregate([
    { $match: { product: product._id, isApproved: true } },
    { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (agg[0]) {
    product.rating = Number(agg[0].avg.toFixed(2));
    product.numReviews = agg[0].count;
    await product.save();
  }
  created(res, review, 'Review submitted');
});
