import Image from 'next/image';
import type { Fixture } from '@/domain/entities/Football';
import { formatKickoff } from '@/shared/utils/date';

function TeamRow({ name, logo, goals, win }: { name: string; logo: string; goals: number | null; win: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${win ? 'font-bold' : ''}`}>
      <span className="flex items-center gap-2 truncate">
        {logo ? (
          <Image src={logo} alt="" width={22} height={22} unoptimized className="h-[22px] w-[22px] object-contain" />
        ) : (
          <span className="inline-block h-[22px] w-[22px] flex-shrink-0 rounded-full bg-[var(--bg-soft)]" aria-hidden="true" />
        )}
        <span className="truncate">{name}</span>
      </span>
      {goals !== null && <span className="tabular-nums">{goals}</span>}
    </div>
  );
}

export function FixtureCard({ fixture }: { fixture: Fixture }) {
  const { home, away, homeGoals, awayGoals, status } = fixture;
  const homeWin = status === 'finished' && (homeGoals ?? 0) > (awayGoals ?? 0);
  const awayWin = status === 'finished' && (awayGoals ?? 0) > (homeGoals ?? 0);

  return (
    <article className="rounded-lg border border-[var(--border)] surface p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-muted">
        <span>{fixture.group || fixture.round}</span>
        {status === 'live' ? (
          <span className="flex items-center gap-1 font-semibold text-brand-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-600" aria-hidden="true" />
            LIVE {fixture.elapsed ? `${fixture.elapsed}'` : ''}
          </span>
        ) : status === 'finished' ? (
          <span className="font-semibold">FT</span>
        ) : (
          <time dateTime={fixture.kickoff}>{formatKickoff(fixture.kickoff)}</time>
        )}
      </div>
      <div className="space-y-1.5 text-sm">
        <TeamRow name={home.name} logo={home.logoUrl} goals={homeGoals} win={homeWin} />
        <TeamRow name={away.name} logo={away.logoUrl} goals={awayGoals} win={awayWin} />
      </div>
      {fixture.venue && <p className="mt-3 truncate text-xs text-muted">{fixture.venue}</p>}
    </article>
  );
}
