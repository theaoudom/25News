import type { FootballRepository } from '@/domain/repositories/FootballRepository';
import type { Fixture, GroupStanding, WorldCupSnapshot } from '@/domain/entities/Football';
import { apiFootballClient, isFootballApiConfigured } from '@/data/sources/football/apiFootballClient';
import { FALLBACK_FIXTURES, FALLBACK_STANDINGS } from '@/data/sources/football/fallbackData';

const COMPETITION = 'FIFA World Cup';
const SEASON = Number(process.env.FOOTBALL_WORLDCUP_SEASON || '2026');

/**
 * FootballRepository that prefers the live API-Football provider but degrades
 * gracefully to the bundled dataset when the key is missing or the upstream
 * call fails. The `isFallback` flag is surfaced to the UI so users know when
 * data is illustrative rather than live.
 */
export class ApiFootballRepository implements FootballRepository {
  private async safe<T>(live: () => Promise<T>, fallback: T): Promise<{ data: T; isFallback: boolean }> {
    if (!isFootballApiConfigured()) return { data: fallback, isFallback: true };
    try {
      const data = await live();
      // Empty live responses (e.g. season not yet populated) → use fallback.
      if (Array.isArray(data) && data.length === 0) return { data: fallback, isFallback: true };
      return { data, isFallback: false };
    } catch (err) {
      console.error('[football] live fetch failed, using fallback:', (err as Error).message);
      return { data: fallback, isFallback: true };
    }
  }

  async getFixtures(): Promise<Fixture[]> {
    const { data } = await this.safe(() => apiFootballClient.getFixtures(), FALLBACK_FIXTURES);
    return data;
  }

  async getResults(): Promise<Fixture[]> {
    const fixtures = await this.getFixtures();
    return fixtures.filter((f) => f.status === 'finished');
  }

  async getLiveFixtures(): Promise<Fixture[]> {
    const fallbackLive = FALLBACK_FIXTURES.filter((f) => f.status === 'live');
    const { data } = await this.safe(() => apiFootballClient.getLiveFixtures(), fallbackLive);
    return data;
  }

  async getStandings(): Promise<GroupStanding[]> {
    const { data } = await this.safe(() => apiFootballClient.getStandings(), FALLBACK_STANDINGS);
    return data;
  }

  async getWorldCupSnapshot(): Promise<WorldCupSnapshot> {
    const [fixturesRes, standingsRes] = await Promise.all([
      this.safe(() => apiFootballClient.getFixtures(), FALLBACK_FIXTURES),
      this.safe(() => apiFootballClient.getStandings(), FALLBACK_STANDINGS),
    ]);
    return {
      competition: COMPETITION,
      season: SEASON,
      fixtures: fixturesRes.data,
      groups: standingsRes.data,
      isFallback: fixturesRes.isFallback || standingsRes.isFallback,
      generatedAt: new Date().toISOString(),
    };
  }
}
