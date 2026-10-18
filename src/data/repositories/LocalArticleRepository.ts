import type { Article, ArticleSummary } from '@/domain/entities/Article';
import { toArticleSummary } from '@/domain/entities/Article';
import type { ArticleQuery, ArticleRepository } from '@/domain/repositories/ArticleRepository';
import { LOCAL_ARTICLES } from '@/data/sources/local/articles';
import { stripHtml } from '@/shared/utils/text';

function isPublished(article: Article, now = Date.now()): boolean {
  return Date.parse(article.publishedAt) <= now;
}

/**
 * ArticleRepository backed by typed local data. All reads are in-memory and
 * synchronous under the hood but exposed as Promises to match the interface,
 * so swapping in a CMS-backed implementation later requires no call-site
 * changes.
 */
export class LocalArticleRepository implements ArticleRepository {
  private readonly articles: Article[];
  private readonly bySlug: Map<string, Article>;
  private readonly byId: Map<string, Article>;

  constructor(source: Article[] = LOCAL_ARTICLES) {
    // Newest first — the canonical ordering for every list view.
    this.articles = source
      .slice()
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    this.bySlug = new Map(this.articles.map((a) => [a.slug, a]));
    this.byId = new Map(this.articles.map((a) => [a.id, a]));
  }

  /**
   * Articles whose publish time has passed. Checked per call rather than in
   * the constructor so a scheduled (future-dated) article appears on the next
   * ISR revalidation after its publish time, without a redeploy.
   */
  private get published(): Article[] {
    const now = Date.now();
    return this.articles.filter((a) => isPublished(a, now));
  }

  private applyQuery(list: Article[], q?: ArticleQuery): Article[] {
    let result = list;
    if (q?.category) result = result.filter((a) => a.category === q.category);
    if (q?.worldCupOnly) result = result.filter((a) => a.isWorldCup);
    if (q?.tag) {
      const tag = q.tag.toLowerCase();
      result = result.filter((a) => a.tags.some((t) => t.toLowerCase() === tag));
    }
    if (q?.excludeIds?.length) {
      const excluded = new Set(q.excludeIds);
      result = result.filter((a) => !excluded.has(a.id));
    }
    const offset = q?.offset ?? 0;
    const end = typeof q?.limit === 'number' ? offset + q.limit : undefined;
    return result.slice(offset, end);
  }

  async list(query?: ArticleQuery): Promise<ArticleSummary[]> {
    return this.applyQuery(this.published, query).map(toArticleSummary);
  }

  async getBySlug(slug: string): Promise<Article | null> {
    const article = this.bySlug.get(slug);
    return article && isPublished(article) ? article : null;
  }

  async getById(id: string): Promise<Article | null> {
    const article = this.byId.get(id);
    return article && isPublished(article) ? article : null;
  }

  async search(term: string, query?: ArticleQuery): Promise<ArticleSummary[]> {
    const needle = term.toLowerCase();
    const scope = this.applyQuery(this.published, query);
    return scope
      .filter((a) => {
        const haystack = [
          a.title,
          a.summary,
          a.categoryLabel,
          a.tags.join(' '),
          stripHtml(a.body),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(needle);
      })
      .map(toArticleSummary);
  }

  async allSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
    return this.published.map((a) => ({ slug: a.slug, updatedAt: a.updatedAt }));
  }

  async related(article: Article, limit = 3): Promise<ArticleSummary[]> {
    const tagSet = new Set(article.tags.map((t) => t.toLowerCase()));
    const scored = this.published
      .filter((a) => a.id !== article.id)
      .map((a) => {
        let score = 0;
        if (a.category === article.category) score += 2;
        if (a.isWorldCup && article.isWorldCup) score += 2;
        score += a.tags.filter((t) => tagSet.has(t.toLowerCase())).length;
        return { a, score };
      })
      .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt));
    return scored.slice(0, limit).map((s) => toArticleSummary(s.a));
  }
}
