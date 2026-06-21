import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { contactMessageSchema } from '@/utils/validators';

/**
 * POST handler: Submit inbound contact inquiry messages.
 * Open public-facing route.
 * Performs database connection, input schema validation, and storage.
 */
export const POST = asyncHandler(async (request: Request) => {
  await dbConnect();

  // 1. Parse JSON body safely
  let body;
  try {
    body = await request.json();
  } catch {
    throw new AppError('Request payload must be a valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }

  // 2. Validate payload matching requirements via Zod schema
  const validation = contactMessageSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      'Validation failure: Invalid request fields.',
      HTTP_STATUS.BAD_REQUEST,
      validation.error.format()
    );
  }

  const { name, email, subject, message } = validation.data;

  // 3. Create contact entry inside database
  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
    status: 'pending',
    isRead: false,
  });

  return sendSuccess(
    {
      id: contact._id.toString(),
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      createdAt: contact.createdAt,
    },
    'Your inquiry has been successfully transmitted. Our engineering desk will connect with you shortly.',
    HTTP_STATUS.CREATED
  );
});
