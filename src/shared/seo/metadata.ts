import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // canonical path beginning with "/"
  images?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}

const abs = (path: string): string =>
  path.startsWith('http') ? path : `${siteConfig.url}${path.startsWith('/') ? '' : '/'}${path}`;

/**
 * Builds a complete Next.js Metadata object — canonical URL, Open Graph and
 * Twitter cards — from a small input. Used by every page for consistent SEO.
 */
export function buildMetadata(input: PageMetaInput): Metadata {
  const canonical = abs(input.path);
  const images = (input.images?.length ? input.images : [siteConfig.defaultOgImage]).map(abs);
  const title = input.title.includes(siteConfig.name)
    ? input.title
    : `${input.title} | ${siteConfig.name}`;

  return {
    title,
    description: input.description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      title,
      description: input.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: input.type || 'website',
      images: images.map((url) => ({ url })),
      ...(input.type === 'article'
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
            tags: input.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: input.description,
      site: siteConfig.twitterHandle,
      images,
    },
  };
}
