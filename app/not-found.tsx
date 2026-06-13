import Link from 'next/link';
import { mainNav } from '@/shared/config/site';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-7xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-muted">
        The page you’re looking for doesn’t exist or has moved. Try one of these sections instead.
      </p>
      <nav aria-label="Sections" className="mt-6 flex flex-wrap justify-center gap-3">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-brand-600 hover:text-brand-600"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
