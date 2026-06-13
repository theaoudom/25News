'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/shared/config/site';

/**
 * Google AdSense display unit. Renders a clearly-labelled placeholder when no
 * publisher id / slot is configured, so layouts never break and we stay
 * compliant (ads are labelled, never disguised as content).
 *
 * Pass a real `slot` (ad unit id) from your AdSense dashboard in production.
 */
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface Props {
  slot?: string;
  format?: string;
  className?: string;
  /** Descriptive label for context (kept visually subtle). */
  label?: string;
}

export function AdSlot({ slot, format = 'auto', className = '', label = 'Advertisement' }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const client = siteConfig.adsenseClient;
  const enabled = Boolean(client && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready yet — ignore */
    }
  }, [enabled]);

  return (
    <aside
      className={`my-6 overflow-hidden rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg-soft)] ${className}`}
      aria-label={label}
    >
      <p className="px-3 pt-1 text-[10px] uppercase tracking-widest text-muted">{label}</p>
      {enabled ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-24 items-center justify-center text-xs text-muted">
          Ad space (configure NEXT_PUBLIC_ADSENSE_CLIENT and a slot id)
        </div>
      )}
    </aside>
  );
}
