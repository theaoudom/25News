import type { Fixture, FixtureStatus, GroupStanding, StandingRow, Team } from '@/domain/entities/Football';

/**
 * Thin client for API-Football (https://www.api-football.com/). Reads its
 * config from environment variables and maps the vendor payloads into domain
 * entities. Throws on any failure so the repository can fall back gracefully.
 *
 * Supports both direct api-football.com keys (header `x-apisports-key`) and
 * RapidAPI keys (headers `x-rapidapi-key` / `x-rapidapi-host`).
 */

const KEY = process.env.FOOTBALL_API_KEY || '';
const HOST = process.env.FOOTBALL_API_HOST || 'v3.football.api-sports.io';
const LEAGUE_ID = Number(process.env.FOOTBALL_WORLDCUP_LEAGUE_ID || '1');
const SEASON = Number(process.env.FOOTBALL_WORLDCUP_SEASON || '2026');

const isRapidApi = HOST.includes('rapidapi.com');

export const isFootballApiConfigured = (): boolean => KEY.length > 0;

function headers(): HeadersInit {
  if (isRapidApi) {
    return { 'x-rapidapi-key': KEY, 'x-rapidapi-host': HOST };
  }
  return { 'x-apisports-key': KEY };
}

async function apiGet<T>(path: string, revalidateSeconds: number): Promise<T> {
  if (!KEY) throw new Error('FOOTBALL_API_KEY not configured');
  const res = await fetch(`https://${HOST}${path}`, {
    headers: headers(),
    // ISR-style caching for server components / route handlers.
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`API-Football ${path} responded ${res.status}`);
  const json = (await res.json()) as { response: T; errors?: unknown };
  // API-Football returns `errors` as an empty array on success, or a non-empty
  // object/array describing the problem on failure.
  const errs = json.errors;
  const hasErrors = Array.isArray(errs) ? errs.length > 0 : Boolean(errs && Object.keys(errs).length);
  if (hasErrors) {
    throw new Error(`API-Football error: ${JSON.stringify(errs)}`);
  }
  return json.response;
}

// ── vendor payload shapes (only the fields we use) ──
interface ApiTeam {
  id: number;
  name: string;
  logo: string;
}
interface ApiFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; elapsed: number | null };
    venue: { name: string | null };
  };
  league: { round: string };
  teams: { home: ApiTeam; away: ApiTeam };
  goals: { home: number | null; away: number | null };
}
interface ApiStandingEntry {
  rank: number;
  team: ApiTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: { for: number; against: number };
  };
}
interface ApiLeagueStandings {
  league: { standings: ApiStandingEntry[][] };
}

function mapTeam(api: ApiTeam): Team {
  return { id: api.id, name: api.name, logoUrl: api.logo };
}

function mapStatus(short: string): FixtureStatus {
  if (['1H', '2H', 'HT', 'ET', 'P', 'LIVE', 'BT'].includes(short)) return 'live';
  if (['FT', 'AET', 'PEN'].includes(short)) return 'finished';
  if (['PST', 'CANC', 'ABD'].includes(short)) return 'postponed';
  return 'scheduled';
}

function mapFixture(api: ApiFixture): Fixture {
  const round = api.league.round || '';
  const groupMatch = round.match(/Group\s+([A-L])/i);
  return {
    id: api.fixture.id,
    kickoff: api.fixture.date,
    status: mapStatus(api.fixture.status.short),
    elapsed: api.fixture.status.elapsed ?? undefined,
    round,
    group: groupMatch ? `Group ${groupMatch[1].toUpperCase()}` : undefined,
    venue: api.fixture.venue?.name ?? undefined,
    home: mapTeam(api.teams.home),
    away: mapTeam(api.teams.away),
    homeGoals: api.goals.home,
    awayGoals: api.goals.away,
  };
}

export const apiFootballClient = {
  async getFixtures(): Promise<Fixture[]> {
    const data = await apiGet<ApiFixture[]>(
      `/fixtures?league=${LEAGUE_ID}&season=${SEASON}`,
      300,
    );
    return data.map(mapFixture);
  },

  async getLiveFixtures(): Promise<Fixture[]> {
    const data = await apiGet<ApiFixture[]>(
      `/fixtures?league=${LEAGUE_ID}&season=${SEASON}&live=all`,
      30,
    );
    return data.map(mapFixture);
  },

  async getStandings(): Promise<GroupStanding[]> {
    const data = await apiGet<ApiLeagueStandings[]>(
      `/standings?league=${LEAGUE_ID}&season=${SEASON}`,
      900,
    );
    const groups = data[0]?.league.standings ?? [];
    return groups.map((entries) => {
      const rows: StandingRow[] = entries.map((e) => ({
        rank: e.rank,
        team: mapTeam(e.team),
        played: e.all.played,
        win: e.all.win,
        draw: e.all.draw,
        lose: e.all.lose,
        goalsFor: e.all.goals.for,
        goalsAgainst: e.all.goals.against,
        goalDiff: e.goalsDiff,
        points: e.points,
        form: e.form,
      }));
      return { group: entries[0]?.group || 'Group', rows };
    });
  },
};
