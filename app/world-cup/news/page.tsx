import type { Metadata } from 'next';
import { articleService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { SearchBar } from '@/presentation/components/SearchBar';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const q = (searchParams.q || '').trim();
  return buildMetadata({
    title: q ? `World Cup news: “${q}”` : 'World Cup 2026 News',
    description:
      'The latest FIFA World Cup 2026 news, analysis, previews and reaction from the 26News football desk.',
    path: '/world-cup/news',
    noIndex: Boolean(q), // don't index arbitrary search queries
  });
}

export default async function WorldCupNewsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const service = articleService();
  const query = (searchParams.q || '').trim();
  const articles = query
    ? await service.searchWorldCup(query)
    : await service.getWorldCupArticles();

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">World Cup News</h2>
      <div className="mt-4 max-w-xl">
        <SearchBar basePath="/world-cup/news" initialValue={query} placeholder="Search World Cup news…" />
      </div>

      {query && (
        <p className="mt-4 text-sm text-muted">
          {articles.length} result{articles.length === 1 ? '' : 's'} for “{query}”
        </p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="mt-8 text-muted">No World Cup stories found{query ? ' for that search' : ''}.</p>
      )}

      <AdSlot label="Advertisement" />
    </div>
  );
}
