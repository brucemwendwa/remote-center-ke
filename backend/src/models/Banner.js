import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    image: String,
    link: String,
    position: { type: String, enum: ['hero', 'secondary', 'footer'], default: 'hero' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model('Banner', bannerSchema);
