import type { Metadata } from 'next';
import { articleService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { Breadcrumbs } from '@/presentation/components/Breadcrumbs';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { SearchBar } from '@/presentation/components/SearchBar';

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  description: 'Search 26News for the latest World, Sports, Football, World Cup and Esports stories.',
  path: '/search',
  // Search results pages should not be indexed.
  noIndex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = (searchParams.q || '').trim();
  const results = query ? await articleService().search(query) : [];

  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Search', path: '/search' }]} />
      <div className="container-page max-w-4xl py-4">
        <h1 className="font-display text-3xl font-bold">Search</h1>
        <div className="mt-4 max-w-xl">
          <SearchBar initialValue={query} autoFocus placeholder="Search all news…" />
        </div>

        {query && (
          <p className="mt-6 text-sm text-muted">
            {results.length} result{results.length === 1 ? '' : 's'} for{' '}
            <span className="font-semibold text-[var(--fg)]">“{query}”</span>
          </p>
        )}

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>

        {query && results.length === 0 && (
          <p className="mt-8 text-muted">
            No stories matched your search. Try different keywords or browse a section.
          </p>
        )}
      </div>
    </>
  );
}
