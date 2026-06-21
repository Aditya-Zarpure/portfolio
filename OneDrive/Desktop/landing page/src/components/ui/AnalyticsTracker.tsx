'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/utils/analytics';

/**
 * Route observer that reports URL changes to the analytics engine.
 */
function RouteObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    
    // Assemble the complete relative path to report
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Suspense-wrapped AnalyticsTracker client component.
 * Prevents client hydration de-optimizations in static site builds.
 */
export default function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <RouteObserver />
    </Suspense>
  );
}
