'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** Submits to /search (or a scoped basePath like /world-cup/search). */
export function SearchBar({
  basePath = '/search',
  placeholder = 'Search news…',
  initialValue = '',
  autoFocus = false,
}: {
  basePath?: string;
  placeholder?: string;
  initialValue?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `${basePath}?q=${encodeURIComponent(q)}` : basePath);
  }

  return (
    <form role="search" onSubmit={onSubmit} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        Search
      </label>
      <input
        id="site-search"
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-soft)] py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-600"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
    </form>
  );
}
