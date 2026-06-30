import type { Fixture, GroupStanding, StandingRow, Team } from '@/domain/entities/Football';
import { flagUrl } from './countryFlags';

/**
 * Backup client for openfootball/worldcup.json — public-domain World Cup data
 * on GitHub, requiring NO API key. Provides the full 104-match 2026 schedule
 * with groups and results. It has no team badges and no live state, so logos
 * are left empty and standings are computed from finished matches.
 */

const SEASON = process.env.FOOTBALL_WORLDCUP_SEASON || '2026';
const URL = `https://raw.githubusercontent.com/openfootball/worldcup.json/master/${SEASON}/worldcup.json`;

interface OfScore {
  ft?: [number, number];
  et?: [number, number]; // score after extra time (includes FT goals)
  p?: [number, number];  // penalty shootout goals
}

interface OfMatch {
  num?: number;  // sequential match number — used by W-codes (e.g. "W73")
  round?: string;
  date?: string;
  time?: string;
  team1?: string;
  team2?: string;
  group?: string;
  ground?: string;
  score?: OfScore;
}

/** Determine the winner of a completed match, handling ET and penalties. */
function matchWinner(m: OfMatch): string | undefined {
  const s = m.score;
  if (!s) return undefined;
  if (s.p) {
    const [hp, ap] = s.p;
    if (hp !== ap) return hp > ap ? m.team1 : m.team2;
  }
  if (s.et) {
    const [he, ae] = s.et;
    if (he !== ae) return he > ae ? m.team1 : m.team2;
  }
  if (s.ft) {
    const [hf, af] = s.ft;
    if (hf !== af) return hf > af ? m.team1 : m.team2;
  }
  return undefined;
}

/** Resolve "W73" → actual team name using the match-number map. */
function resolveTeam(name: string | undefined, byNum: Map<number, OfMatch>): string | undefined {
  if (!name) return name;
  const w = name.match(/^W(\d+)$/);
  if (!w) return name;
  const src = byNum.get(Number(w[1]));
  if (!src) return name;
  return matchWinner(src) ?? name; // keep W-code if match not yet decided
}

/** Deterministic small numeric id from a string (no Date/random — build-safe). */
function hashId(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function kickoffIso(date?: string, time?: string): string {
  const d = date || `${SEASON}-06-11`;
  if (!time) return new Date(`${d}T00:00:00Z`).toISOString();
  // time looks like "13:00 UTC-6" → derive an offset.
  const [hm, zone] = time.split(/\s+/);
  let offset = 'Z';
  const m = (zone || '').match(/UTC([+-]\d{1,2})/i);
  if (m) {
    const sign = m[1].startsWith('-') ? '-' : '+';
    const hours = String(Math.abs(Number(m[1]))).padStart(2, '0');
    offset = `${sign}${hours}:00`;
  }
  const parsed = new Date(`${d}T${hm}:00${offset}`);
  return Number.isNaN(parsed.getTime()) ? new Date(`${d}T00:00:00Z`).toISOString() : parsed.toISOString();
}

const team = (name: string): Team => ({ id: hashId(name), name, logoUrl: flagUrl(name) });

function mapMatch(m: OfMatch): Fixture {
  const s = m.score;
  const ft = s?.ft;
  const et = s?.et;
  const p = s?.p;
  const hasFt  = Array.isArray(ft) && ft.length === 2;
  const hasEt  = Array.isArray(et) && et.length === 2;
  const hasPso = Array.isArray(p)  && p.length  === 2;
  const finished = hasFt;

  // Display score: use AET score when match was decided in extra time (not PSO),
  // otherwise use FT score. PSO matches stay at the FT tie score.
  const display: [number, number] | null = hasFt
    ? (hasEt && !hasPso ? et! : ft!)
    : null;

  return {
    id: hashId(`${m.team1}-${m.team2}-${m.date}`),
    kickoff: kickoffIso(m.date, m.time),
    status: finished ? 'finished' : 'scheduled',
    round: m.round || 'Group Stage',
    group: m.group,
    venue: m.ground,
    home: team(m.team1 || 'TBD'),
    away: team(m.team2 || 'TBD'),
    homeGoals: display ? display[0] : null,
    awayGoals: display ? display[1] : null,
    afterExtraTime: (finished && (hasEt || hasPso)) ? true : undefined,
    homeGoalsPSO: hasPso ? p![0] : undefined,
    awayGoalsPSO: hasPso ? p![1] : undefined,
  };
}

export const openFootballClient = {
  async getFixtures(): Promise<Fixture[]> {
    const res = await fetch(URL, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`openfootball responded ${res.status}`);
    const data = (await res.json()) as { matches?: OfMatch[] };
    const raw = data.matches || [];

    // Build num → raw match map so W-codes can be resolved to team names.
    const byNum = new Map<number, OfMatch>();
    for (const m of raw) {
      if (m.num != null) byNum.set(m.num, m);
    }

    // Resolve W-codes (e.g. "W73" → "Brazil") before mapping to Fixture.
    const resolved = raw.map((m) => ({
      ...m,
      team1: resolveTeam(m.team1, byNum),
      team2: resolveTeam(m.team2, byNum),
    }));

    return resolved.map(mapMatch);
  },

  /** Compute group standings — seeds every team in a group, then accumulates
   *  finished results so all four teams show (with zeros) before kickoff. */
  async getStandings(): Promise<GroupStanding[]> {
    const fixtures = await openFootballClient.getFixtures();
    type Acc = Omit<StandingRow, 'rank'>;
    const groups = new Map<string, Map<string, Acc>>();

    const ensure = (group: string, side: Team) => {
      if (!groups.has(group)) groups.set(group, new Map());
      const table = groups.get(group)!;
      if (!table.has(side.name)) {
        table.set(side.name, {
          team: side,
          played: 0, win: 0, draw: 0, lose: 0,
          goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
        });
      }
    };

    // Pass 1: register every team that appears in a group (even unplayed).
    for (const f of fixtures) {
      if (!f.group) continue;
      ensure(f.group, f.home);
      ensure(f.group, f.away);
    }

    // Pass 2: accumulate finished results.
    for (const f of fixtures) {
      if (!f.group || f.status !== 'finished' || f.homeGoals === null || f.awayGoals === null) continue;
      const table = groups.get(f.group)!;
      const h = table.get(f.home.name)!;
      const a = table.get(f.away.name)!;
      const hg = f.homeGoals, ag = f.awayGoals;
      h.played++; a.played++;
      h.goalsFor += hg; h.goalsAgainst += ag;
      a.goalsFor += ag; a.goalsAgainst += hg;
      if (hg > ag) { h.win++; h.points += 3; a.lose++; }
      else if (hg < ag) { a.win++; a.points += 3; h.lose++; }
      else { h.draw++; a.draw++; h.points++; a.points++; }
    }

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([group, table]) => {
        const rows = Array.from(table.values())
          .map((r) => ({ ...r, goalDiff: r.goalsFor - r.goalsAgainst }))
          .sort((x, y) => y.points - x.points || y.goalDiff - x.goalDiff || y.goalsFor - x.goalsFor)
          .map((r, i): StandingRow => ({ ...r, rank: i + 1 }));
        return { group, rows };
      });
  },
};
