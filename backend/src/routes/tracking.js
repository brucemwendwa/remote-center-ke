import { Router } from 'express';
import * as c from '../controllers/tracking.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post(
  '/orders/:id/events',
  requireAuth,
  requireRole('admin', 'staff'),
  validate(c.trackingEventSchema),
  c.addTrackingEvent
);

export default router;
