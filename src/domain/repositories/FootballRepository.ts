import type { Fixture, GroupStanding, WorldCupSnapshot } from '../entities/Football';

/**
 * Abstraction over the football data provider. The data layer implements this
 * against API-Football, falling back to a bundled dataset when no key is set
 * or the upstream call fails.
 */
export interface FootballRepository {
  getWorldCupSnapshot(): Promise<WorldCupSnapshot>;
  getFixtures(): Promise<Fixture[]>;
  getResults(): Promise<Fixture[]>;
  getLiveFixtures(): Promise<Fixture[]>;
  getStandings(): Promise<GroupStanding[]>;
}
