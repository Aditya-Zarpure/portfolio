import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';
import { verifyJWT } from '@/lib/jwt';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { cookies } from 'next/headers';

/**
 * GET: Resolves and verifies details of active administrator session.
 * Decrypts JWT cookies secure token and returns profile variables.
 */
export const GET = asyncHandler(async () => {
  await dbConnect();

  // Retrieve secure token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) {
    throw new AppError('Session verification failed: Missing auth token.', HTTP_STATUS.UNAUTHORIZED);
  }

  // Decrypt token
  const payload = await verifyJWT(token);
  if (!payload) {
    throw new AppError('Session verification failed: Invalid or expired token.', HTTP_STATUS.UNAUTHORIZED);
  }

  // Fetch admin document (omit password hash for security)
  const admin = await Admin.findById(payload.id).select('-password');
  if (!admin || !admin.isActive) {
    throw new AppError('Administrator session resolved but user is suspended or missing.', HTTP_STATUS.UNAUTHORIZED);
  }

  return sendSuccess(
    {
      id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      avatar: admin.avatar,
    },
    'Administrative session details resolved successfully!'
  );
});
