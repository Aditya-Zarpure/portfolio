import { ProjectService } from '@/services/projectService';
import { asyncHandler } from '@/utils/asyncHandler';
import { sendSuccess } from '@/utils/apiResponse';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS } from '@/constants';
import { projectCreateSchema } from '@/utils/validators';

/**
 * GET: Retrieves all projects, dynamically filtering based on search query properties.
 */
export const GET = asyncHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const publishedOnly = searchParams.get('publishedOnly');

  const filters: any = {};
  
  if (category) {
    filters.category = category;
  }
  if (featured === 'true') {
    filters.featured = true;
  }
  // Public users only see published items, while admins can review draft items in development
  if (publishedOnly === 'true') {
    filters.published = true;
  }

  const projects = await ProjectService.getAllProjects(filters);
  return sendSuccess(projects, 'Portfolio projects successfully fetched!', HTTP_STATUS.OK);
});

/**
 * POST: Create a new project.
 * Enforces Zod input formatting validation. Protected via administrative session check.
 */
export const POST = asyncHandler(async (request: Request) => {
  let body;
  try {
    body = await request.json();
  } catch {
    throw new AppError('Request payload must be a valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }

  // Sanitize incoming body via Zod validator schema
  const validation = projectCreateSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      'Validation failed: Invalid project inputs.',
      HTTP_STATUS.BAD_REQUEST,
      validation.error.format()
    );
  }

  const project = await ProjectService.createProject(validation.data);
  return sendSuccess(project, 'Portfolio project successfully created!', HTTP_STATUS.CREATED);
});
