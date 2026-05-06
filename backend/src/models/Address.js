// Address records can also live as embedded subdocs on User.
// Standalone Address collection is provided for flexibility.
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
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
  { timestamps: true }
);
export default mongoose.model('Address', addressSchema);
