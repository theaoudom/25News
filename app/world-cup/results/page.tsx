import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { SectionHeading } from '@/presentation/components/SectionHeading';
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
  const football = footballService();
  const [pending, results] = await Promise.all([
    football.getPendingResults(),
    football.getRecentResults(),
  ]);

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">Results</h2>
      <p className="mt-1 text-muted">Completed matches, most recent first.</p>

      {pending.length > 0 && (
        <section className="mt-6">
          <SectionHeading title="Awaiting final score" accent />
          <p className="-mt-3 mb-4 text-sm text-muted">
            These matches have kicked off; the final score will appear as soon as it’s confirmed.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((f) => (
              <FixtureCard key={f.id} fixture={f} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        {pending.length > 0 && <SectionHeading title="Final results" accent />}
        {results.length === 0 ? (
          <p className="text-muted">No completed matches yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((f) => (
              <FixtureCard key={f.id} fixture={f} />
            ))}
          </div>
        )}
      </section>

      <AdSlot label="Advertisement" />
    </div>
  );
}
