import type { Article } from '@/domain/entities/Article';
import { siteConfig } from '@/shared/config/site';
import { stripHtml, truncate } from '@/shared/utils/text';

const abs = (path: string): string =>
  path.startsWith('http') ? path : `${siteConfig.url}${path.startsWith('/') ? '' : '/'}${path}`;

/** Organization + WebSite schema for the site root (includes Sitelinks search). */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: abs(siteConfig.logo),
    foundingDate: String(siteConfig.foundingYear),
    sameAs: [`https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`],
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/** NewsArticle schema with author + publisher for E-E-A-T / rich results. */
export function articleJsonLd(article: Article, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: truncate(article.title, 110),
    description: article.summary,
    image: [abs(article.imageUrl)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: article.categoryLabel,
    keywords: article.tags.join(', '),
    wordCount: stripHtml(article.body).split(/\s+/).filter(Boolean).length,
    // The byline is an editorial desk, not an individual, so it is typed as an
    // Organization. Marking a masthead as a Person is inaccurate structured
    // data — if a real named journalist is added to authors.ts, branch on that
    // rather than mislabelling the desk.
    author: {
      '@type': 'Organization',
      name: article.author.name,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
      logo: { '@type': 'ImageObject', url: abs(siteConfig.logo) },
    },
    ...(article.sources.length
      ? {
          citation: article.sources.map((src) => ({
            '@type': 'CreativeWork',
            name: src.title,
            url: src.url,
            publisher: { '@type': 'Organization', name: src.publisher },
          })),
        }
      : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

// Note: SportsEvent structured data was intentionally removed. For a news site
// it triggered ongoing Search Console "missing field" suggestions (offers,
// endDate, image) that don't legitimately apply, with little rich-result
// benefit. NewsArticle / Breadcrumb / Organization structured data remain.
