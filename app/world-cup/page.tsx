import type { Metadata } from 'next';
import Link from 'next/link';
import { footballService, articleService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { JsonLd } from '@/presentation/components/JsonLd';
import { sportsEventJsonLd } from '@/shared/seo/jsonLd';
import { SectionHeading } from '@/presentation/components/SectionHeading';
import { FixtureCard } from '@/presentation/components/football/FixtureCard';
import { StandingsTable } from '@/presentation/components/football/StandingsTable';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { SearchBar } from '@/presentation/components/SearchBar';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 120;

export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 — Fixtures, Scores, Standings & News',
  description:
    'Your hub for the FIFA World Cup 2026: live scores, fixtures, group standings, recent results and the latest World Cup news.',
  path: '/world-cup',
});

export default async function WorldCupHub() {
  const football = footballService();
  const articles = articleService();

  const [live, upcoming, pending, finished, standings, news] = await Promise.all([
    football.getLiveScores(),
    football.getUpcomingFixtures(3),
    football.getPendingResults(3),
    football.getRecentResults(3),
    football.getStandings(),
    articles.getWorldCupArticles(6),
  ]);
  // Show kicked-off-but-unscored matches alongside finished ones.
  const results = [...pending, ...finished].slice(0, 3);

  const eventLd = [...live, ...upcoming].slice(0, 5).map((f) =>
    sportsEventJsonLd({
      name: `${f.home.name} vs ${f.away.name}`,
      startDate: f.kickoff,
      homeTeam: f.home.name,
      awayTeam: f.away.name,
      location: f.venue,
    }),
  );

  return (
    <div className="container-page py-8">
      {eventLd.length > 0 && <JsonLd data={eventLd} />}

      <div className="mb-8 max-w-xl">
        <SearchBar basePath="/world-cup/news" placeholder="Search World Cup news…" />
      </div>

      {live.length > 0 && (
        <section className="mb-10">
          <SectionHeading title="🔴 Live Now" href="/world-cup/live" accent />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((f) => (
              <FixtureCard key={f.id} fixture={f} />
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <SectionHeading title="Upcoming Fixtures" href="/world-cup/fixtures" accent />
          <div className="space-y-4">
            {upcoming.length ? (
              upcoming.map((f) => <FixtureCard key={f.id} fixture={f} />)
            ) : (
              <p className="text-muted">No upcoming fixtures scheduled.</p>
            )}
          </div>
        </section>
        <section>
          <SectionHeading title="Recent Results" href="/world-cup/results" accent />
          <div className="space-y-4">
            {results.length ? (
              results.map((f) => <FixtureCard key={f.id} fixture={f} />)
            ) : (
              <p className="text-muted">No results yet.</p>
            )}
          </div>
        </section>
      </div>

      <AdSlot label="Advertisement" />

      {standings.length > 0 && (
        <section className="mt-10">
          <SectionHeading title="Group Standings" href="/world-cup/standings" accent />
          <div className="grid gap-6 lg:grid-cols-2">
            {standings.slice(0, 2).map((g) => (
              <StandingsTable key={g.group} group={g} />
            ))}
          </div>
          <Link href="/world-cup/standings" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
            View all groups →
          </Link>
        </section>
      )}

      {news.length > 0 && (
        <section className="mt-12">
          <SectionHeading title="World Cup News" href="/world-cup/news" accent />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
