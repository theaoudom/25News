import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { FixtureCard } from '@/presentation/components/football/FixtureCard';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'World Cup 2026 Results',
  description:
    'Latest FIFA World Cup 2026 results and final scores from every completed match.',
  path: '/world-cup/results',
});

export default async function ResultsPage() {
  const results = await footballService().getRecentResults();

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">Results</h2>
      <p className="mt-1 text-muted">Completed matches, most recent first.</p>

      {results.length === 0 ? (
        <p className="mt-6 text-muted">No completed matches yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((f) => (
            <FixtureCard key={f.id} fixture={f} />
          ))}
        </div>
      )}

      <AdSlot label="Advertisement" />
    </div>
  );
}
