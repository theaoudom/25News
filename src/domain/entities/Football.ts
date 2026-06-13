/**
 * Domain entities for football / World Cup data. These are provider-agnostic:
 * the API-Football client and the bundled fallback dataset both map into these,
 * so the presentation layer never depends on a specific vendor schema.
 */

export interface Team {
  id: number;
  name: string;
  logoUrl: string;
  countryCode?: string;
}

export type FixtureStatus = 'scheduled' | 'live' | 'finished' | 'postponed';

export interface Fixture {
  id: number;
  /** ISO 8601 kickoff time (UTC). */
  kickoff: string;
  status: FixtureStatus;
  /** Minutes elapsed when live. */
  elapsed?: number;
  round: string;
  venue?: string;
  group?: string;
  home: Team;
  away: Team;
  homeGoals: number | null;
  awayGoals: number | null;
}

export interface StandingRow {
  rank: number;
  team: Team;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  /** Recent form, e.g. "WWDLW". */
  form?: string;
}

export interface GroupStanding {
  group: string;
  rows: StandingRow[];
}

export interface WorldCupSnapshot {
  /** League/competition display name. */
  competition: string;
  season: number;
  groups: GroupStanding[];
  fixtures: Fixture[];
  /** True when served from the bundled fallback rather than the live API. */
  isFallback: boolean;
  /** ISO timestamp the snapshot was produced. */
  generatedAt: string;
}
