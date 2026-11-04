import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';
import { CATEGORIES } from '@/domain/entities/Category';
import { articleService } from '@/di/container';

// Regenerate hourly so scheduled articles join the sitemap once published.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const slugs = await articleService().allSlugs();

  // Listing pages change when an article does, so they carry the newest
  // article date. A lastmod that is always "now" teaches Google to ignore it.
  const latest = new Date(
    slugs.reduce((max, s) => (s.updatedAt > max ? s.updatedAt : max), '1970-01-01T00:00:00Z'),
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: latest, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/world-cup`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/world-cup/results`, lastModified: latest, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/world-cup/standings`, lastModified: latest, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/world-cup/bracket`, lastModified: latest, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/world-cup/news`, lastModified: latest, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/about`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: latest,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = slugs.map((s) => ({
    url: `${base}/article/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
