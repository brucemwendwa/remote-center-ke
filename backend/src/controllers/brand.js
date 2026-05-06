import { z } from 'zod';
import Brand from '../models/Brand.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';

export const list = asyncHandler(async (_req, res) => {
  const items = await Brand.find({ isActive: true }).sort({ name: 1 });
  ok(res, items);
});
export const schema = z.object({
  name: z.string().min(1),
  logo: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
export const createOne = asyncHandler(async (req, res) => {
  const item = await Brand.create(req.body);
  created(res, item);
});
export const updateOne = asyncHandler(async (req, res) => {
  const item = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) throw new ApiError(404, 'Not found');
  ok(res, item);
});
export const deleteOne = asyncHandler(async (req, res) => {
  const item = await Brand.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Not found');
  ok(res, null, 'Deleted');
});
