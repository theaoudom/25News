import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { KnockoutBracket } from '@/presentation/components/football/KnockoutBracket';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 Knockout Bracket — Scores & Results',
  description:
    'Follow the FIFA World Cup 2026 knockout bracket: Round of 32, Round of 16, quarter-finals, semi-finals, and the final in USA, Canada & Mexico.',
  path: '/world-cup/bracket',
});

export default async function BracketPage() {
  const rounds = await footballService().getKnockoutFixtures();

  return (
    <div className="container-page py-8">
      <h1 className="mb-1 text-3xl font-display font-bold tracking-wide">
        Knockout Bracket
      </h1>
      <p className="mb-8 text-muted">FIFA World Cup 2026 · USA, Canada &amp; Mexico</p>

      <KnockoutBracket rounds={rounds} />

      <AdSlot label="Advertisement" />

      <div className="article-body mt-10 max-w-3xl">
        <h2>How the Round of 32 Changed the Bracket</h2>
        <p>
          For seven tournaments the World Cup knockout stage began with a round of 16, and the path
          to the final was four matches long. The 48-team format added a round in front of it. The
          bracket above therefore runs to five rounds — round of 32, round of 16, quarter-finals,
          semi-finals and the final — and a champion had to win five knockout ties rather than four.
        </p>
        <p>
          The extra round did more than lengthen the tournament. It gave the twelve group winners a
          measurable reward, because the bracket was drawn so that winners were paired against
          runners-up and qualifying third-placed teams wherever possible. Topping a group was worth
          real protection in the first knockout match — the clearest incentive the format offers
          against coasting through the final group game.
        </p>

        <h2>Reading the Bracket</h2>
        <p>
          Ties are shown in bracket order, with each winner advancing along the connecting line to
          the round on its right. A result marked <strong>AET</strong> was settled in extra time;{' '}
          <strong>PSO</strong> indicates a penalty shootout, with the shootout score shown alongside
          the 120-minute scoreline.
        </p>
        <p>
          Fixtures that had not yet been played show the qualification code from the group stage
          rather than a team name — <strong>W</strong> codes denote the winner of an earlier tie, so
          a match listed as <em>W73 v W74</em> is waiting on the outcome of ties 73 and 74. Once
          those results are confirmed by our data providers, the names resolve automatically.
        </p>

        <h2>Why Bracket Position Mattered So Much</h2>
        <p>
          A knockout bracket is fixed in advance, which means a team's route is largely determined
          before the first ball of the knockout stage is kicked. Two of the pre-tournament favourites
          drawn into the same half can only meet in a semi-final, while the opposite half may open up
          for a side that would not have survived the other. That asymmetry is not a flaw so much as
          an inherent property of a bracket, and it is why group-stage results that look
          inconsequential at the time — a goal difference here, a second place instead of a first —
          often turn out to have shaped the closing stages of the tournament.
        </p>
      </div>
    </div>
  );
}
