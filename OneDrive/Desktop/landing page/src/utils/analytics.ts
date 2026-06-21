/**
 * Client-Side decoupling dynamic event analytics telemetry tracking client.
 * Securely forwards clicks, conversions, and pageviews to active tracking providers
 * (e.g. Google Analytics `window.gtag`) while safely bypassing errors if blocked.
 */

// Extend standard window schema to permit custom tracking callbacks
declare global {
  interface Window {
    gtag?: (
      type: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Send raw event payloads directly to active analytics providers.
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (!IS_PRODUCTION) {
    console.log(`[Analytics DEV-Logger] 📊 Event tracked: "${action}" | Category: "${category}" | Label: "${label ?? 'N/A'}" | Value: ${value ?? 'N/A'}`);
    return;
  }

  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (err) {
    console.warn('⚠️ Analytics telemetry report failed:', err);
  }
}

/**
 * Report dynamic Page Views
 */
export function trackPageView(url: string) {
  if (!IS_PRODUCTION) {
    console.log(`[Analytics DEV-Logger] 🗺️ PageView tracked: "${url}"`);
    return;
  }

  try {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (typeof window !== 'undefined' && window.gtag && gaId) {
      window.gtag('config', gaId, {
        page_path: url,
      });
    }
  } catch (err) {
    console.warn('⚠️ Analytics PageView registration failed:', err);
  }
}

/**
 * Semantic CTA click tracking
 */
export function trackCtaClick(ctaName: string) {
  trackEvent('cta_click', 'Engagement', ctaName);
}

/**
 * Semantic dynamic Project clicks
 */
export function trackProjectClick(projectSlug: string) {
  trackEvent('project_click', 'Portfolio', projectSlug);
}

/**
 * Contact Submission conversions
 */
export function trackContactSuccess(subject: string) {
  trackEvent('contact_success', 'Conversion', subject);
}

/**
 * Client form Zod validations incidents
 */
export function trackContactValidationError(fields: string[]) {
  trackEvent('contact_validation_error', 'Errors', fields.join(', '));
}
