import { Router } from 'express';
import * as c from '../controllers/upload.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post(
  '/image',
  requireAuth,
  requireRole('admin', 'staff'),
  upload.single('image'),
  c.uploadImage
);

export default router;
