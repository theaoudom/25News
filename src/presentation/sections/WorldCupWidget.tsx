import Link from 'next/link';
import type { Fixture } from '@/domain/entities/Football';
import { FixtureCard } from '@/presentation/components/football/FixtureCard';
import { SectionHeading } from '@/presentation/components/SectionHeading';

/** Homepage World Cup highlight: live + next fixtures with a deep link. */
export function WorldCupWidget({
  live,
  upcoming,
  isFallback,
}: {
  live: Fixture[];
  upcoming: Fixture[];
  isFallback: boolean;
}) {
  const featured = [...live, ...upcoming].slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-brand-600/10 to-transparent p-5 sm:p-7">
      <SectionHeading title="🏆 FIFA World Cup 2026" href="/world-cup" accent />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((f) => (
          <FixtureCard key={f.id} fixture={f} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
        <Link href="/world-cup/results" className="text-brand-600 hover:underline">
          Results
        </Link>
        <Link href="/world-cup/standings" className="text-brand-600 hover:underline">
          Standings
        </Link>
        <Link href="/world-cup/bracket" className="text-brand-600 hover:underline">
          Bracket
        </Link>
        <Link href="/world-cup/news" className="text-brand-600 hover:underline">
          Analysis
        </Link>
      </div>
      {isFallback && (
        <p className="mt-3 text-xs text-muted">
          Live match data is temporarily unavailable from our providers. We show results only when
          we can verify them from a live source.
        </p>
      )}
    </section>
  );
}
