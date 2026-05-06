import { Router } from 'express';
import * as c from '../controllers/admin.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.get('/stats', requireAuth, requireRole('admin', 'staff'), c.stats);

export default router;
