import type { Metadata } from 'next';

const DEFAULT_TITLE = 'Studio Digital | Hardened Fullstack Software Engineering & Design';
const DEFAULT_DESCRIPTION = 'We engineer robust SaaS platforms, administrative dashboards, hardened APIs, and responsive digital interfaces designed to endure production scale.';
const DEFAULT_KEYWORDS = [
  'Fullstack Developer',
  'Software Engineer',
  'SaaS Platform Architecture',
  'Next.js Development',
  'React Developer',
  'Mongoose MongoDB Databases',
  'Hardened API Security',
  'Web Performance Optimization',
  'GPU Motion Design',
  'Zero CLS Design',
];

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * getMetadata - Generates high-fidelity unified Metadata configurations for Next.js.
 * Standardizes Title structures, Open Graph schemas, and Twitter previews.
 */
export function getMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    path = '',
    keywords = DEFAULT_KEYWORDS,
    ogImage = '/og-image.png',
    noIndex = false,
  } = options;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://studio-digital.vercel.app';
  const canonicalUrl = `${baseUrl}${path}`;
  const absoluteTitle = title === DEFAULT_TITLE ? title : `${title} | Studio Digital`;

  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return {
    title: absoluteTitle,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: absoluteTitle,
      description,
      siteName: 'Studio Digital',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: absoluteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle,
      description,
      images: [ogImageUrl],
      creator: '@studio_digital',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: `${baseUrl}/manifest.json`,
  };
}

/**
 * Generates semantic JSON-LD structured schema script objects for search engine parsing.
 */
export function getJSONLDSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://studio-digital.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#professional-service`,
    'name': 'Studio Digital',
    'url': baseUrl,
    'logo': `${baseUrl}/apple-touch-icon.png`,
    'image': `${baseUrl}/og-image.png`,
    'description': DEFAULT_DESCRIPTION,
    'telephone': '',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Global',
      'addressCountry': 'Worldwide',
    },
    'sameAs': [
      'https://github.com/your-github',
      'https://linkedin.com/in/your-linkedin',
    ],
    'knowsAbout': [
      'Software Engineering',
      'SaaS Architectures',
      'Next.js Framework',
      'API Security Operations',
      'React Development',
      'Web Performance & Eases Optimization',
    ],
  };
}
