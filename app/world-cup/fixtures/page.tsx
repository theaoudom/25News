import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { FixtureCard } from '@/presentation/components/football/FixtureCard';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'World Cup 2026 Fixtures & Schedule',
  description:
    'Full FIFA World Cup 2026 match schedule — upcoming fixtures, kickoff times and venues across the USA, Canada and Mexico.',
  path: '/world-cup/fixtures',
});

export default async function FixturesPage() {
  const fixtures = await footballService().getUpcomingFixtures();

  // Group fixtures by calendar day for a readable schedule.
  const byDay = new Map<string, typeof fixtures>();
  for (const f of fixtures) {
    const day = new Date(f.kickoff).toISOString().slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day)!.push(f);
  }

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">Match Schedule</h2>
      <p className="mt-1 text-muted">Upcoming fixtures, soonest first.</p>

      {byDay.size === 0 ? (
        <p className="mt-6 text-muted">No upcoming fixtures scheduled right now.</p>
      ) : (
        Array.from(byDay.entries()).map(([day, list]) => (
          <section key={day} className="mt-8">
            <h3 className="mb-3 border-b border-[var(--border)] pb-2 font-semibold">
              {new Date(day).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((f) => (
                <FixtureCard key={f.id} fixture={f} />
              ))}
            </div>
          </section>
        ))
      )}

      <AdSlot label="Advertisement" />
    </div>
  );
}
