import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { validateEnv } from '@/config/env';

/**
 * REST controller seeding default admin credentials.
 * Utilizes pre-save Mongoose hashing automatically.
 */
export const POST = asyncHandler(async () => {
  // 1. Validate environment configuration variables
  const validatedEnv = validateEnv();

  await dbConnect();

  // 2. Prevent duplication: throw operational AppError if admin document already exists
  const existingAdminCount = await Admin.countDocuments();
  if (existingAdminCount > 0) {
    throw new AppError(
      'Database seeding blocked. Admin account already exists.',
      HTTP_STATUS.FORBIDDEN
    );
  }

  const username = validatedEnv.ADMIN_USERNAME;
  const email = validatedEnv.ADMIN_EMAIL;
  const rawPassword = validatedEnv.ADMIN_PASSWORD;

  // 3. Save admin record (Pre-save hook in Admin.ts hashes the password)
  const newAdmin = await Admin.create({
    name: 'System Administrator',
    username,
    email,
    password: rawPassword,
    role: 'superadmin',
    isActive: true,
  });

  // 4. Return standardized success response
  return sendSuccess(
    {
      id: newAdmin._id,
      name: newAdmin.name,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
    },
    'Superadmin account successfully seeded!',
    HTTP_STATUS.CREATED
  );
});
