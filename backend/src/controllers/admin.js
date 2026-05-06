import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/ApiResponse.js';

export const stats = asyncHandler(async (_req, res) => {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [revenueAgg, totalOrders, totalCustomers, lowStock, topProducts] = await Promise.all([
    Order.aggregate([
      { $match: { paymentStatus: 'paid', createdAt: { $gte: since } } },
      { $group: { _id: null, total: { $sum: '$pricing.total' }, count: { $sum: 1 } } },
    ]),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Product.countDocuments({ $expr: { $lte: ['$stock', '$lowStockThreshold'] } }),
    Product.find().sort({ soldCount: -1 }).limit(5).select('name soldCount price images'),
  ]);

  ok(res, {
    revenue30d: revenueAgg[0]?.total || 0,
    paidOrders30d: revenueAgg[0]?.count || 0,
    totalOrders,
    totalCustomers,
    lowStockCount: lowStock,
    topProducts,
    generatedAt: new Date(),
  });
});
