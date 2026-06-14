'use client';

import { useEffect, useState } from 'react';

/**
 * Renders an ISO timestamp in the visitor's OWN timezone.
 *
 * Server components format dates in the server's timezone (UTC on Vercel), so
 * kickoff times would look wrong to everyone. This client component renders a
 * deterministic UTC value on the server / first paint (so hydration matches),
 * then re-renders in the browser's local timezone after mount.
 */
const OPTS: Record<string, Intl.DateTimeFormatOptions> = {
  datetime: { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  time: { hour: '2-digit', minute: '2-digit' },
};

export function LocalTime({ iso, mode = 'datetime' }: { iso: string; mode?: 'datetime' | 'time' }) {
  const opts = OPTS[mode];
  const fmt = (tz?: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', tz ? { ...opts, timeZone: tz } : opts).format(new Date(iso));
    } catch {
      return iso;
    }
  };
  // Stable UTC value for SSR + first client render; swap to local after mount.
  const [text, setText] = useState(() => fmt('UTC'));
  useEffect(() => setText(fmt()), [iso]); // no timeZone → visitor's local zone

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {text}
    </time>
  );
}
