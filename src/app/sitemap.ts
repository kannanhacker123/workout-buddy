// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllWorkoutIds } from '@/lib/workouts';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://workout-buddy-gray.vercel.app/sitemap.xml';

  const staticPaths = [
    '/',
    '/goals',
    '/dashboard',
    '/workout-and-nutrition-information',
    '/workout-buddy',
    '/settings',
    '/files',
    '/forbidden',
  ];

  // Fetch all IDs from our JSON file
  const workoutIds = await getAllWorkoutIds();

  return [
    ...staticPaths.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })),
    ...workoutIds.map((id) => ({ url: `${baseUrl}/workouts/${id}`, lastModified: new Date() })),
  ];
}
