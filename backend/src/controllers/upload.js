import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';
import { cloudinary, cloudinaryEnabled } from '../config/cloudinary.js';

function uploadBuffer(buffer, folder = 'remote-center-ke') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');
  if (!cloudinaryEnabled) throw new ApiError(503, 'Image upload not configured');
  const result = await uploadBuffer(req.file.buffer);
  ok(res, { url: result.secure_url, publicId: result.public_id }, 'Uploaded');
});
