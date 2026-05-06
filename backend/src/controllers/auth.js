import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok, created } from '../utils/ApiResponse.js';
import { sendEmail, emailTemplates } from '../services/email.js';

function signAccess(user) {
  const secret =
    process.env.JWT_ACCESS_SECRET ||
    (process.env.NODE_ENV === 'production' ? null : 'dev_access_secret_change_me');
  if (!secret) throw new ApiError(500, 'JWT_ACCESS_SECRET is not set');
  return jwt.sign({ sub: user._id.toString(), role: user.role }, secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  });
}
function signRefresh(user) {
  const secret =
    process.env.JWT_REFRESH_SECRET ||
    (process.env.NODE_ENV === 'production' ? null : 'dev_refresh_secret_change_me');
  if (!secret) throw new ApiError(500, 'JWT_REFRESH_SECRET is not set');
  return jwt.sign({ sub: user._id.toString() }, secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '30d',
  });
}

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, 'Email already registered');
  const user = await User.create({ name, email, password, phone });
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  user.refreshTokens.push(refreshToken);
  await user.save();
  sendEmail({ to: email, ...emailTemplates.welcome(name) }).catch(() => {});
  created(res, { user: user.toSafeJSON(), accessToken, refreshToken }, 'Registered');
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password +refreshTokens');
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const okPw = await user.comparePassword(password);
  if (!okPw) throw new ApiError(401, 'Invalid credentials');
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  user.refreshTokens.push(refreshToken);
  await user.save();
  ok(res, { user: user.toSafeJSON(), accessToken, refreshToken }, 'Logged in');
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(400, 'refreshToken required');
  let payload;
  try {
    const secret =
      process.env.JWT_REFRESH_SECRET ||
      (process.env.NODE_ENV === 'production' ? null : 'dev_refresh_secret_change_me');
    if (!secret) throw new Error('JWT_REFRESH_SECRET is not set');
    payload = jwt.verify(refreshToken, secret);
  } catch {
    throw new ApiError(401, 'Invalid refresh token');
  }
  const user = await User.findById(payload.sub).select('+refreshTokens');
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    throw new ApiError(401, 'Refresh token revoked');
  }
  const accessToken = signAccess(user);
  ok(res, { accessToken }, 'Refreshed');
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body || {};
  if (refreshToken && req.user) {
    await User.updateOne({ _id: req.user._id }, { $pull: { refreshTokens: refreshToken } });
  }
  ok(res, null, 'Logged out');
});

export const me = asyncHandler(async (req, res) => {
  ok(res, req.user.toSafeJSON());
});

export const forgotPasswordSchema = z.object({ email: z.string().email() });

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();
    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}&email=${encodeURIComponent(
      email
    )}`;
    sendEmail({ to: email, ...emailTemplates.resetPassword(link) }).catch(() => {});
  }
  ok(res, null, 'If account exists, reset link sent');
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string().min(10),
  password: z.string().min(6),
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, password } = req.body;
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    email,
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+resetPasswordToken +resetPasswordExpires');
  if (!user) throw new ApiError(400, 'Invalid or expired token');
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  ok(res, null, 'Password updated');
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email }).select('+emailVerifyToken');
  if (!user || user.emailVerifyToken !== token) throw new ApiError(400, 'Invalid token');
  user.emailVerified = true;
  user.emailVerifyToken = undefined;
  await user.save();
  ok(res, null, 'Email verified');
});
