import type { NextConfig } from "next";

/**
 * Hardened production-grade Next.js Configuration.
 * Enforces gzip asset compression, hides stack poweredBy headers,
 * and sets secure HTTP headers (HSTS, clickjacking prevention, MIME type locks).
 */
const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // swcMinify removed (no longer needed)
  images: { domains: [] },
  output: 'standalone',
  experimental: { scrollRestoration: true },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
