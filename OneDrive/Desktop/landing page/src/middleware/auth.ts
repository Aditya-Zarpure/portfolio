import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

/**
 * Modular administrator authentication interceptor.
 * Inspects HTTP request context and validates secure cookies on Next.js Edge.
 */
export async function authenticateAdmin(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_session')?.value;

  // Validate the Edge-compatible Jose JWT payload
  const adminPayload = token ? await verifyJWT(token) : null;

  // Handle panel redirects
  if (pathname.startsWith('/admin')) {
    if (!adminPayload) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle protected administrative API endpoints
  if (pathname.startsWith('/api/admin')) {
    if (!adminPayload) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access Denied: Administrative session required.',
          statusCode: 401,
          details: null,
        },
        { status: 401 }
      );
    }
  }

  // Authentication passed successfully
  return null;
}
