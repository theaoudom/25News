import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';
import { CATEGORIES } from '@/domain/entities/Category';
import { articleService } from '@/di/container';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${base}/world-cup`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/world-cup/fixtures`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/world-cup/results`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/world-cup/standings`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/world-cup/live`, lastModified: now, changeFrequency: 'always', priority: 0.7 },
    { url: `${base}/world-cup/news`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const slugs = await articleService().allSlugs();
  const articlePages: MetadataRoute.Sitemap = slugs.map((s) => ({
    url: `${base}/article/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
