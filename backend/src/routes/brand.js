import { Router } from 'express';
import * as c from '../controllers/brand.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();
router.get('/', c.list);
router.post('/', requireAuth, requireRole('admin', 'staff'), validate(c.schema), c.createOne);
router.put('/:id', requireAuth, requireRole('admin', 'staff'), validate(c.schema.partial()), c.updateOne);
router.delete('/:id', requireAuth, requireRole('admin'), c.deleteOne);

export default router;
