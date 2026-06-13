import type { ArticleRepository } from '@/domain/repositories/ArticleRepository';
import type { FootballRepository } from '@/domain/repositories/FootballRepository';
import { LocalArticleRepository } from '@/data/repositories/LocalArticleRepository';
import { ApiFootballRepository } from '@/data/repositories/ApiFootballRepository';
import { ArticleUseCases } from '@/domain/usecases/articleUseCases';
import { FootballUseCases } from '@/domain/usecases/footballUseCases';

/**
 * Composition root. The single place where concrete implementations are bound
 * to abstractions. Use cases and pages depend only on these factory functions,
 * never on concrete classes — so the entire data layer can be swapped here.
 *
 * Instances are memoised per server process (cheap, stateless singletons).
 */
interface Container {
  articleRepository: ArticleRepository;
  footballRepository: FootballRepository;
  articleUseCases: ArticleUseCases;
  footballUseCases: FootballUseCases;
}

let container: Container | null = null;

function createContainer(): Container {
  const articleRepository = new LocalArticleRepository();
  const footballRepository = new ApiFootballRepository();
  return {
    articleRepository,
    footballRepository,
    articleUseCases: new ArticleUseCases(articleRepository),
    footballUseCases: new FootballUseCases(footballRepository),
  };
}

export function getContainer(): Container {
  if (!container) container = createContainer();
  return container;
}

/** Convenience accessors used throughout the presentation layer. */
export const articleService = (): ArticleUseCases => getContainer().articleUseCases;
export const footballService = (): FootballUseCases => getContainer().footballUseCases;
