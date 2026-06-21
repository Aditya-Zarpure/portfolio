import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { HTTP_STATUS } from '@/constants';

/**
 * GET handler: Fetch all client testimonials.
 * Open public-facing route.
 */
export const GET = asyncHandler(async () => {
  return sendSuccess(
    [],
    'Client testimonials fetch placeholder.',
    HTTP_STATUS.OK
  );
});

/**
 * POST handler: Create client testimonial.
 * Will require administrative authentication verification.
 */
export const POST = asyncHandler(async () => {
  return sendSuccess(
    {},
    'Client testimonial creation placeholder.',
    HTTP_STATUS.CREATED
  );
});
