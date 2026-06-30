'use client';

import { useState } from 'react';
import type { Fixture } from '@/domain/entities/Football';

type RoundData = { round: string; fixtures: Fixture[] };

// ─── Layout ───────────────────────────────────────────────────────────────
const CW   = 172;   // card width  (px)
const CH   = 64;    // card height (px) — header row + team row
const CONN = 32;    // connector zone width
const SH0  = 76;    // R32 slot height (≥ CH + vertical breathing room)
const NH   = 16;    // first-round match count
const BH   = NH * SH0;
const ROUND_COUNT = 5;
const BW   = ROUND_COUNT * CW + (ROUND_COUNT - 1) * CONN;

const RX = Array.from({ length: ROUND_COUNT }, (_, r) => r * (CW + CONN));
const slotH   = (r: number) => SH0 << r;
const centerY = (r: number, i: number) => slotH(r) * i + slotH(r) / 2;
const cardTop = (r: number, i: number) => centerY(r, i) - CH / 2;

// ─── Bracket mapping ──────────────────────────────────────────────────────
// bracket-slot-index → API-array-index, derived from openfootball WC 2026 W-codes
const BRACKET_ORDER: Record<string, number[]> = {
  // visual slot → API array index (API sorted by kickoff UTC)
  // Left half:  RSA/CAN, NED/MAR, GER/PAR, FRA/SWE, BEL/SEN, USA/BIH, ESP/AUT, POR/CRO
  // Right half: BRA/JPN, CIV/NOR, MEX/ECU, ENG/COD, SUI/ALG, COL/GHA, AUS/EGY, ARG/CPV
  'Round of 32':   [0, 3, 2, 5, 8, 9, 10, 11, 1, 4, 6, 7, 12, 15, 13, 14],
  // Pairs: [RSA+NED→R16₀] [GER+FRA→R16₁] [BEL+USA→R16₂] [ESP+POR→R16₃]
  //        [BRA+CIV→R16₄] [MEX+ENG→R16₅] [SUI+COL→R16₆] [AUS+ARG→R16₇]
  // API R16 sorted by kickoff: 0=CAN/MAR(5Jul12AM), 1=PAR/?(5Jul4AM),
  //   2=BRA/?(6Jul3AM), 3=MEX(6Jul7AM), 4=ESP(7Jul2AM), 5=BEL(7Jul7AM),
  //   6=AUS(7Jul11PM), 7=SUI(8Jul3AM)
  'Round of 16':   [0, 1, 5, 4, 2, 3, 7, 6],
  'Quarter-final': [0, 1, 2, 3],
  'Semi-final':    [0, 1],
  'Final':         [0],
};

const MAIN_ROUNDS = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'] as const;
const SHORT: Record<string, string> = {
  'Round of 32':'R32','Round of 16':'R16','Quarter-final':'QF','Semi-final':'SF','Final':'Final',
};

// ─── Country lookups ──────────────────────────────────────────────────────
const CODES: Record<string, string> = {
  'Germany':'GER','Paraguay':'PAR','France':'FRA','Sweden':'SWE','South Africa':'RSA',
  'Canada':'CAN','Netherlands':'NED','Morocco':'MAR','Portugal':'POR','Croatia':'CRO',
  'Spain':'ESP','Austria':'AUT','USA':'USA','Bosnia & Herzegovina':'BIH','Belgium':'BEL',
  'Senegal':'SEN','Brazil':'BRA','Japan':'JPN','Ivory Coast':'CIV','Norway':'NOR',
  'Mexico':'MEX','Ecuador':'ECU','England':'ENG','DR Congo':'COD','Argentina':'ARG',
  'Cape Verde':'CPV','Australia':'AUS','Egypt':'EGY','Switzerland':'SUI','Algeria':'ALG',
  'Colombia':'COL','Ghana':'GHA',
};

const FLAGS: Record<string, string> = {
  'Germany':'🇩🇪','Paraguay':'🇵🇾','France':'🇫🇷','Sweden':'🇸🇪','South Africa':'🇿🇦',
  'Canada':'🇨🇦','Netherlands':'🇳🇱','Morocco':'🇲🇦','Portugal':'🇵🇹','Croatia':'🇭🇷',
  'Spain':'🇪🇸','Austria':'🇦🇹','USA':'🇺🇸','Bosnia & Herzegovina':'🇧🇦','Belgium':'🇧🇪',
  'Senegal':'🇸🇳','Brazil':'🇧🇷','Japan':'🇯🇵','Ivory Coast':'🇨🇮','Norway':'🇳🇴',
  'Mexico':'🇲🇽','Ecuador':'🇪🇨','England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','DR Congo':'🇨🇩','Argentina':'🇦🇷',
  'Cape Verde':'🇨🇻','Australia':'🇦🇺','Egypt':'🇪🇬','Switzerland':'🇨🇭','Algeria':'🇩🇿',
  'Colombia':'🇨🇴','Ghana':'🇬🇭',
};

