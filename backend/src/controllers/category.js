import { z } from 'zod';
import Category from '../models/Category.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';

export const list = asyncHandler(async (_req, res) => {
  const items = await Category.find({ isActive: true }).sort({ name: 1 });
  ok(res, items);
});
export const getOne = asyncHandler(async (req, res) => {
  const item = await Category.findOne({ $or: [{ slug: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }] });
  if (!item) throw new ApiError(404, 'Not found');
  ok(res, item);
});
export const schema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});
export const createOne = asyncHandler(async (req, res) => {
  const item = await Category.create(req.body);
  created(res, item);
});
export const updateOne = asyncHandler(async (req, res) => {
  const item = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) throw new ApiError(404, 'Not found');
  ok(res, item);
});
export const deleteOne = asyncHandler(async (req, res) => {
  const item = await Category.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Not found');
  ok(res, null, 'Deleted');
});
