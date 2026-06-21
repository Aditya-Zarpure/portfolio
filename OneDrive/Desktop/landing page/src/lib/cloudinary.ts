import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/config/env';

// Initialize Cloudinary connection using validated environment variables
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a raw media file buffer to Cloudinary using streaming.
 * Production-ready: avoids disk writes, making it fully compatible with read-only serverless environments.
 */
export async function uploadImage(
  fileBuffer: Buffer,
  folder = 'portfolio'
): Promise<{ secure_url: string; public_id: string }> {
  
  // Graceful fallback for local development or mock settings
  if (
    env.CLOUDINARY_CLOUD_NAME === 'mock_cloud_name' ||
    !env.CLOUDINARY_API_KEY ||
    env.CLOUDINARY_API_KEY.startsWith('mock')
  ) {
    console.warn('⚠️ Cloudinary configured with mock settings. Returning baseline asset placeholder.');
    return {
      secure_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800',
      public_id: 'mock_portfolio_asset_id',
    };
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Cloudinary upload operation returned empty payload.'));
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    // Pipe the raw file buffer directly to Cloudinary upload streams
    uploadStream.end(fileBuffer);
  });
}

/**
 * Deletes a media asset from Cloudinary using its unique public ID.
 */
export async function deleteImage(publicId: string): Promise<any> {
  if (publicId === 'mock_portfolio_asset_id') {
    return { result: 'ok' };
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}
