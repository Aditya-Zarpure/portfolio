import { MetadataRoute } from 'next';

/**
 * Technical crawler boundaries configuration robots.txt for search engines.
 * Restricts access to sensitive administration screens and backend API controllers.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://studio-digital.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/admin/',
        '/api/auth/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
