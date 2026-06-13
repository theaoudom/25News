import type { Fixture, GroupStanding, Team } from '@/domain/entities/Football';

/**
 * Bundled FIFA World Cup 2026 dataset used when no FOOTBALL_API_KEY is set, or
 * when the upstream API-Football call fails. Keeps the World Cup section fully
 * functional out of the box. Replace/refresh from the live API in production.
 *
 * Dates are illustrative around the tournament window (June–July 2026).
 */

const t = (id: number, name: string, code: string): Team => ({
  id,
  name,
  countryCode: code,
  logoUrl: `https://media.api-sports.io/flags/${code.toLowerCase()}.svg`,
});

const TEAMS = {
  usa: t(1, 'USA', 'us'),
  mex: t(2, 'Mexico', 'mx'),
  can: t(3, 'Canada', 'ca'),
  arg: t(4, 'Argentina', 'ar'),
  bra: t(5, 'Brazil', 'br'),
  fra: t(6, 'France', 'fr'),
  eng: t(7, 'England', 'gb'),
  esp: t(8, 'Spain', 'es'),
  ger: t(9, 'Germany', 'de'),
  por: t(10, 'Portugal', 'pt'),
  ned: t(11, 'Netherlands', 'nl'),
  mar: t(12, 'Morocco', 'ma'),
  jpn: t(13, 'Japan', 'jp'),
  kor: t(14, 'South Korea', 'kr'),
  uru: t(15, 'Uruguay', 'uy'),
  cro: t(16, 'Croatia', 'hr'),
};

export const FALLBACK_FIXTURES: Fixture[] = [
  // Group A — one finished, one live
  {
    id: 1001,
    kickoff: '2026-06-11T20:00:00Z',
    status: 'finished',
    round: 'Group Stage - 1',
    group: 'Group A',
    venue: 'Estadio Azteca, Mexico City',
    home: TEAMS.mex,
    away: TEAMS.can,
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    id: 1002,
    kickoff: '2026-06-13T18:00:00Z',
    status: 'live',
    elapsed: 67,
    round: 'Group Stage - 2',
    group: 'Group A',
    venue: 'SoFi Stadium, Los Angeles',
    home: TEAMS.usa,
    away: TEAMS.mar,
    homeGoals: 1,
    awayGoals: 1,
  },
  // Group B — finished
  {
    id: 1003,
    kickoff: '2026-06-12T19:00:00Z',
    status: 'finished',
    round: 'Group Stage - 1',
    group: 'Group B',
    venue: 'MetLife Stadium, New Jersey',
    home: TEAMS.arg,
    away: TEAMS.cro,
    homeGoals: 3,
    awayGoals: 0,
  },
  {
    id: 1004,
    kickoff: '2026-06-12T22:00:00Z',
    status: 'finished',
    round: 'Group Stage - 1',
    group: 'Group B',
    venue: 'AT&T Stadium, Dallas',
    home: TEAMS.fra,
    away: TEAMS.kor,
    homeGoals: 2,
    awayGoals: 1,
  },
  // Upcoming fixtures
  {
    id: 1005,
    kickoff: '2026-06-14T18:00:00Z',
    status: 'scheduled',
    round: 'Group Stage - 2',
    group: 'Group C',
    venue: 'Mercedes-Benz Stadium, Atlanta',
    home: TEAMS.bra,
    away: TEAMS.ned,
    homeGoals: null,
    awayGoals: null,
  },
  {
    id: 1006,
    kickoff: '2026-06-14T21:00:00Z',
    status: 'scheduled',
    round: 'Group Stage - 2',
    group: 'Group C',
    venue: 'Lincoln Financial Field, Philadelphia',
    home: TEAMS.eng,
    away: TEAMS.jpn,
    homeGoals: null,
    awayGoals: null,
  },
  {
    id: 1007,
    kickoff: '2026-06-15T19:00:00Z',
    status: 'scheduled',
    round: 'Group Stage - 2',
    group: 'Group D',
    venue: 'BMO Field, Toronto',
    home: TEAMS.esp,
    away: TEAMS.uru,
    homeGoals: null,
    awayGoals: null,
  },
  {
    id: 1008,
    kickoff: '2026-06-15T22:00:00Z',
    status: 'scheduled',
    round: 'Group Stage - 2',
    group: 'Group D',
    venue: 'BC Place, Vancouver',
    home: TEAMS.ger,
    away: TEAMS.por,
    homeGoals: null,
    awayGoals: null,
  },
];

const row = (
  rank: number,
  team: Team,
  played: number,
  win: number,
  draw: number,
  lose: number,
  gf: number,
  ga: number,
  form: string,
) => ({
  rank,
  team,
  played,
  win,
  draw,
  lose,
  goalsFor: gf,
  goalsAgainst: ga,
  goalDiff: gf - ga,
  points: win * 3 + draw,
  form,
});

export const FALLBACK_STANDINGS: GroupStanding[] = [
  {
    group: 'Group A',
    rows: [
      row(1, TEAMS.mex, 1, 1, 0, 0, 2, 1, 'W'),
      row(2, TEAMS.usa, 1, 0, 1, 0, 1, 1, 'D'),
      row(3, TEAMS.mar, 1, 0, 1, 0, 1, 1, 'D'),
      row(4, TEAMS.can, 1, 0, 0, 1, 1, 2, 'L'),
    ],
  },
  {
    group: 'Group B',
    rows: [
      row(1, TEAMS.arg, 1, 1, 0, 0, 3, 0, 'W'),
      row(2, TEAMS.fra, 1, 1, 0, 0, 2, 1, 'W'),
      row(3, TEAMS.kor, 1, 0, 0, 1, 1, 2, 'L'),
      row(4, TEAMS.cro, 1, 0, 0, 1, 0, 3, 'L'),
    ],
  },
  {
    group: 'Group C',
    rows: [
      row(1, TEAMS.bra, 0, 0, 0, 0, 0, 0, ''),
      row(2, TEAMS.ned, 0, 0, 0, 0, 0, 0, ''),
      row(3, TEAMS.eng, 0, 0, 0, 0, 0, 0, ''),
      row(4, TEAMS.jpn, 0, 0, 0, 0, 0, 0, ''),
    ],
  },
  {
    group: 'Group D',
    rows: [
      row(1, TEAMS.esp, 0, 0, 0, 0, 0, 0, ''),
      row(2, TEAMS.ger, 0, 0, 0, 0, 0, 0, ''),
      row(3, TEAMS.por, 0, 0, 0, 0, 0, 0, ''),
      row(4, TEAMS.uru, 0, 0, 0, 0, 0, 0, ''),
    ],
  },
];
