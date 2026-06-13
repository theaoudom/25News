import { NextResponse } from 'next/server';
import { footballService } from '@/di/container';

/**
 * Diagnostic endpoint: reports which football data provider is currently
 * serving World Cup data and how much it returned. Useful for confirming the
 * TheSportsDB → openfootball → fallback chain after a deploy.
 *
 *   GET /api/world-cup/status
 */
export const dynamic = 'force-dynamic';

const LABELS: Record<string, string> = {
  thesportsdb: 'Live data from TheSportsDB (free, covers 2026).',
  openfootball: 'Live data from openfootball/worldcup.json (no key needed).',
  'api-football': 'Live data from API-Football.',
  fallback: 'No live source returned data — serving the bundled sample dataset.',
};

export async function GET() {
  try {
    const snap = await footballService().getSnapshot();
    return NextResponse.json({
      source: snap.source,
      mode: snap.isFallback ? 'fallback' : 'live',
      competition: snap.competition,
      season: snap.season,
      fixtureCount: snap.fixtures.length,
      finishedCount: snap.fixtures.filter((f) => f.status === 'finished').length,
      liveCount: snap.fixtures.filter((f) => f.status === 'live').length,
      groupCount: snap.groups.length,
      message: LABELS[snap.source] || '',
      generatedAt: snap.generatedAt,
      thesportsdbKeyConfigured: Boolean(process.env.THESPORTSDB_KEY),
    });
  } catch (err) {
    return NextResponse.json({ mode: 'error', error: (err as Error).message }, { status: 200 });
  }
}
