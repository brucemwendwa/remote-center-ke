import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema(
  {
    label: String,
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: { type: String, default: 'Nairobi' },
    area: String,
    country: { type: String, default: 'Kenya' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true, timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['customer', 'staff', 'admin'], default: 'customer' },
    emailVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
    refreshTokens: { type: [String], default: [], select: false },
    addresses: [addressSchema],
    avatar: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.toSafeJSON = function () {
  const o = this.toObject();
  delete o.password;
  delete o.refreshTokens;
  delete o.emailVerifyToken;
  delete o.resetPasswordToken;
  delete o.resetPasswordExpires;
  return o;
};

export default mongoose.model('User', userSchema);
