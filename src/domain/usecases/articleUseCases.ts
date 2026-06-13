import type { ArticleRepository, ArticleQuery } from '../repositories/ArticleRepository';
import type { Article, ArticleSummary, CategorySlug } from '../entities/Article';

/**
 * Application use cases for editorial content. Each is a thin, named operation
 * expressing an intent of the app; they depend only on the repository
 * abstraction, keeping business rules out of the UI and the data layer.
 */
export class ArticleUseCases {
  constructor(private readonly repo: ArticleRepository) {}

  getByCategory(category: CategorySlug, limit?: number): Promise<ArticleSummary[]> {
    return this.repo.list({ category, limit });
  }

  getArticle(slug: string): Promise<Article | null> {
    return this.repo.getBySlug(slug);
  }

  /** Breaking news for the homepage banner — flagged items, newest first. */
  async getBreakingNews(limit = 5): Promise<ArticleSummary[]> {
    const all = await this.repo.list({});
    return all.filter((a) => a.isBreaking).slice(0, limit);
  }

  /** Trending — flagged trending plus most recent as a backfill. */
  async getTrending(limit = 6): Promise<ArticleSummary[]> {
    const all = await this.repo.list({});
    const trending = all.filter((a) => a.isTrending);
    const rest = all.filter((a) => !a.isTrending);
    return [...trending, ...rest].slice(0, limit);
  }

  getLatest(limit = 8): Promise<ArticleSummary[]> {
    return this.repo.list({ limit });
  }

  getSportsHighlights(limit = 4): Promise<ArticleSummary[]> {
    return this.repo.list({ category: 'sports', limit });
  }

  getFootballHighlights(limit = 4): Promise<ArticleSummary[]> {
    return this.repo.list({ category: 'football', limit });
  }

  getWorldCupArticles(limit?: number): Promise<ArticleSummary[]> {
    return this.repo.list({ worldCupOnly: true, limit });
  }

  search(term: string, query?: ArticleQuery): Promise<ArticleSummary[]> {
    const trimmed = term.trim();
    if (!trimmed) return Promise.resolve([]);
    return this.repo.search(trimmed, query);
  }

  searchWorldCup(term: string): Promise<ArticleSummary[]> {
    return this.search(term, { worldCupOnly: true });
  }

  getRelated(article: Article, limit = 3): Promise<ArticleSummary[]> {
    return this.repo.related(article, limit);
  }

  allSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
    return this.repo.allSlugs();
  }

  list(query?: ArticleQuery): Promise<ArticleSummary[]> {
    return this.repo.list(query);
  }
}
