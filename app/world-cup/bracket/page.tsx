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
    </div>
  );
}
