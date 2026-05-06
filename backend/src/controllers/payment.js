import { z } from 'zod';
import Order from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';
import { stkPush, parseCallback, mpesaConfigured } from '../services/mpesa.js';
import {
  createPaymentIntent,
  constructWebhookEvent,
  stripeEnabled,
} from '../services/stripe.js';
import { emitOrderStatus } from '../sockets/index.js';

export const stkSchema = z.object({
  orderId: z.string(),
  phone: z.string().min(7),
});

export const mpesaStk = asyncHandler(async (req, res) => {
  if (!mpesaConfigured()) throw new ApiError(503, 'M-Pesa not configured');
  const { orderId, phone } = req.body;
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, 'Order not found');
  if (order.paymentStatus === 'paid') throw new ApiError(400, 'Order already paid');

  const data = await stkPush({
    phone,
    amount: order.pricing.total,
    accountReference: order.trackingNumber,
    description: `Payment for ${order.trackingNumber}`,
  });

  order.paymentMethod = 'mpesa';
  order.paymentStatus = 'pending';
  order.paymentRef = order.paymentRef || {};
  order.paymentRef.checkoutRequestId = data.CheckoutRequestID;
  order.paymentRef.raw = data;
  await order.save();

  ok(res, { checkoutRequestId: data.CheckoutRequestID, raw: data }, 'STK push initiated');
});

export const mpesaCallback = asyncHandler(async (req, res) => {
  const parsed = parseCallback(req.body);
  // Always respond 200 OK to Daraja
  if (!parsed.checkoutRequestId) return res.json({ ResultCode: 0, ResultDesc: 'Accepted' });

  const order = await Order.findOne({ 'paymentRef.checkoutRequestId': parsed.checkoutRequestId });
  if (order) {
    if (parsed.ok) {
      order.paymentStatus = 'paid';
      order.status = 'paid';
      order.paymentRef.mpesaReceipt = parsed.mpesaReceipt;
      order.paymentRef.raw = parsed;
      order.statusHistory.push({
        status: 'paid',
        note: `M-Pesa ${parsed.mpesaReceipt}`,
        at: new Date(),
      });
    } else {
      order.paymentStatus = 'failed';
      order.paymentRef.raw = parsed;
      order.statusHistory.push({
        status: order.status,
        note: `M-Pesa failed: ${parsed.resultDesc}`,
        at: new Date(),
      });
    }
    await order.save();
    emitOrderStatus(order);
  }
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

export const stripeIntentSchema = z.object({ orderId: z.string() });

export const stripeIntent = asyncHandler(async (req, res) => {
  if (!stripeEnabled()) throw new ApiError(503, 'Stripe not configured');
  const order = await Order.findById(req.body.orderId);
  if (!order) throw new ApiError(404, 'Order not found');
  const intent = await createPaymentIntent({
    amount: order.pricing.total,
    currency: 'kes',
    metadata: { orderId: order._id.toString(), tracking: order.trackingNumber },
  });
  order.paymentMethod = 'stripe';
  order.paymentStatus = 'pending';
  order.paymentRef = order.paymentRef || {};
  order.paymentRef.stripePaymentIntentId = intent.id;
  await order.save();
  ok(res, { clientSecret: intent.client_secret, paymentIntentId: intent.id });
});

export const stripeWebhook = asyncHandler(async (req, res) => {
  if (!stripeEnabled()) return res.status(503).send('Stripe not configured');
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = constructWebhookEvent(req.body, sig);
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const order = await Order.findOne({ 'paymentRef.stripePaymentIntentId': pi.id });
    if (order) {
      order.paymentStatus = 'paid';
      order.status = 'paid';
      order.statusHistory.push({ status: 'paid', note: 'Stripe payment succeeded', at: new Date() });
      await order.save();
      emitOrderStatus(order);
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const pi = event.data.object;
    const order = await Order.findOne({ 'paymentRef.stripePaymentIntentId': pi.id });
    if (order) {
      order.paymentStatus = 'failed';
      await order.save();
    }
  }
  res.json({ received: true });
});

export const codSchema = z.object({ orderId: z.string() });

export const cod = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.orderId);
  if (!order) throw new ApiError(404, 'Order not found');
  order.paymentMethod = 'cod';
  order.paymentStatus = 'pending';
  order.statusHistory.push({ status: order.status, note: 'COD selected', at: new Date() });
  await order.save();
  ok(res, order, 'COD set');
});
