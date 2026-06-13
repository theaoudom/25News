import type { Article, ArticleSummary, CategorySlug } from '../entities/Article';

export interface ArticleQuery {
  category?: CategorySlug;
  tag?: string;
  worldCupOnly?: boolean;
  limit?: number;
  offset?: number;
  excludeIds?: string[];
}

/**
 * Abstraction over editorial content storage. Implemented in the data layer
 * (currently typed local data; could be swapped for a CMS without touching
 * domain or presentation code).
 */
export interface ArticleRepository {
  list(query?: ArticleQuery): Promise<ArticleSummary[]>;
  getBySlug(slug: string): Promise<Article | null>;
  getById(id: string): Promise<Article | null>;
  search(term: string, query?: ArticleQuery): Promise<ArticleSummary[]>;
  /** All slugs — used for static generation and the sitemap. */
  allSlugs(): Promise<{ slug: string; updatedAt: string }[]>;
  related(article: Article, limit?: number): Promise<ArticleSummary[]>;
}
