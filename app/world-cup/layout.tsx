import { WorldCupNav } from '@/presentation/components/football/WorldCupNav';
import { Breadcrumbs } from '@/presentation/components/Breadcrumbs';

export default function WorldCupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-gradient-to-r from-brand-700 to-brand-600 text-white">
        <div className="container-page py-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            FIFA World Cup 2026 · USA · Canada · Mexico
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">World Cup Central</h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Fixtures, live scores, standings, results and the latest World Cup news — all in one place.
          </p>
        </div>
      </div>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'World Cup', path: '/world-cup' }]} />
      <WorldCupNav />
      {children}
    </div>
  );
}
