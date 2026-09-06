import type { Metadata } from 'next';
import Link from 'next/link';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { StandingsTable } from '@/presentation/components/football/StandingsTable';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'World Cup 2026 Group Tables — All 12 Groups Explained',
  description:
    'Final group standings from the FIFA World Cup 2026, plus how the 48-team format worked: why 12 groups of four produced a round of 32, and how the eight best third-placed teams qualified.',
  path: '/world-cup/standings',
});

export default async function StandingsPage() {
  const groups = await footballService().getStandings();

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">Group Standings</h2>
      <p className="mt-1 text-muted">
        Final tables from all 12 groups, and how teams progressed out of them.
      </p>

      {groups.length === 0 ? (
        <p className="mt-6 text-muted">
          Group data is currently unavailable from our providers. We publish tables only when we can
          verify them from a live source, so nothing is shown here rather than an estimate.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {groups.map((g) => (
            <StandingsTable key={g.group} group={g} />
          ))}
        </div>
      )}

      <AdSlot label="Advertisement" />

      <div className="article-body mt-10 max-w-3xl">
        <h2>How Qualification Out of the Groups Worked</h2>
        <p>
          The expansion to 48 teams forced a structural problem on FIFA. Twelve groups of four
          produce 24 group winners and runners-up — an awkward number, because a knockout bracket
          needs a power of two. The solution was a <strong>round of 32</strong>, filled by the 12
          group winners, the 12 runners-up, and the <strong>eight best third-placed teams</strong>{' '}
          across all twelve groups.
        </p>
        <p>
          That last mechanism is what made the final round of group matches so tense. A third-placed
          team was not eliminated, but nor was it safe: it was entered into a separate ranking
          against the eleven other third-placed sides, and only the top eight survived. Teams were
          therefore playing not just their own group rivals but an invisible table being decided in
          games elsewhere, sometimes days later.
        </p>

        <h2>Reading the Table</h2>
        <p>
          The columns follow standard FIFA convention. <strong>P</strong> is matches played,{' '}
          <strong>W</strong>, <strong>D</strong> and <strong>L</strong> are wins, draws and losses,{' '}
          <strong>GD</strong> is goal difference and <strong>PTS</strong> is points — three for a
          win, one for a draw, none for a defeat.
        </p>
        <p>
          Where teams finish level on points, the order is decided first on goal difference across
          the group, then on goals scored. If sides are still inseparable, the tie-break moves to the
          results between those specific teams — their head-to-head points, goal difference and goals
          scored — before fair-play conduct and, ultimately, a drawing of lots. This is why goal
          difference is worth watching even in an apparently settled group: it is the first thing
          that separates two teams on the same points, and a heavy defeat can undo three earlier
          results.
        </p>

        <h2>Why Third Place Was Worth Playing For</h2>
        <p>
          One consequence of the 48-team format is that finishing third became a genuine competitive
          target rather than a consolation. In a 32-team tournament, third in the group meant going
          home. Here, a third-placed team with a positive goal difference had a realistic route into
          the knockout stage, which changed how sides approached a final group game they could not
          win. It also reduced the incentive for the dead-rubber caution that used to characterise
          the last round of fixtures.
        </p>
        <p>
          For the full knockout picture, see the{' '}
          <Link href="/world-cup/bracket">World Cup 2026 bracket</Link>, or the{' '}
          <Link href="/world-cup/results">complete match results</Link>.
        </p>
      </div>
    </div>
  );
}
