/**
 * Domain entities for editorial content. These are framework-agnostic types
 * that represent the core business objects. Data sources map their raw shapes
 * into these; the presentation layer only ever sees these.
 */

export type CategorySlug = 'world' | 'sports' | 'football' | 'esports';

export interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  /** Optional credentials reinforcing E-E-A-T signals. */
  role?: string;
}

export interface Article {
  /** Stable unique id (carried over from legacy data). */
  id: string;
  /** SEO-friendly url segment, unique across the site. */
  slug: string;
  title: string;
  /** Short plain-text summary used for cards, meta description, OG. */
  summary: string;
  /** Primary category for navigation/breadcrumbs. */
  category: CategorySlug;
  /** Human-readable label shown on cards (e.g. "FOOTBALL", "Formula 1"). */
  categoryLabel: string;
  /** Sanitised HTML body. */
  body: string;
  /** Optional inline image + secondary body block (legacy "subimage1"/"body2"). */
  secondaryImageUrl?: string;
  secondaryBody?: string;
  imageUrl: string;
  imageAlt?: string;
  author: Author;
  /** ISO 8601 publish date. */
  publishedAt: string;
  /** ISO 8601 last-updated date (defaults to publishedAt). */
  updatedAt: string;
  readTimeMinutes: number;
  tags: string[];
  /** Flags for homepage curation. */
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  /** Marks World Cup-specific editorial for the dedicated section. */
  isWorldCup?: boolean;
}

/** Lightweight projection for lists/cards (avoids shipping full bodies). */
export interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: CategorySlug;
  categoryLabel: string;
  imageUrl: string;
  imageAlt?: string;
  authorName: string;
  publishedAt: string;
  readTimeMinutes: number;
  isBreaking?: boolean;
  isTrending?: boolean;
}

export const toArticleSummary = (a: Article): ArticleSummary => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  summary: a.summary,
  category: a.category,
  categoryLabel: a.categoryLabel,
  imageUrl: a.imageUrl,
  imageAlt: a.imageAlt,
  authorName: a.author.name,
  publishedAt: a.publishedAt,
  readTimeMinutes: a.readTimeMinutes,
  isBreaking: a.isBreaking,
  isTrending: a.isTrending,
});
