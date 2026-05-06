import { Router } from 'express';
import * as c from '../controllers/coupon.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/validate', validate(c.validateSchema), c.validateCoupon);
router.get('/', requireAuth, requireRole('admin', 'staff'), c.list);
router.post('/', requireAuth, requireRole('admin'), validate(c.couponSchema), c.createOne);
router.put('/:id', requireAuth, requireRole('admin'), validate(c.couponSchema.partial()), c.updateOne);
router.delete('/:id', requireAuth, requireRole('admin'), c.deleteOne);

export default router;
