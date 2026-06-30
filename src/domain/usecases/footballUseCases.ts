import type { FootballRepository } from '../repositories/FootballRepository';
import type { Fixture, GroupStanding, WorldCupSnapshot } from '../entities/Football';

/**
 * Application use cases for World Cup football data. Keeps presentation free of
 * provider details and centralises domain rules like sorting and grouping.
 */
export class FootballUseCases {
  constructor(private readonly repo: FootballRepository) {}

  getSnapshot(): Promise<WorldCupSnapshot> {
    return this.repo.getWorldCupSnapshot();
  }

  /** Upcoming fixtures — only those that haven't kicked off yet, soonest first. */
  async getUpcomingFixtures(limit?: number): Promise<Fixture[]> {
    const fixtures = await this.repo.getFixtures();
    const now = Date.now();
    const upcoming = fixtures
      .filter(
        (f) =>
          (f.status === 'scheduled' || f.status === 'postponed') &&
          new Date(f.kickoff).getTime() >= now,
      )
      .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
    return typeof limit === 'number' ? upcoming.slice(0, limit) : upcoming;
  }

  /**
   * Matches that have kicked off but whose result hasn't been published by the
   * data source yet — shown as "result pending" instead of masquerading as
   * upcoming. Most recent first.
   */
  async getPendingResults(limit?: number): Promise<Fixture[]> {
    const fixtures = await this.repo.getFixtures();
    const now = Date.now();
    const pending = fixtures
      .filter(
        (f) =>
          (f.status === 'scheduled' || f.status === 'postponed') &&
          new Date(f.kickoff).getTime() < now,
      )
      .sort((a, b) => b.kickoff.localeCompare(a.kickoff));
    return typeof limit === 'number' ? pending.slice(0, limit) : pending;
  }

  /** Finished matches, most recent first. */
  async getRecentResults(limit?: number): Promise<Fixture[]> {
    const results = await this.repo.getResults();
    const sorted = results.sort((a, b) => b.kickoff.localeCompare(a.kickoff));
    return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
  }

  getLiveScores(): Promise<Fixture[]> {
    return this.repo.getLiveFixtures();
  }

  /**
   * World Cup matches kicking off today or tomorrow (UTC day boundaries),
   * soonest first. Powers the homepage breaking ticker's matchday entries.
   */
  async getMatchdayFixtures(): Promise<Fixture[]> {
    const fixtures = await this.repo.getFixtures();
    const now = new Date();
    const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const endOfWindow = startOfToday + 2 * 24 * 60 * 60 * 1000; // through end of tomorrow (exclusive)
    return fixtures
      .filter((f) => {
        const t = new Date(f.kickoff).getTime();
        return !Number.isNaN(t) && t >= startOfToday && t < endOfWindow;
      })
      .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
  }

  async getKnockoutFixtures(): Promise<{ round: string; fixtures: Fixture[] }[]> {
    const ROUND_ORDER = [
      'Round of 32',
      'Round of 16',
      'Quarter-final',
      'Semi-final',
      'Final',
      'Match for third place',
    ];
    const all = await this.repo.getFixtures();
    const roundSet = new Set(ROUND_ORDER);
    const byRound = new Map<string, Fixture[]>();
    for (const f of all) {
      if (!roundSet.has(f.round)) continue;
      if (!byRound.has(f.round)) byRound.set(f.round, []);
      byRound.get(f.round)!.push(f);
    }
    return ROUND_ORDER
      .filter((r) => byRound.has(r))
      .map((r) => ({
        round: r,
        fixtures: byRound.get(r)!.sort((a, b) => a.kickoff.localeCompare(b.kickoff)),
      }));
  }

  async getStandings(): Promise<GroupStanding[]> {
    const groups = await this.repo.getStandings();
    return groups
      .slice()
      .sort((a, b) => a.group.localeCompare(b.group))
      .map((g) => ({ ...g, rows: g.rows.slice().sort((x, y) => x.rank - y.rank) }));
  }
}
