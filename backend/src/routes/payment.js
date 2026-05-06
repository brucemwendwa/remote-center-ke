import { Router } from 'express';
import * as c from '../controllers/payment.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/mpesa/stk', requireAuth, validate(c.stkSchema), c.mpesaStk);
router.post('/mpesa/callback', c.mpesaCallback);
router.post('/stripe/intent', requireAuth, validate(c.stripeIntentSchema), c.stripeIntent);
// Stripe webhook receives raw body — mounted with express.raw at app level
router.post('/stripe/webhook', c.stripeWebhook);
router.post('/cod', requireAuth, validate(c.codSchema), c.cod);

export default router;
