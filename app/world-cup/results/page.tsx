import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { SectionHeading } from '@/presentation/components/SectionHeading';
import { FixtureCard } from '@/presentation/components/football/FixtureCard';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'World Cup 2026 Results — Every Final Score',
  description:
    'Final scores from every completed match at the FIFA World Cup 2026, with an explanation of how the 104-match schedule was structured and how knockout ties were decided.',
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
          <p className="text-muted">
            Result data is currently unavailable from our providers. We publish scores only when we
            can verify them from a live source, so nothing is listed here rather than an estimate.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((f) => (
              <FixtureCard key={f.id} fixture={f} />
            ))}
          </div>
        )}
      </section>

      <AdSlot label="Advertisement" />

      <div className="article-body mt-10 max-w-3xl">
        <h2>How the 104-Match Schedule Was Built</h2>
        <p>
          The 2026 tournament was the largest in the competition's history, and the match count tells
          the story: 104 games, against 64 in every edition from 1998 to 2022. The group stage
          accounted for 72 of them — twelve groups of four, each side playing three matches — with
          the remaining 32 spread across five knockout rounds and the third-place play-off.
        </p>
        <p>
          That expansion changed the shape of a deep run. A team reaching the final played{' '}
          <strong>eight matches</strong> rather than seven, because the round of 32 added a knockout
          round that did not previously exist. Across a tournament staged in high summer over three
          countries and multiple time zones, that extra fixture — and the travel attached to it —
          made squad depth and rotation a more decisive factor than in any previous World Cup.
        </p>

        <h2>How Knockout Ties Were Decided</h2>
        <p>
          Group matches could end level and often did. From the round of 32 onwards, a winner was
          required on the day. A tie level after 90 minutes went to{' '}
          <strong>30 minutes of extra time</strong>, played in two halves of 15, and if the scores
          were still level, to a <strong>penalty shootout</strong>.
        </p>
        <p>
          Scores on this page are shown as they finished. Where a match went beyond normal time, the
          result is marked <strong>AET</strong> (after extra time) or <strong>PSO</strong> (penalty
          shootout) — a distinction worth keeping, because a shootout is recorded as a draw in most
          statistical records even though it eliminated one of the two teams.
        </p>

        <h2>Where the Data Comes From</h2>
        <p>
          Results are drawn from open football data providers, principally the openfootball project,
          with TheSportsDB as a secondary source. Where the two disagree on a scoreline we take the
          one that can be corroborated; where neither is reachable, the page says the data is
          unavailable rather than displaying a placeholder.
        </p>
      </div>
    </div>
  );
}
