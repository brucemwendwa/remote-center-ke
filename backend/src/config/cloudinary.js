import { v2 as cloudinary } from 'cloudinary';

let enabled = false;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  enabled = true;
} else {
  console.warn('[cloudinary] env not set — uploads disabled');
}

export { cloudinary, enabled as cloudinaryEnabled };
