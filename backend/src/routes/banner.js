import { Router } from 'express';
import { z } from 'zod';
import Banner from '../models/Banner.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const bannerSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  image: z.string().optional(),
  link: z.string().optional(),
  position: z.enum(['hero', 'secondary', 'footer']).optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const filter = { isActive: true };
    if (req.query.position) filter.position = req.query.position;
    const items = await Banner.find(filter).sort({ order: 1, createdAt: -1 });
    ok(res, items);
  })
);

router.post(
  '/',
  requireAuth,
  requireRole('admin', 'staff'),
  validate(bannerSchema),
  asyncHandler(async (req, res) => {
    const item = await Banner.create(req.body);
    created(res, item);
  })
);

router.put(
  '/:id',
  requireAuth,
  requireRole('admin', 'staff'),
  validate(bannerSchema.partial()),
  asyncHandler(async (req, res) => {
    const item = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) throw new ApiError(404, 'Not found');
    ok(res, item);
  })
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    const item = await Banner.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');
    ok(res, null, 'Deleted');
  })
);

export default router;
