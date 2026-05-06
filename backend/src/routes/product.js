import { Router } from 'express';
import * as c from '../controllers/product.js';
import * as r from '../controllers/review.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();
router.get('/', c.list);
router.get('/featured', c.featured);
router.get('/best-sellers', c.bestSellers);
router.get('/:slug', c.getBySlug);
router.post('/', requireAuth, requireRole('admin', 'staff'), validate(c.productSchema), c.createProduct);
router.put('/:id', requireAuth, requireRole('admin', 'staff'), validate(c.productSchema.partial()), c.updateProduct);
router.delete('/:id', requireAuth, requireRole('admin', 'staff'), c.deleteProduct);
router.post('/:id/reviews', requireAuth, validate(c.reviewSchema), c.addReview);
router.get('/:productId/reviews', r.listForProduct);

export default router;
