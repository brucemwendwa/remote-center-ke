import { z } from 'zod';
import Coupon from '../models/Coupon.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';

export const validateSchema = z.object({
  code: z.string().min(2),
  subtotal: z.number().nonnegative(),
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;
  const c = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!c) throw new ApiError(404, 'Invalid coupon');
  if (c.expiresAt && c.expiresAt < new Date()) throw new ApiError(400, 'Coupon expired');
  if (c.usageLimit && c.usedCount >= c.usageLimit) throw new ApiError(400, 'Usage limit reached');
  if (subtotal < (c.minSubtotal || 0)) throw new ApiError(400, `Minimum subtotal KES ${c.minSubtotal}`);
  let discount = c.type === 'percent' ? Math.round((subtotal * c.value) / 100) : c.value;
  if (c.maxDiscount) discount = Math.min(discount, c.maxDiscount);
  ok(res, { code: c.code, type: c.type, value: c.value, discount });
});

export const adminListSchema = z.object({});

export const list = asyncHandler(async (_req, res) => {
  ok(res, await Coupon.find().sort({ createdAt: -1 }));
});
export const couponSchema = z.object({
  code: z.string().min(2),
  type: z.enum(['percent', 'fixed']),
  value: z.number().nonnegative(),
  minSubtotal: z.number().nonnegative().optional(),
  maxDiscount: z.number().nonnegative().optional(),
  expiresAt: z.string().datetime().optional(),
  usageLimit: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
});
export const createOne = asyncHandler(async (req, res) => {
  created(res, await Coupon.create(req.body));
});
export const updateOne = asyncHandler(async (req, res) => {
  const c = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!c) throw new ApiError(404, 'Not found');
  ok(res, c);
});
export const deleteOne = asyncHandler(async (req, res) => {
  const c = await Coupon.findByIdAndDelete(req.params.id);
  if (!c) throw new ApiError(404, 'Not found');
  ok(res, null, 'Deleted');
});
