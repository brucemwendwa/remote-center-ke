import Stripe from 'stripe';

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn('[stripe] STRIPE_SECRET_KEY not set — stripe disabled');
}

export function stripeEnabled() {
  return !!stripe;
}

export async function createPaymentIntent({ amount, currency = 'kes', metadata = {} }) {
  if (!stripe) throw new Error('Stripe not configured');
  return stripe.paymentIntents.create({
    amount: Math.round(Number(amount) * 100),
    currency,
    metadata,
    automatic_payment_methods: { enabled: true },
  });
}

export function constructWebhookEvent(rawBody, signature) {
  if (!stripe) throw new Error('Stripe not configured');
  if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('STRIPE_WEBHOOK_SECRET not set');
  return stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
}

export { stripe };
