import type { FootballRepository } from '@/domain/repositories/FootballRepository';
import type { Fixture, FootballSource, GroupStanding, WorldCupSnapshot } from '@/domain/entities/Football';
import { theSportsDbClient } from '@/data/sources/football/theSportsDbClient';
import { openFootballClient } from '@/data/sources/football/openFootballClient';
import { FALLBACK_FIXTURES, FALLBACK_STANDINGS } from '@/data/sources/football/fallbackData';

const COMPETITION = 'FIFA World Cup';
const SEASON = Number(process.env.FOOTBALL_WORLDCUP_SEASON || '2026');

interface Sourced<T> {
  data: T;
  source: FootballSource;
}

/**
 * FootballRepository for the World Cup that prefers free providers which
 * actually carry 2026 data. openfootball is primary — it is key-free and has
 * the full 104-match schedule and all 12 groups. TheSportsDB is the backup
 * (richer data like badges, but its free test key returns only a sample), and
 * the bundled dataset is the final fallback. Each step degrades gracefully on
 * error or empty response, and the resolved source is surfaced to the UI.
 */
export class WorldCupFootballRepository implements FootballRepository {
  private async tryChain<T>(
    attempts: { source: FootballSource; run: () => Promise<T[]> }[],
    fallback: { source: FootballSource; data: T[] },
  ): Promise<Sourced<T[]>> {
    for (const attempt of attempts) {
      try {
        const data = await attempt.run();
        if (data.length > 0) return { data, source: attempt.source };
      } catch (err) {
        console.error(`[worldcup] ${attempt.source} failed:`, (err as Error).message);
      }
    }
    return fallback;
  }

  private async fetchFixtures(): Promise<Sourced<Fixture[]>> {
    const base = await this.tryChain<Fixture>(
      [
        { source: 'openfootball', run: () => openFootballClient.getFixtures() },
        { source: 'thesportsdb', run: () => theSportsDbClient.getFixtures() },
      ],
      { source: 'fallback', data: FALLBACK_FIXTURES },
    );
    // openfootball has the full schedule but can lag on scores. Overlay any
    // finished/live results from TheSportsDB so a completed match shows its
    // result as soon as EITHER source has it.
    if (base.source === 'openfootball') {
      try {
        const tsdb = await theSportsDbClient.getFixtures();
        base.data = this.overlayResults(base.data, tsdb);
      } catch {
        /* keep openfootball data as-is */
      }
    }
    return base;
  }

  private overlayResults(base: Fixture[], overlay: Fixture[]): Fixture[] {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const key = (f: Fixture) => `${norm(f.home.name)}|${norm(f.away.name)}`;
    const byKey = new Map<string, Fixture>();
    for (const f of overlay) {
      if (f.status === 'finished' || f.status === 'live') byKey.set(key(f), f);
    }
    return base.map((f) => {
      if (f.status === 'finished') return f; // already have a result
      const live = byKey.get(key(f));
      if (!live) return f;
      return {
        ...f,
        status: live.status,
        elapsed: live.elapsed,
        homeGoals: live.homeGoals,
        awayGoals: live.awayGoals,
      };
    });
  }

  private fetchStandings(): Promise<Sourced<GroupStanding[]>> {
    return this.tryChain<GroupStanding>(
      [
        { source: 'openfootball', run: () => openFootballClient.getStandings() },
        { source: 'thesportsdb', run: () => theSportsDbClient.getStandings() },
      ],
      { source: 'fallback', data: FALLBACK_STANDINGS },
    );
  }

  async getFixtures(): Promise<Fixture[]> {
    return (await this.fetchFixtures()).data;
  }

  async getResults(): Promise<Fixture[]> {
    return (await this.getFixtures()).filter((f) => f.status === 'finished');
  }

  async getLiveFixtures(): Promise<Fixture[]> {
    const fixtures = await this.getFixtures();
    const live = fixtures.filter((f) => f.status === 'live');
    // No live matches from the source? Mirror the fallback's live set only when
    // we are actually on fallback data, so a quiet matchday doesn't invent games.
    return live;
  }

  async getStandings(): Promise<GroupStanding[]> {
    return (await this.fetchStandings()).data;
  }

  async getWorldCupSnapshot(): Promise<WorldCupSnapshot> {
    const [fixtures, standings] = await Promise.all([this.fetchFixtures(), this.fetchStandings()]);
    // Prefer the fixtures source as the headline source; fall back label only
    // when both came from the bundled dataset.
    const isFallback = fixtures.source === 'fallback' && standings.source === 'fallback';
    const source: FootballSource =
      fixtures.source !== 'fallback' ? fixtures.source : standings.source;

    return {
      competition: COMPETITION,
      season: SEASON,
      fixtures: fixtures.data,
      groups: standings.data,
      isFallback,
      source,
      generatedAt: new Date().toISOString(),
    };
  }
}
