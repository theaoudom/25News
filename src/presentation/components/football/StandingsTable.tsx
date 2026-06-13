import Image from 'next/image';
import type { GroupStanding } from '@/domain/entities/Football';

export function StandingsTable({ group }: { group: GroupStanding }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] surface">
      <table className="w-full text-sm">
        <caption className="bg-[var(--bg-soft)] px-4 py-2 text-left font-display text-base font-bold">
          {group.group}
        </caption>
        <thead className="bg-[var(--bg-soft)] text-xs uppercase text-muted">
          <tr>
            <th scope="col" className="px-3 py-2 text-left">#</th>
            <th scope="col" className="px-3 py-2 text-left">Team</th>
            <th scope="col" className="px-2 py-2 text-center" title="Played">P</th>
            <th scope="col" className="hidden px-2 py-2 text-center sm:table-cell" title="Won">W</th>
            <th scope="col" className="hidden px-2 py-2 text-center sm:table-cell" title="Drawn">D</th>
            <th scope="col" className="hidden px-2 py-2 text-center sm:table-cell" title="Lost">L</th>
            <th scope="col" className="px-2 py-2 text-center" title="Goal difference">GD</th>
            <th scope="col" className="px-2 py-2 text-center font-bold" title="Points">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((r) => (
            <tr key={r.team.id} className="border-t border-[var(--border)]">
              <td className="px-3 py-2 text-muted">{r.rank}</td>
              <td className="px-3 py-2">
                <span className="flex items-center gap-2">
                  <Image src={r.team.logoUrl} alt="" width={20} height={20} unoptimized className="h-5 w-5 object-contain" />
                  <span className="truncate">{r.team.name}</span>
                </span>
              </td>
              <td className="px-2 py-2 text-center tabular-nums">{r.played}</td>
              <td className="hidden px-2 py-2 text-center tabular-nums sm:table-cell">{r.win}</td>
              <td className="hidden px-2 py-2 text-center tabular-nums sm:table-cell">{r.draw}</td>
              <td className="hidden px-2 py-2 text-center tabular-nums sm:table-cell">{r.lose}</td>
              <td className="px-2 py-2 text-center tabular-nums">{r.goalDiff > 0 ? `+${r.goalDiff}` : r.goalDiff}</td>
              <td className="px-2 py-2 text-center font-bold tabular-nums">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
