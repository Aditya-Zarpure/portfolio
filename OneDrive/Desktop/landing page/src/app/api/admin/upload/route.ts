import { uploadImage } from '@/lib/cloudinary';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';

/**
 * POST: Uploads a media asset file directly to Cloudinary.
 * Protected administrative route intercepted by middleware.
 */
export const POST = asyncHandler(async (request: Request) => {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    throw new AppError('Request payload must be a multipart form.', HTTP_STATUS.BAD_REQUEST);
  }

  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'portfolio';

  if (!file) {
    throw new AppError('Validation failed: No file found in multipart upload.', HTTP_STATUS.BAD_REQUEST);
  }

  // Convert File payload into ArrayBuffer -> Node Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload buffer stream directly to Cloudinary
  const result = await uploadImage(buffer, folder);

  return sendSuccess(
    result,
    'Media asset successfully uploaded to Cloudinary!',
    HTTP_STATUS.CREATED
  );
});
