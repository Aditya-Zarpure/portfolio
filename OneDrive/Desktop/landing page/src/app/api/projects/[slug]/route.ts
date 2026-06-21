import { ProjectService } from '@/services/projectService';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { projectUpdateSchema } from '@/utils/validators';

/**
 * GET: Fetch dynamic project detailed properties using awaited URL slug.
 */
export const GET = asyncHandler(async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = await ProjectService.getProjectBySlug(slug);
  return sendSuccess(project, 'Portfolio project successfully fetched!', HTTP_STATUS.OK);
});

/**
 * PUT: Mutates details of a dynamic showcase project.
 * Protected administrative action.
 */
export const PUT = asyncHandler(async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    throw new AppError('Request payload must be a valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }

  // Validate dynamic partial payload properties
  const validation = projectUpdateSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      'Validation failed: Invalid project updates.',
      HTTP_STATUS.BAD_REQUEST,
      validation.error.format()
    );
  }

  const updated = await ProjectService.updateProject(slug, validation.data);
  return sendSuccess(updated, 'Portfolio project successfully updated!', HTTP_STATUS.OK);
});

/**
 * DELETE: Remove dynamic project document.
 * Protected administrative action.
 */
export const DELETE = asyncHandler(async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const deleted = await ProjectService.deleteProject(slug);
  return sendSuccess(deleted, 'Portfolio project successfully deleted!', HTTP_STATUS.OK);
});
