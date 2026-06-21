import { ProjectService } from '@/services/projectService';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { z } from 'zod';

const reorderSchema = z.object({
  orderMap: z
    .array(
      z.object({
        id: z.string().min(1, 'Project ID is required.'),
        order: z.number().int('Showcase order index must be an integer.'),
      })
    )
    .min(1, 'Showcase map cannot be empty.'),
});

/**
 * POST: Bulk updates ordering index of showcase projects.
 * Protected administrative action protected via middleware.
 */
export const POST = asyncHandler(async (request: Request) => {
  let body;
  try {
    body = await request.json();
  } catch {
    throw new AppError('Request payload must be a valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }

  // Validate the incoming array payload
  const validation = reorderSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      'Validation failed: Invalid batch ordering data.',
      HTTP_STATUS.BAD_REQUEST,
      validation.error.format()
    );
  }

  // Execute high-speed bulk Mongoose writes
  await ProjectService.reorderProjects(validation.data.orderMap);

  return sendSuccess(null, 'Portfolio showcase items successfully reordered!', HTTP_STATUS.OK);
});
