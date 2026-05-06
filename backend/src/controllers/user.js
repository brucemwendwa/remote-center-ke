import { z } from 'zod';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';
import { paginate, meta } from '../utils/paginate.js';

export const getMe = asyncHandler(async (req, res) => ok(res, req.user.toSafeJSON()));

export const updateMeSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const updateMe = asyncHandler(async (req, res) => {
  Object.assign(req.user, req.body);
  await req.user.save();
  ok(res, req.user.toSafeJSON(), 'Updated');
});

export const listUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginate(req.query);
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.q) filter.$or = [
    { name: { $regex: req.query.q, $options: 'i' } },
    { email: { $regex: req.query.q, $options: 'i' } },
  ];
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);
  ok(res, items.map((u) => u.toSafeJSON()), 'Users', meta(total, page, limit));
});

export const addressSchema = z.object({
  label: z.string().optional(),
  fullName: z.string().min(2),
  phone: z.string().min(7),
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().default('Nairobi'),
  area: z.string().optional(),
  country: z.string().default('Kenya'),
  isDefault: z.boolean().optional(),
});

export const addAddress = asyncHandler(async (req, res) => {
  if (req.body.isDefault) req.user.addresses.forEach((a) => (a.isDefault = false));
  req.user.addresses.push(req.body);
  await req.user.save();
  ok(res, req.user.addresses, 'Address added');
});

export const updateAddress = asyncHandler(async (req, res) => {
  const addr = req.user.addresses.id(req.params.id);
  if (!addr) throw new ApiError(404, 'Address not found');
  if (req.body.isDefault) req.user.addresses.forEach((a) => (a.isDefault = false));
  Object.assign(addr, req.body);
  await req.user.save();
  ok(res, req.user.addresses, 'Address updated');
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const addr = req.user.addresses.id(req.params.id);
  if (!addr) throw new ApiError(404, 'Address not found');
  addr.deleteOne();
  await req.user.save();
  ok(res, req.user.addresses, 'Address removed');
});
