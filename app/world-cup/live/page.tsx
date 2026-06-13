import type { Metadata } from 'next';
import { footballService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { LiveScores } from '@/presentation/components/football/LiveScores';
import { AdSlot } from '@/presentation/components/AdSlot';

// Always render fresh on the server for live data; the client then polls.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'World Cup 2026 Live Scores',
  description: 'Follow live FIFA World Cup 2026 scores, updated automatically as matches unfold.',
  path: '/world-cup/live',
});

export default async function LivePage() {
  const live = await footballService().getLiveScores();

  return (
    <div className="container-page py-8">
      <h2 className="font-display text-2xl font-bold">Live Scores</h2>
      <p className="mt-1 text-muted">Scores refresh automatically while matches are in play.</p>

      <div className="mt-6">
        <LiveScores initial={live} />
      </div>

      <AdSlot label="Advertisement" />
    </div>
  );
}
