import { MetadataRoute } from 'next';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

/**
 * Dynamic sitemap generator in Next.js App Router.
 * Queries Mongoose database on build or runtime to list dynamic portfolio targets dynamically.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://studio-digital.vercel.app';

  // Core baseline page routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Try querying dynamic database project catalogs
  try {
    await dbConnect();
    const projects = await Project.find({ published: true }).select('slug updatedAt');
    
    projects.forEach((proj) => {
      routes.push({
        url: `${baseUrl}/projects/${proj.slug}`,
        lastModified: proj.updatedAt ? new Date(proj.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('⚠️ Sitemap generation dynamic projects fetch failed. Returning baseline route map.', error);
  }

  return routes;
}
