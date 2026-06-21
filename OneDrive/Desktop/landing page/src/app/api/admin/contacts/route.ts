import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { HTTP_STATUS } from '@/constants';

/**
 * GET handler: Fetch all inbound contact inquires.
 * Protected by administrative session middleware wrapper.
 */
export const GET = asyncHandler(async () => {
  return sendSuccess(
    [],
    'Administrative contact message fetch placeholder (Authorization verified).',
    HTTP_STATUS.OK
  );
});

/**
 * PUT handler: Update message status (e.g. read, pending, resolved).
 * Protected by administrative session middleware wrapper.
 */
export const PUT = asyncHandler(async () => {
  return sendSuccess(
    {},
    'Administrative contact message status update placeholder (Authorization verified).',
    HTTP_STATUS.OK
  );
});
