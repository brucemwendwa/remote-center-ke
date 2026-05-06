import { transporter } from '../config/mailer.js';

export async function sendEmail({ to, subject, html, text }) {
  const from = process.env.EMAIL_FROM || 'no-reply@remotecenter.ke';
  if (!transporter) {
    console.log(`[email:fake] to=${to} subject=${subject}`);
    return { fake: true };
  }
  return transporter.sendMail({ from, to, subject, html, text });
}

export const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to Remote Center Kenya',
    html: `<p>Hi ${name},</p><p>Thanks for joining Remote Center Kenya.</p>`,
  }),
  resetPassword: (link) => ({
    subject: 'Reset your password',
    html: `<p>Click <a href="${link}">here</a> to reset your password. Link expires in 1 hour.</p>`,
  }),
  verifyEmail: (link) => ({
    subject: 'Verify your email',
    html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
  }),
  orderPlaced: (order) => ({
    subject: `Order ${order.trackingNumber} received`,
    html: `<p>Your order <b>${order.trackingNumber}</b> totalling KES ${order.pricing.total} has been received.</p>`,
  }),
};
