import type { Fixture, GroupStanding, StandingRow, Team } from '@/domain/entities/Football';

/**
 * Backup client for openfootball/worldcup.json — public-domain World Cup data
 * on GitHub, requiring NO API key. Provides the full 104-match 2026 schedule
 * with groups and results. It has no team badges and no live state, so logos
 * are left empty and standings are computed from finished matches.
 */

const SEASON = process.env.FOOTBALL_WORLDCUP_SEASON || '2026';
const URL = `https://raw.githubusercontent.com/openfootball/worldcup.json/master/${SEASON}/worldcup.json`;

interface OfMatch {
  round?: string;
  date?: string;
  time?: string;
  team1?: string;
  team2?: string;
  group?: string;
  ground?: string;
  score?: { ft?: [number, number] };
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

const team = (name: string): Team => ({ id: hashId(name), name, logoUrl: '' });

function mapMatch(m: OfMatch): Fixture {
  const ft = m.score?.ft;
  const finished = Array.isArray(ft) && ft.length === 2;
  return {
    id: hashId(`${m.team1}-${m.team2}-${m.date}`),
    kickoff: kickoffIso(m.date, m.time),
    status: finished ? 'finished' : 'scheduled',
    round: m.round || 'Group Stage',
    group: m.group,
    venue: m.ground,
    home: team(m.team1 || 'TBD'),
    away: team(m.team2 || 'TBD'),
    homeGoals: finished ? ft![0] : null,
    awayGoals: finished ? ft![1] : null,
  };
}

export const openFootballClient = {
  async getFixtures(): Promise<Fixture[]> {
    const res = await fetch(URL, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`openfootball responded ${res.status}`);
    const data = (await res.json()) as { matches?: OfMatch[] };
    return (data.matches || []).map(mapMatch);
  },

  /** Compute group standings from finished matches. */
  async getStandings(): Promise<GroupStanding[]> {
    const fixtures = await openFootballClient.getFixtures();
    type Acc = Omit<StandingRow, 'rank'>;
    const groups = new Map<string, Map<string, Acc>>();

    for (const f of fixtures) {
      if (!f.group || f.status !== 'finished' || f.homeGoals === null || f.awayGoals === null) continue;
      if (!groups.has(f.group)) groups.set(f.group, new Map());
      const table = groups.get(f.group)!;

      for (const side of [f.home, f.away]) {
        if (!table.has(side.name)) {
          table.set(side.name, {
            team: side,
            played: 0, win: 0, draw: 0, lose: 0,
            goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
          });
        }
      }
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
