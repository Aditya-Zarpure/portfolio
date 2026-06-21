import { handleApiError } from './errorHandler';

type NextRouteHandler = (request: Request, context: any) => Promise<Response> | Response;

/**
 * Higher-order controller wrapper that eliminates repetitive try-catch blocks
 * in Next.js App Router API endpoints by passing errors to the global parser.
 */
export function asyncHandler(handler: NextRouteHandler) {
  return async (request: Request, context: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
