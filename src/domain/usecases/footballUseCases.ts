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

  /** Upcoming fixtures, soonest first. */
  async getUpcomingFixtures(limit?: number): Promise<Fixture[]> {
    const fixtures = await this.repo.getFixtures();
    const upcoming = fixtures
      .filter((f) => f.status === 'scheduled' || f.status === 'postponed')
      .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
    return typeof limit === 'number' ? upcoming.slice(0, limit) : upcoming;
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

  async getStandings(): Promise<GroupStanding[]> {
    const groups = await this.repo.getStandings();
    return groups
      .slice()
      .sort((a, b) => a.group.localeCompare(b.group))
      .map((g) => ({ ...g, rows: g.rows.slice().sort((x, y) => x.rank - y.rank) }));
  }
}
