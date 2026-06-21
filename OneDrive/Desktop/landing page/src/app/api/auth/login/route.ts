import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { adminLoginSchema } from '@/utils/validators';
import { signJWT } from '@/lib/jwt';
import { validateEnv } from '@/config/env';

/**
 * Controller authenticating administrators.
 * Delegates password comparisons to custom Mongoose instance methods.
 */
export const POST = asyncHandler(async (request: Request) => {
  // Validate system environment variables
  const validatedEnv = validateEnv();

  await dbConnect();

  // 1. Parse JSON body safely
  let body;
  try {
    body = await request.json();
  } catch {
    throw new AppError('Request payload must be a valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }

  // 2. Validate payload matching requirements via Zod schema
  const validation = adminLoginSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      'Validation failure: Invalid request fields.',
      HTTP_STATUS.BAD_REQUEST,
      validation.error.format()
    );
  }

  const { emailOrUsername, password } = validation.data;

  // 3. Look up administrator
  const admin = await Admin.findOne({
    $or: [
      { email: emailOrUsername.toLowerCase().trim() },
      { username: emailOrUsername.trim() }
    ]
  });

  if (!admin || !admin.isActive) {
    throw new AppError('Invalid credentials provided.', HTTP_STATUS.UNAUTHORIZED);
  }

  // 4. Validate encrypted password using Admin schema instance method
  const isPasswordValid = await admin.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials provided.', HTTP_STATUS.UNAUTHORIZED);
  }

  // 5. Update last login timestamp
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false }); // Skip validation/pre-save password re-hashing hook bypass

  // 6. Sign the Edge-compatible session JWT
  const token = await signJWT({
    id: admin._id.toString(),
    username: admin.username,
    email: admin.email,
    role: admin.role,
  });

  // 7. Formulate success response and hook secure cookie
  const response = sendSuccess(
    {
      name: admin.name,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      avatar: admin.avatar,
    },
    'Successfully authenticated admin session!'
  );

  const isProduction = validatedEnv.NODE_ENV === 'production';
  
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7-day session
  });

  return response;
});
