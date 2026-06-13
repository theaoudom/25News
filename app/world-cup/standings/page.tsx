import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { StandingsTable } from '@/presentation/components/football/StandingsTable';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'World Cup 2026 Standings & Group Tables',
  description:
    'FIFA World Cup 2026 group standings — points, played, goal difference and form for every group.',
  path: '/world-cup/standings',
});

export default async function StandingsPage() {
  const groups = await footballService().getStandings();

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">Group Standings</h2>
      <p className="mt-1 text-muted">
        Top two of each group, plus the eight best third-placed teams, advance to the round of 32.
      </p>

      {groups.length === 0 ? (
        <p className="mt-6 text-muted">Standings will appear once the group stage begins.</p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {groups.map((g) => (
            <StandingsTable key={g.group} group={g} />
          ))}
        </div>
      )}

      <AdSlot label="Advertisement" />
    </div>
  );
}
