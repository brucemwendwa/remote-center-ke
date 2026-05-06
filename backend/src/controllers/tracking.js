import Order from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';
import { emitOrderTracking } from '../sockets/index.js';
import { z } from 'zod';

export const trackingEventSchema = z.object({
  location: z.string().min(2),
  note: z.string().optional(),
});

export const addTrackingEvent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Not found');
  order.statusHistory.push({
    status: order.status,
    note: `${req.body.location}${req.body.note ? ' — ' + req.body.note : ''}`,
    at: new Date(),
  });
  await order.save();
  emitOrderTracking(order, req.body.location, req.body.note);
  ok(res, order, 'Tracking event added');
});
