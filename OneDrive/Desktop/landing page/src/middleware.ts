import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authenticateAdmin } from './middleware/auth';

export async function middleware(request: NextRequest) {
  // 1. Execute modular admin authentication interceptor
  const authResponse = await authenticateAdmin(request);
  if (authResponse) {
    return authResponse;
  }

  // 2. Extensibility hook: Additional middleware chains can be placed here (e.g. rate-limiters, logs)

  return NextResponse.next();
}

// Intercept only administrative dashboards and backend actions
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
