import Link from 'next/link';
import { footerNav, siteConfig } from '@/shared/config/site';

export function Footer() {
  const year = siteConfig.foundingYear; // build-time constant; avoids hydration drift

  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-bold">
              <span className="text-brand-600">26</span>News
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.description}</p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition hover:text-brand-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year}–{year + 1} {siteConfig.publisher}. All rights reserved.
          </p>
          <p>
            Questions? <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-600">{siteConfig.contactEmail}</a>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          World Cup data by{' '}
          <a href="https://github.com/openfootball/worldcup.json" rel="nofollow noopener" target="_blank" className="hover:text-brand-600">
            openfootball
          </a>{' '}
          &amp;{' '}
          <a href="https://www.thesportsdb.com/" rel="nofollow noopener" target="_blank" className="hover:text-brand-600">
            TheSportsDB
          </a>{' '}
          · Flags by{' '}
          <a href="https://flagcdn.com/" rel="nofollow noopener" target="_blank" className="hover:text-brand-600">
            flagcdn
          </a>
        </p>
      </div>
    </footer>
  );
}
