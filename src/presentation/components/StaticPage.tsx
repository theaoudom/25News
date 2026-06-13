import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

/** Shared shell for legal / informational pages with breadcrumbs + prose. */
export function StaticPage({
  title,
  intro,
  updated,
  path,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: title, path }]} />
      <div className="container-page max-w-3xl py-6">
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold">{title}</h1>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
          {updated && <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>}
        </header>
        <div className="article-body">{children}</div>
      </div>
    </>
  );
}
