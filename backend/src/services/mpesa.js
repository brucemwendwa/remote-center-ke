import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';
import { normalizePhone } from '../utils/normalizePhone.js';

const env = () => (process.env.MPESA_ENV === 'production' ? 'production' : 'sandbox');
const baseUrl = () =>
  env() === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';

export function mpesaConfigured() {
  const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY } = process.env;
  return !!(MPESA_CONSUMER_KEY && MPESA_CONSUMER_SECRET && MPESA_SHORTCODE && MPESA_PASSKEY);
}

export async function getAccessToken() {
  if (!mpesaConfigured()) throw new ApiError(503, 'M-Pesa is not configured');
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');
  const url = `${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`;
  const { data } = await axios.get(url, { headers: { Authorization: `Basic ${auth}` } });
  return data.access_token;
}

function timestamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return (
    d.getFullYear().toString() +
    p(d.getMonth() + 1) +
    p(d.getDate()) +
    p(d.getHours()) +
    p(d.getMinutes()) +
    p(d.getSeconds())
  );
}

export async function stkPush({ phone, amount, accountReference, description }) {
  if (!mpesaConfigured()) throw new ApiError(503, 'M-Pesa is not configured');
  const msisdn = normalizePhone(phone);
  if (!msisdn) throw new ApiError(400, 'Invalid phone number');
  const token = await getAccessToken();
  const ts = timestamp();
  const shortcode = process.env.MPESA_SHORTCODE;
  const password = Buffer.from(`${shortcode}${process.env.MPESA_PASSKEY}${ts}`).toString('base64');

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: ts,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Math.round(Number(amount)),
    PartyA: msisdn,
    PartyB: shortcode,
    PhoneNumber: msisdn,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountReference || 'RCK',
    TransactionDesc: description || 'Remote Center Kenya',
  };

  const { data } = await axios.post(`${baseUrl()}/mpesa/stkpush/v1/processrequest`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // { MerchantRequestID, CheckoutRequestID, ResponseCode, ResponseDescription, CustomerMessage }
}

export async function transactionStatus({ checkoutRequestId }) {
  if (!mpesaConfigured()) throw new ApiError(503, 'M-Pesa is not configured');
  const token = await getAccessToken();
  const ts = timestamp();
  const shortcode = process.env.MPESA_SHORTCODE;
  const password = Buffer.from(`${shortcode}${process.env.MPESA_PASSKEY}${ts}`).toString('base64');
  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: ts,
    CheckoutRequestID: checkoutRequestId,
  };
  const { data } = await axios.post(`${baseUrl()}/mpesa/stkpushquery/v1/query`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export function parseCallback(body) {
  const stk = body?.Body?.stkCallback;
  if (!stk) return { ok: false, error: 'Invalid callback body' };
  const result = {
    ok: stk.ResultCode === 0,
    resultCode: stk.ResultCode,
    resultDesc: stk.ResultDesc,
    merchantRequestId: stk.MerchantRequestID,
    checkoutRequestId: stk.CheckoutRequestID,
    amount: null,
    mpesaReceipt: null,
    transactionDate: null,
    phoneNumber: null,
  };
  const items = stk.CallbackMetadata?.Item || [];
  for (const it of items) {
    if (it.Name === 'Amount') result.amount = it.Value;
    if (it.Name === 'MpesaReceiptNumber') result.mpesaReceipt = it.Value;
    if (it.Name === 'TransactionDate') result.transactionDate = it.Value;
    if (it.Name === 'PhoneNumber') result.phoneNumber = it.Value;
  }
  return result;
}
