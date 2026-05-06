import Review from '../models/Review.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';
import { paginate, meta } from '../utils/paginate.js';

export const listForProduct = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginate(req.query);
  const filter = { product: req.params.productId, isApproved: true };
  const [items, total] = await Promise.all([
    Review.find(filter).populate('user', 'name avatar').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Review.countDocuments(filter),
  ]);
  ok(res, items, 'Reviews', meta(total, page, limit));
});

export const deleteReview = asyncHandler(async (req, res) => {
  const r = await Review.findByIdAndDelete(req.params.id);
  if (!r) throw new ApiError(404, 'Not found');
  ok(res, null, 'Deleted');
});
