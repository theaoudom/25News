'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { mainNav, siteConfig } from '@/shared/config/site';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <Image src="/images/Logo.svg" alt="" width={32} height={32} priority unoptimized />
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-brand-600">26</span>News
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition hover:text-brand-600 ${
                isActive(item.href) ? 'text-brand-600' : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-64 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] lg:hidden">
          <div className="container-page space-y-3 py-4">
            <SearchBar />
            <nav aria-label="Mobile" className="grid gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item.href) ? 'bg-[var(--bg-soft)] text-brand-600' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
