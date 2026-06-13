import { NextResponse } from 'next/server';
import { apiFootballClient, isFootballApiConfigured } from '@/data/sources/football/apiFootballClient';

/**
 * Diagnostic endpoint to confirm the football API key is wired up correctly.
 * Reports whether a key is configured and whether a live call succeeds —
 * WITHOUT ever exposing the key itself. Safe to hit from a browser.
 *
 *   GET /api/world-cup/status
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = isFootballApiConfigured();

  if (!configured) {
    return NextResponse.json({
      configured: false,
      mode: 'fallback',
      message: 'FOOTBALL_API_KEY is not set — the site is serving bundled sample data.',
      host: process.env.FOOTBALL_API_HOST || 'v3.football.api-sports.io',
      league: Number(process.env.FOOTBALL_WORLDCUP_LEAGUE_ID || '1'),
      season: Number(process.env.FOOTBALL_WORLDCUP_SEASON || '2026'),
    });
  }

  try {
    const fixtures = await apiFootballClient.getFixtures();
    return NextResponse.json({
      configured: true,
      mode: fixtures.length > 0 ? 'live' : 'fallback',
      liveFixtureCount: fixtures.length,
      message:
        fixtures.length > 0
          ? 'Live data is working.'
          : 'Key works but the upstream returned 0 fixtures for this league/season — check FOOTBALL_WORLDCUP_LEAGUE_ID / FOOTBALL_WORLDCUP_SEASON, or your plan may not cover this season.',
      host: process.env.FOOTBALL_API_HOST || 'v3.football.api-sports.io',
      league: Number(process.env.FOOTBALL_WORLDCUP_LEAGUE_ID || '1'),
      season: Number(process.env.FOOTBALL_WORLDCUP_SEASON || '2026'),
    });
  } catch (err) {
    return NextResponse.json(
      {
        configured: true,
        mode: 'fallback',
        error: (err as Error).message,
        message:
          'Key is set but the live call failed (see error). Common causes: wrong FOOTBALL_API_HOST for your key type, exceeded daily quota, or invalid key.',
      },
      { status: 200 },
    );
  }
}
