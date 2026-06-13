import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/shared/seo/jsonLd';

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-page py-3 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="text-[var(--fg)]">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition hover:text-brand-600">
                    {item.name}
                  </Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
