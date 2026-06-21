import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { validateEnv } from '@/config/env';

/**
 * Controller terminating the admin session.
 */
export const POST = asyncHandler(async () => {
  const validatedEnv = validateEnv();

  const response = sendSuccess(null, 'Successfully logged out!');

  // Instantly wipe admin session cookie
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: validatedEnv.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
});
