import { Router } from 'express';
import * as c from '../controllers/auth.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, standardHeaders: true });

router.post('/register', authLimiter, validate(c.registerSchema), c.register);
router.post('/login', authLimiter, validate(c.loginSchema), c.login);
router.post('/refresh', c.refresh);
router.post('/logout', requireAuth, c.logout);
router.post('/forgot-password', authLimiter, validate(c.forgotPasswordSchema), c.forgotPassword);
router.post('/reset-password', authLimiter, validate(c.resetPasswordSchema), c.resetPassword);
router.post('/verify-email', c.verifyEmail);
router.get('/me', requireAuth, c.me);

export default router;
