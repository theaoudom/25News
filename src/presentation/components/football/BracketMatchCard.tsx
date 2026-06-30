import Image from 'next/image';
import type { Fixture } from '@/domain/entities/Football';

/** Detects openfootball placeholder codes like "W74" or "L101". */
function isTbd(name: string) {
  return /^[WL]\d+$/.test(name.trim());
}

function TeamSlot({
  name,
  logo,
  goals,
  winner,
}: {
  name: string;
  logo: string;
  goals: number | null;
  winner: boolean;
}) {
  const tbd = isTbd(name);
  return (
    <div
      className={`flex items-center justify-between gap-2 px-3 py-1.5 ${
        winner ? 'bg-brand-50 dark:bg-brand-950/30' : ''
      }`}
    >
      <span
        className={`flex min-w-0 items-center gap-2 text-sm ${
          winner ? 'font-bold text-brand-700 dark:text-brand-400' : 'text-[var(--fg)]'
        }`}
      >
        {!tbd && logo ? (
          <Image
            src={logo}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="h-5 w-5 flex-shrink-0 object-contain"
          />
        ) : (
          <span className="h-5 w-5 flex-shrink-0 rounded-full border border-[var(--border)] bg-[var(--bg-soft)]" />
        )}
        <span className="truncate">{tbd ? 'TBD' : name}</span>
      </span>
      <span
        className={`flex-shrink-0 tabular-nums text-sm font-semibold ${
          winner
            ? 'text-brand-700 dark:text-brand-400'
            : goals !== null
              ? 'text-[var(--fg)]'
              : 'text-muted'
        }`}
      >
        {goals !== null ? goals : '–'}
      </span>
    </div>
  );
}

export function BracketMatchCard({ fixture }: { fixture: Fixture }) {
  const { home, away, homeGoals, awayGoals, status, elapsed } = fixture;
  const homeWin = status === 'finished' && (homeGoals ?? 0) > (awayGoals ?? 0);
  const awayWin = status === 'finished' && (awayGoals ?? 0) > (homeGoals ?? 0);

  const dateStr = new Date(fixture.kickoff).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-soft)] px-3 py-1.5">
        <span className="truncate text-xs text-muted">{fixture.venue || dateStr}</span>
        {status === 'live' ? (
          <span className="ml-2 flex flex-shrink-0 items-center gap-1 text-xs font-bold text-brand-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-600" />
            {elapsed ? `${elapsed}'` : 'LIVE'}
          </span>
        ) : status === 'finished' ? (
          <span className="ml-2 flex-shrink-0 text-xs font-semibold text-muted">FT</span>
        ) : (
          <span className="ml-2 flex-shrink-0 text-xs text-muted">{dateStr}</span>
        )}
      </div>
      <div>
        <TeamSlot name={home.name} logo={home.logoUrl} goals={homeGoals} winner={homeWin} />
        <div className="mx-3 border-t border-[var(--border)]" />
        <TeamSlot name={away.name} logo={away.logoUrl} goals={awayGoals} winner={awayWin} />
      </div>
    </div>
  );
}
