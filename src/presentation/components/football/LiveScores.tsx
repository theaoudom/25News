'use client';

import { useEffect, useState } from 'react';
import type { Fixture } from '@/domain/entities/Football';
import { FixtureCard } from './FixtureCard';

/**
 * Polls the live-scores API route on an interval and re-renders. Seeded with
 * server-rendered data for instant first paint and SEO, then kept fresh
 * client-side. Polling pauses while the tab is hidden to save quota.
 */
export function LiveScores({
  initial,
  intervalMs = 45000,
}: {
  initial: Fixture[];
  intervalMs?: number;
}) {
  const [fixtures, setFixtures] = useState<Fixture[]>(initial);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  useEffect(() => {
    let active = true;

    async function refresh() {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/world-cup/live', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { fixtures: Fixture[] };
        if (active) {
          setFixtures(data.fixtures);
          setUpdatedAt(new Date().toLocaleTimeString());
        }
      } catch {
        /* keep showing last good data */
      }
    }

    const id = setInterval(refresh, intervalMs);
    refresh();
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  if (fixtures.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] surface p-8 text-center text-muted">
        No matches are live right now. Check the{' '}
        <a href="/world-cup/fixtures" className="text-brand-600 underline">
          fixtures
        </a>{' '}
        for upcoming games.
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fixtures.map((f) => (
          <FixtureCard key={f.id} fixture={f} />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted" aria-live="polite">
        {updatedAt ? `Auto-updated at ${updatedAt}` : 'Live — updates automatically'}
      </p>
    </div>
  );
}