const isTbd   = (n: string) => !n || /^[WL]\d+$/.test(n.trim());
const getCode = (n: string) => isTbd(n) ? '?' : (CODES[n] || n.slice(0, 3).toUpperCase());
const getFlag = (n: string) => isTbd(n) ? '' : (FLAGS[n] || '');

function formatKickoff(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return { date, time };
}

// ─── Single match card (horizontal layout) ────────────────────────────────
function MatchCard({
  fixture, r, i, highlighted, dimmed, onEnter, onLeave,
}: {
  fixture: Fixture | null;
  r: number; i: number;
  highlighted: boolean; dimmed: boolean;
  onEnter: () => void; onLeave: () => void;
}) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: RX[r],
    top: cardTop(r, i),
    width: CW,
    height: CH,
    opacity: dimmed ? 0.25 : 1,
    transition: 'opacity .18s, border-color .15s, box-shadow .15s',
  };

  if (!fixture) {
    return (
      <div style={style} className="rounded-lg border border-[var(--border)] bg-[var(--card)] flex items-center justify-center">
        <span className="text-[10px] text-muted tracking-widest uppercase">TBD</span>
      </div>
    );
  }

  const { home, away, homeGoals, awayGoals, status, elapsed } = fixture;
  const pso     = fixture.homeGoalsPSO != null;
  const aet     = !!fixture.afterExtraTime && !pso;
  const homeWin = status === 'finished' && (
    (homeGoals ?? 0) > (awayGoals ?? 0) ||
    (pso && (fixture.homeGoalsPSO ?? 0) > (fixture.awayGoalsPSO ?? 0))
  );
  const awayWin = status === 'finished' && (
    (awayGoals ?? 0) > (homeGoals ?? 0) ||
    (pso && (fixture.awayGoalsPSO ?? 0) > (fixture.homeGoalsPSO ?? 0))
  );
  const homeTbd  = isTbd(home.name);
  const awayTbd  = isTbd(away.name);
  const { date, time } = formatKickoff(fixture.kickoff);

  let mid: string;
  if (status === 'live')                                mid = elapsed ? `${elapsed}'` : 'LIVE';
  else if (status === 'finished' && homeGoals !== null) mid = `${homeGoals}–${awayGoals}`;
  else                                                  mid = 'vs';

  return (
    <div
      style={style}
      className={`rounded-lg border bg-[var(--card)] overflow-hidden cursor-pointer flex flex-col ${
        highlighted
          ? 'border-brand-600 shadow-[0_0_0_3px_rgba(200,16,46,.18)]'
          : 'border-[var(--border)] hover:border-brand-400'
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Date / time header */}
      <div className="flex items-center justify-between px-2.5 bg-[var(--bg-soft)] border-b border-[var(--border)]" style={{ height: 18 }}>
        <span className="text-[10px] text-muted leading-none" suppressHydrationWarning>{date}</span>
        {status === 'live' ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-600 leading-none">
            <span className="h-1 w-1 rounded-full bg-brand-600 animate-pulse" />
            LIVE
          </span>
        ) : status === 'finished' ? (
          <span className="text-[10px] font-semibold text-muted leading-none">FT</span>
        ) : (
          <span className="text-[10px] text-muted leading-none" suppressHydrationWarning>{time}</span>
        )}
      </div>

      {/* Teams row */}
      <div className="flex flex-1 items-center justify-between px-2.5 gap-1.5">
        {/* Home */}
        <span className={`flex min-w-0 items-center gap-1 ${awayWin || homeTbd ? 'text-muted' : 'text-[var(--fg)]'}`}>
          {!homeTbd && <span className="text-[15px] leading-none flex-shrink-0">{getFlag(home.name)}</span>}
          <span className={`text-[11px] tracking-wider font-display truncate ${homeWin ? 'font-black' : 'font-bold'}`}>
            {getCode(home.name)}
          </span>
        </span>

        {/* Score / status */}
        <span className="flex-shrink-0 flex flex-col items-center gap-0">
          <span className={`text-[11px] font-bold tabular-nums leading-none ${status === 'live' ? 'text-brand-600' : 'text-muted'}`}>
            {mid}
          </span>
          {pso && <span className="text-[8px] font-bold text-muted tracking-widest leading-none mt-0.5">PSO</span>}
          {aet && <span className="text-[8px] font-bold text-muted tracking-widest leading-none mt-0.5">AET</span>}
        </span>

        {/* Away */}
        <span className={`flex min-w-0 items-center justify-end gap-1 ${homeWin || awayTbd ? 'text-muted' : 'text-[var(--fg)]'}`}>
          <span className={`text-[11px] tracking-wider font-display truncate ${awayWin ? 'font-black' : 'font-bold'}`}>
            {getCode(away.name)}
          </span>
          {!awayTbd && <span className="text-[15px] leading-none flex-shrink-0">{getFlag(away.name)}</span>}
        </span>
      </div>
    </div>
  );
}

// ─── Connector lines between two adjacent rounds ───────────────────────────
function drawConnectors(
  r: number,
  matchCount: number,
  litPairs: Set<number>,
): React.ReactNode[] {
  const rx   = RX[r] + CW;
  const lx   = RX[r + 1];
  const midX = rx + CONN / 2;
  const els: React.ReactNode[] = [];

  for (let i = 0; i < matchCount; i += 2) {
    const topCY = centerY(r, i);
    const botCY = centerY(r, i + 1);
    const midCY = (topCY + botCY) / 2;
    const lit   = litPairs.has(i / 2);
    const color = lit ? '#c8102e' : 'var(--border)';
    const trans = 'background .18s';
    const key   = `${r}-${i}`;

    els.push(
      <div key={`ht-${key}`} style={{ position:'absolute', left:rx, top:topCY-1, width:midX-rx, height:2, background:color, transition:trans }} />,
      <div key={`hb-${key}`} style={{ position:'absolute', left:rx, top:botCY-1, width:midX-rx, height:2, background:color, transition:trans }} />,
      <div key={`v-${key}`}  style={{ position:'absolute', left:midX-1, top:topCY, width:2, height:botCY-topCY, background:color, transition:trans }} />,
      <div key={`hm-${key}`} style={{ position:'absolute', left:midX, top:midCY-1, width:lx-midX, height:2, background:color, transition:trans }} />,
    );
  }
  return els;
}

// ─── Main bracket component ────────────────────────────────────────────────
export function KnockoutBracket({ rounds }: { rounds: RoundData[] }) {
  // Build bracket-ordered fixture arrays per round
  const byRound = new Map<string, (Fixture | null)[]>();
  for (const { round, fixtures } of rounds) {
    const order = BRACKET_ORDER[round];
    byRound.set(round, order ? order.map(i => fixtures[i] ?? null) : fixtures);
  }

  // Hover path state: list of (r, i) bracket slots
  const [path, setPath] = useState<{ r: number; i: number }[]>([]);

  function onEnter(r: number, i: number) {
    const p: { r: number; i: number }[] = [{ r, i }];
    let cur = i;
    for (let rr = r; rr < ROUND_COUNT - 1; rr++) {
      cur = Math.floor(cur / 2);
      p.push({ r: rr + 1, i: cur });
    }
    setPath(p);
  }
  function onLeave() { setPath([]); }

  const pathSet = new Set(path.map(p => `${p.r}-${p.i}`));

  function litPairsForRound(r: number): Set<number> {
    const s = new Set<number>();
    path.forEach(p => { if (p.r === r) s.add(Math.floor(p.i / 2)); });
    return s;
  }

  const thirdPlace = rounds.find(r => r.round === 'Match for third place');

  if (rounds.filter(r => r.round !== 'Match for third place').length === 0) {
    return <p className="text-muted">Knockout fixtures will appear once the group stage is complete.</p>;
  }

  return (
    <div>
      {/* Round header labels */}
      <div className="mb-2 flex" style={{ width: BW }}>
        {MAIN_ROUNDS.map((name, r) => (
          <div
            key={name}
            className="text-center text-[10px] font-display font-black tracking-[.12em] uppercase text-muted"
            style={{ width: CW, marginRight: r < ROUND_COUNT - 1 ? CONN : 0 }}
          >
            {SHORT[name]}
          </div>
        ))}
      </div>

      {/* Bracket — scrollable */}
      <div className="overflow-x-auto pb-4" style={{ cursor: 'default' }}>
        <div className="relative select-none" style={{ width: BW, height: BH }}>

          {/* Connectors */}
          {Array.from({ length: ROUND_COUNT - 1 }, (_, r) =>
            drawConnectors(r, NH >> r, litPairsForRound(r))
          )}

          {/* Cards */}
          {MAIN_ROUNDS.map((name, r) => {
            const fixtures = byRound.get(name) ?? [];
            const slots = NH >> r;
            return Array.from({ length: slots }, (_, i) => (
              <MatchCard
                key={`${r}-${i}`}
                fixture={fixtures[i] ?? null}
                r={r} i={i}
                highlighted={pathSet.has(`${r}-${i}`)}
                dimmed={path.length > 0 && !pathSet.has(`${r}-${i}`)}
                onEnter={() => onEnter(r, i)}
                onLeave={onLeave}
              />
            ));
          })}
        </div>
      </div>

      {/* Third place */}
      {thirdPlace?.fixtures[0] && (() => {
        const f = thirdPlace.fixtures[0];
        const { home, away, homeGoals, awayGoals, status, elapsed } = f;
        const fp   = f.homeGoalsPSO != null;
        const faet = !!f.afterExtraTime && !fp;
        const hW = status === 'finished' && (
          (homeGoals ?? 0) > (awayGoals ?? 0) ||
          (fp && (f.homeGoalsPSO ?? 0) > (f.awayGoalsPSO ?? 0))
        );
        const aW = status === 'finished' && (
          (awayGoals ?? 0) > (homeGoals ?? 0) ||
          (fp && (f.awayGoalsPSO ?? 0) > (f.homeGoalsPSO ?? 0))
        );
        const mid = status === 'live'      ? (elapsed ? `${elapsed}'` : 'LIVE')
                  : status === 'finished' && homeGoals !== null ? `${homeGoals}–${awayGoals}`
                  : 'vs';
        return (
          <div className="mt-8">
            <p className="mb-2 text-[10px] font-display font-black tracking-[.12em] uppercase text-muted">
              3rd Place Playoff
            </p>
            <div
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] flex flex-col overflow-hidden"
              style={{ width: CW, height: CH }}
            >
            <div className="flex items-center justify-between px-2.5 bg-[var(--bg-soft)] border-b border-[var(--border)]" style={{ height: 18 }}>
              <span className="text-[10px] text-muted" suppressHydrationWarning>{formatKickoff(f.kickoff).date}</span>
              {status === 'live' ? <span className="text-[10px] font-bold text-brand-600">LIVE</span>
                : status === 'finished' ? <span className="text-[10px] font-semibold text-muted">FT</span>
                : <span className="text-[10px] text-muted" suppressHydrationWarning>{formatKickoff(f.kickoff).time}</span>}
            </div>
            <div className="flex flex-1 items-center justify-between px-2.5 gap-1.5">
              <span className={`flex items-center gap-1 ${aW || isTbd(home.name) ? 'text-muted' : 'text-[var(--fg)]'}`}>
                {!isTbd(home.name) && <span className="text-[15px]">{getFlag(home.name)}</span>}
                <span className={`text-[11px] font-display tracking-wider ${hW ? 'font-black' : 'font-bold'}`}>{getCode(home.name)}</span>
              </span>
              <span className="flex flex-col items-center gap-0 flex-shrink-0">
                <span className={`text-[11px] font-bold tabular-nums leading-none ${status === 'live' ? 'text-brand-600' : 'text-muted'}`}>{mid}</span>
                {fp   && <span className="text-[8px] font-bold text-muted tracking-widest leading-none mt-0.5">PSO</span>}
                {faet && <span className="text-[8px] font-bold text-muted tracking-widest leading-none mt-0.5">AET</span>}
              </span>
              <span className={`flex items-center justify-end gap-1 ${hW || isTbd(away.name) ? 'text-muted' : 'text-[var(--fg)]'}`}>
                <span className={`text-[11px] font-display tracking-wider ${aW ? 'font-black' : 'font-bold'}`}>{getCode(away.name)}</span>
                {!isTbd(away.name) && <span className="text-[15px]">{getFlag(away.name)}</span>}
              </span>
            </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
