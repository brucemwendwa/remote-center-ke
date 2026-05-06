import { z } from 'zod';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';
import { paginate, meta } from '../utils/paginate.js';
import { generateTrackingNumber } from '../utils/generateTrackingNumber.js';
import { calcDeliveryFee } from '../utils/deliveryFee.js';
import { emitOrderStatus } from '../sockets/index.js';
import { sendEmail, emailTemplates } from '../services/email.js';

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string(),
        qty: z.number().int().min(1),
      })
    )
    .min(1),
  shippingAddress: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(7),
    line1: z.string().min(2),
    line2: z.string().optional(),
    city: z.string().default('Nairobi'),
    area: z.string().optional(),
    country: z.string().default('Kenya'),
  }),
  paymentMethod: z.enum(['mpesa', 'stripe', 'cod']).default('cod'),
  couponCode: z.string().optional(),
  notes: z.string().optional(),
  guestEmail: z.string().email().optional(),
});

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, couponCode, notes, guestEmail } = req.body;

  const ids = items.map((i) => i.product);
  const products = await Product.find({ _id: { $in: ids }, isActive: true });
  if (products.length !== items.length) throw new ApiError(400, 'Some products are unavailable');

  const orderItems = [];
  let subtotal = 0;
  for (const i of items) {
    const p = products.find((x) => x._id.toString() === i.product);
    if (p.stock < i.qty) throw new ApiError(400, `Insufficient stock for ${p.name}`);
    const sub = p.price * i.qty;
    subtotal += sub;
    orderItems.push({
      product: p._id,
      name: p.name,
      image: p.images?.[0],
      price: p.price,
      qty: i.qty,
      subtotal: sub,
    });
  }

  const deliveryFee = calcDeliveryFee(shippingAddress);
  let discount = 0;
  let couponData = null;
  if (couponCode) {
    const c = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
    if (!c) throw new ApiError(400, 'Invalid coupon');
    if (c.expiresAt && c.expiresAt < new Date()) throw new ApiError(400, 'Coupon expired');
    if (c.usageLimit && c.usedCount >= c.usageLimit) throw new ApiError(400, 'Coupon usage limit reached');
    if (subtotal < (c.minSubtotal || 0)) throw new ApiError(400, 'Coupon minimum not met');
    discount = c.type === 'percent' ? Math.round((subtotal * c.value) / 100) : c.value;
    if (c.maxDiscount) discount = Math.min(discount, c.maxDiscount);
    couponData = { code: c.code, discount };
    c.usedCount += 1;
    await c.save();
  }
  const tax = 0;
  const total = Math.max(0, subtotal + deliveryFee + tax - discount);

  const trackingNumber = generateTrackingNumber();
  const order = await Order.create({
    user: req.user?._id,
    guestEmail: req.user ? undefined : guestEmail,
    items: orderItems,
    pricing: { subtotal, deliveryFee, tax, discount, total },
    coupon: couponData,
    shippingAddress,
    paymentMethod,
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'unpaid',
    status: 'pending',
    statusHistory: [{ status: 'pending', note: 'Order created', at: new Date() }],
    trackingNumber,
    notes,
  });

  // decrement stock
  await Promise.all(
    orderItems.map((i) =>
      Product.updateOne({ _id: i.product }, { $inc: { stock: -i.qty, soldCount: i.qty } })
    )
  );

  const recipient = req.user?.email || guestEmail;
  if (recipient) sendEmail({ to: recipient, ...emailTemplates.orderPlaced(order) }).catch(() => {});

  created(res, order, 'Order created');
});

export const myOrders = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginate(req.query);
  const [items, total] = await Promise.all([
    Order.find({ user: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments({ user: req.user._id }),
  ]);
  ok(res, items, 'Orders', meta(total, page, limit));
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');
  if (req.user.role === 'customer' && order.user?.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Forbidden');
  }
  ok(res, order);
});

export const trackOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ trackingNumber: req.params.trackingNumber }).select(
    '-user -guestEmail -paymentRef'
  );
  if (!order) throw new ApiError(404, 'Order not found');
  ok(res, order);
});

export const updateStatusSchema = z.object({
  status: z.enum([
    'pending',
    'paid',
    'processing',
    'packed',
    'shipped',
    'in_transit',
    'delivered',
    'cancelled',
  ]),
  note: z.string().optional(),
});

export const updateStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');
  order.status = req.body.status;
  order.statusHistory.push({ status: req.body.status, note: req.body.note, at: new Date() });
  if (req.body.status === 'cancelled') {
    await Promise.all(
      order.items.map((i) =>
        Product.updateOne({ _id: i.product }, { $inc: { stock: i.qty, soldCount: -i.qty } })
      )
    );
  }
  await order.save();
  emitOrderStatus(order);
  ok(res, order, 'Status updated');
});

export const adminList = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginate(req.query);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
  const [items, total] = await Promise.all([
    Order.find(filter).populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);
  ok(res, items, 'Orders', meta(total, page, limit));
});
