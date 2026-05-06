import { Router } from 'express';
import auth from './auth.js';
import users from './user.js';
import products from './product.js';
import categories from './category.js';
import brands from './brand.js';
import orders from './order.js';
import payments from './payment.js';
import coupons from './coupon.js';
import admin from './admin.js';
import upload from './upload.js';
import tracking from './tracking.js';
import banners from './banner.js';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/products', products);
router.use('/categories', categories);
router.use('/brands', brands);
router.use('/orders', orders);
router.use('/payments', payments);
router.use('/coupons', coupons);
router.use('/admin', admin);
router.use('/upload', upload);
router.use('/tracking', tracking);
router.use('/banners', banners);

export default router;
