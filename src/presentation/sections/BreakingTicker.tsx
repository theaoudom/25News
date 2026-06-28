import Link from 'next/link';

export interface TickerItem {
  /** Stable key. */
  key: string;
  /** Text shown in the strip. */
  text: string;
  /** Destination when clicked. */
  href: string;
}

/**
 * Breaking-news strip that scrolls right-to-left. The track renders the items
 * twice; the CSS marquee shifts it left by half its width for a seamless loop.
 * Hovering pauses it, and reduced-motion users get a static, scrollable strip.
 */
export function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (items.length === 0) return null;

  const run = (duplicate: boolean) =>
    items.map((it) => (
      <li key={`${duplicate ? 'dup-' : ''}${it.key}`} className="flex items-center">
        <Link href={it.href} className="font-medium hover:underline">
          {it.text}
        </Link>
        <span aria-hidden="true" className="mx-4 text-white/40">
          •
        </span>
      </li>
    ));

  return (
    <div className="border-y border-[var(--border)] bg-brand-600 text-white">
      <div className="container-page flex items-center gap-4 py-2">
        <span className="z-10 flex-shrink-0 rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
          Breaking
        </span>
        <div className="ticker-window group relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee-rtl text-sm group-hover:[animation-play-state:paused]">
            <ul className="flex whitespace-nowrap">{run(false)}</ul>
            <ul className="flex whitespace-nowrap" aria-hidden="true">
              {run(true)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
