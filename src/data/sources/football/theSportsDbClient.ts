import type { Fixture, FixtureStatus, GroupStanding, StandingRow, Team } from '@/domain/entities/Football';

/**
 * Client for TheSportsDB (https://www.thesportsdb.com/) — a free football data
 * provider that, unlike API-Football's free tier, covers the FIFA World Cup
 * 2026 (fixtures, results, group standings and team badges).
 *
 * The public test key "3" works out of the box; register a free key at
 * thesportsdb.com and set THESPORTSDB_KEY for higher rate limits.
 */

const KEY = process.env.THESPORTSDB_KEY || '3';
const LEAGUE_ID = process.env.THESPORTSDB_WC_LEAGUE_ID || '4429'; // FIFA World Cup
const SEASON = process.env.FOOTBALL_WORLDCUP_SEASON || '2026';
const BASE = 'https://www.thesportsdb.com/api/v1/json';

const num = (v: string | null | undefined): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

function mapStatus(short: string | null): FixtureStatus {
  const s = (short || '').toUpperCase();
  if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE'].includes(s)) return 'live';
  if (['FT', 'AET', 'PEN'].includes(s)) return 'finished';
  if (['PST', 'CANC', 'ABD'].includes(s)) return 'postponed';
  return 'scheduled';
}

interface TsdbEvent {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  idHomeTeam: string;
  idAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  intRound: string | null;
  strTimestamp: string | null;
  dateEvent: string | null;
  strTime: string | null;
  strVenue: string | null;
  strHomeTeamBadge: string | null;
  strAwayTeamBadge: string | null;
  strStatus: string | null;
  strPostponed: string | null;
}

interface TsdbStandingRow {
  intRank: string;
  idTeam: string;
  strTeam: string;
  strBadge: string | null;
  strGroup: string | null;
  strForm: string | null;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intGoalDifference: string;
  intPoints: string;
}

async function get<T>(path: string, revalidateSeconds: number): Promise<T> {
  const res = await fetch(`${BASE}/${KEY}${path}`, { next: { revalidate: revalidateSeconds } });
  if (!res.ok) throw new Error(`TheSportsDB ${path} responded ${res.status}`);
  return (await res.json()) as T;
}

function kickoffIso(e: TsdbEvent): string {
  if (e.strTimestamp) {
    // e.g. "2026-06-11T19:00:00" (UTC, no zone) → mark as UTC.
    const ts = e.strTimestamp.endsWith('Z') ? e.strTimestamp : `${e.strTimestamp}Z`;
    const d = new Date(ts);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  const date = e.dateEvent || '2026-06-11';
  const time = e.strTime && e.strTime !== '' ? e.strTime : '00:00:00';
  const d = new Date(`${date}T${time}Z`);
  return Number.isNaN(d.getTime()) ? new Date(`${date}T00:00:00Z`).toISOString() : d.toISOString();
}

function mapEvent(e: TsdbEvent): Fixture {
  const status = e.strPostponed === 'yes' ? 'postponed' : mapStatus(e.strStatus);
  const home: Team = { id: num(e.idHomeTeam) ?? 0, name: e.strHomeTeam, logoUrl: e.strHomeTeamBadge || '' };
  const away: Team = { id: num(e.idAwayTeam) ?? 0, name: e.strAwayTeam, logoUrl: e.strAwayTeamBadge || '' };
  return {
    id: num(e.idEvent) ?? 0,
    kickoff: kickoffIso(e),
    status,
    round: e.intRound ? `Matchday ${e.intRound}` : 'Group Stage',
    venue: e.strVenue || undefined,
    home,
    away,
    homeGoals: num(e.intHomeScore),
    awayGoals: num(e.intAwayScore),
  };
}

export const theSportsDbClient = {
  async getFixtures(): Promise<Fixture[]> {
    const data = await get<{ events: TsdbEvent[] | null }>(
      `/eventsseason.php?id=${LEAGUE_ID}&s=${SEASON}`,
      300,
    );
    return (data.events || []).map(mapEvent);
  },

  async getStandings(): Promise<GroupStanding[]> {
    const data = await get<{ table: TsdbStandingRow[] | null }>(
      `/lookuptable.php?l=${LEAGUE_ID}&s=${SEASON}`,
      900,
    );
    const rows = data.table || [];
    const groups = new Map<string, StandingRow[]>();
    for (const r of rows) {
      const group = r.strGroup || 'Standings';
      const row: StandingRow = {
        rank: num(r.intRank) ?? 0,
        team: { id: num(r.idTeam) ?? 0, name: r.strTeam, logoUrl: (r.strBadge || '').replace(/\/tiny$/, '') },
        played: num(r.intPlayed) ?? 0,
        win: num(r.intWin) ?? 0,
        draw: num(r.intDraw) ?? 0,
        lose: num(r.intLoss) ?? 0,
        goalsFor: num(r.intGoalsFor) ?? 0,
        goalsAgainst: num(r.intGoalsAgainst) ?? 0,
        goalDiff: num(r.intGoalDifference) ?? 0,
        points: num(r.intPoints) ?? 0,
        form: r.strForm || undefined,
      };
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(row);
    }
    return Array.from(groups.entries()).map(([group, rows]) => ({ group, rows }));
  },
};
