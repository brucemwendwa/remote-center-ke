import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    qty: { type: Number, default: 1, min: 1 },
    subtotal: Number,
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: String,
    note: String,
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    guestEmail: String,
    items: [itemSchema],
    pricing: {
      subtotal: { type: Number, default: 0 },
      deliveryFee: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    coupon: { code: String, discount: Number },
    shippingAddress: {
      fullName: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      area: String,
      country: { type: String, default: 'Kenya' },
    },
    paymentMethod: { type: String, enum: ['mpesa', 'stripe', 'cod'], default: 'cod' },
    paymentStatus: { type: String, enum: ['unpaid', 'pending', 'paid', 'failed', 'refunded'], default: 'unpaid' },
    paymentRef: {
      checkoutRequestId: String,
      mpesaReceipt: String,
      stripePaymentIntentId: String,
      raw: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'processing', 'packed', 'shipped', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    statusHistory: [statusHistorySchema],
    trackingNumber: { type: String, unique: true, index: true },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
