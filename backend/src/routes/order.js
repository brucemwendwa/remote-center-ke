import { Router } from 'express';
import * as c from '../controllers/order.js';
import { requireAuth, requireRole, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/', optionalAuth, validate(c.createOrderSchema), c.createOrder);
router.get('/mine', requireAuth, c.myOrders);
router.get('/track/:trackingNumber', c.trackOrder);
router.get('/admin', requireAuth, requireRole('admin', 'staff'), c.adminList);
router.get('/:id', requireAuth, c.getOrder);
router.patch(
  '/:id/status',
  requireAuth,
  requireRole('admin', 'staff'),
  validate(c.updateStatusSchema),
  c.updateStatus
);

export default router;
