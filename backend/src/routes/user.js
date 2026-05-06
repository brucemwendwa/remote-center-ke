import { Router } from 'express';
import * as c from '../controllers/user.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();
router.get('/me', requireAuth, c.getMe);
router.put('/me', requireAuth, validate(c.updateMeSchema), c.updateMe);
router.get('/', requireAuth, requireRole('admin'), c.listUsers);
router.post('/addresses', requireAuth, validate(c.addressSchema), c.addAddress);
router.put('/addresses/:id', requireAuth, validate(c.addressSchema.partial()), c.updateAddress);
router.delete('/addresses/:id', requireAuth, c.deleteAddress);

export default router;
