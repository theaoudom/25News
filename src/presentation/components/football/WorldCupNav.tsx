'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Overview', href: '/world-cup' },
  { label: 'Fixtures', href: '/world-cup/fixtures' },
  { label: 'Results', href: '/world-cup/results' },
  { label: 'Standings', href: '/world-cup/standings' },
  { label: 'Live Scores', href: '/world-cup/live' },
  { label: 'News', href: '/world-cup/news' },
];

export function WorldCupNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="World Cup sections" className="border-b border-[var(--border)]">
      <div className="container-page flex gap-1 overflow-x-auto">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition ${
                active
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-muted hover:text-brand-600'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
