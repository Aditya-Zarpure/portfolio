import { ProjectService } from '@/services/projectService';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { z } from 'zod';

const toggleSchema = z.object({
  field: z.enum(['published', 'featured']),
});

/**
 * PUT: Toggles status indicators (published / featured) of projects.
 * Protected administrative action protecting dynamic resources.
 */
export const PUT = asyncHandler(async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    throw new AppError('Request payload must be a valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }

  // Validate toggle criteria
  const validation = toggleSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      'Validation failed: Target field must be either published or featured.',
      HTTP_STATUS.BAD_REQUEST,
      validation.error.format()
    );
  }

  const { field } = validation.data;
  let updated;

  if (field === 'published') {
    updated = await ProjectService.toggleProjectPublish(slug);
  } else {
    updated = await ProjectService.toggleProjectFeatured(slug);
  }

  return sendSuccess(
    updated,
    `Portfolio project '${field}' status successfully inverted!`,
    HTTP_STATUS.OK
  );
});
