import Link from 'next/link';
import type { ArticleSummary } from '@/domain/entities/Article';

/** Horizontal breaking-news strip. Pure CSS marquee-free scroll for a11y. */
export function BreakingTicker({ items }: { items: ArticleSummary[] }) {
  if (items.length === 0) return null;
  return (
    <div className="border-y border-[var(--border)] bg-brand-600 text-white">
      <div className="container-page flex items-center gap-4 py-2">
        <span className="flex-shrink-0 rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
          Breaking
        </span>
        <ul className="flex gap-6 overflow-x-auto whitespace-nowrap text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((a) => (
            <li key={a.id}>
              <Link href={`/article/${a.slug}`} className="font-medium hover:underline">
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
