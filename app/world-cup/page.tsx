import type { Metadata } from 'next';
import Link from 'next/link';
import { footballService, articleService } from '@/di/container';
import { buildMetadata } from '@/shared/seo/metadata';
import { SectionHeading } from '@/presentation/components/SectionHeading';
import { FixtureCard } from '@/presentation/components/football/FixtureCard';
import { StandingsTable } from '@/presentation/components/football/StandingsTable';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { SearchBar } from '@/presentation/components/SearchBar';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 120;

export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 — Results, Standings, Bracket & Analysis',
  description:
    'The complete FIFA World Cup 2026 archive: every result, all 12 group tables, the full knockout bracket and our analysis of the first 48-team tournament.',
  path: '/world-cup',
});

export default async function WorldCupHub() {
  const football = footballService();
  const articles = articleService();

  const [finished, standings, news] = await Promise.all([
    football.getRecentResults(6),
    football.getStandings(),
    articles.getWorldCupArticles(6),
  ]);
  const results = finished.slice(0, 6);

  return (
    <div className="container-page py-8">
      <div className="mb-8 max-w-xl">
        <SearchBar basePath="/world-cup/news" placeholder="Search World Cup news…" />
      </div>

      {results.length > 0 && (
        <section>
          <SectionHeading title="Latest Results" href="/world-cup/results" accent />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((f) => (
              <FixtureCard key={f.id} fixture={f} />
            ))}
          </div>
        </section>
      )}

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
          <SectionHeading title="World Cup Analysis" href="/world-cup/news" accent />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      <div className="article-body mt-12 max-w-3xl">
        <h2>The First 48-Team World Cup</h2>
        <p>
          The 2026 tournament was the largest and most structurally different World Cup ever staged.
          It expanded from 32 teams to 48, from 64 matches to 104, and from a single host to three —
          the United States, Canada and Mexico — across sixteen venues and four time zones. Mexico
          became the first country to host World Cup matches in three separate tournaments, having
          previously staged the 1970 and 1986 editions.
        </p>
        <p>
          Expansion is easy to describe and harder to judge. More teams meant more nations
          experiencing a World Cup for the first time, and a qualifying campaign that stayed
          meaningful for far longer in every confederation. It also meant a group stage of twelve
          groups of four, feeding a knockout round of 32 that had never existed before, and a
          champion who had to win five knockout ties instead of four.
        </p>

        <h2>What This Section Contains</h2>
        <p>
          This is an archive rather than a live tracker. The tournament is complete, so the
          fixture-by-fixture and live-score pages that ran during it have been retired rather than
          left showing empty states. What remains is the record:
        </p>
        <ul>
          <li>
            <strong>Results</strong> — every final score, with extra time and shootouts marked.
          </li>
          <li>
            <strong>Standings</strong> — all twelve final group tables, and how the eight
            best third-placed teams qualified.
          </li>
          <li>
            <strong>Bracket</strong> — the full five-round knockout path to the final.
          </li>
          <li>
            <strong>Analysis</strong> — our written coverage of the format, the contenders, the host
            cities and the tournament's history.
          </li>
        </ul>

        <h2>A Note on Our Data</h2>
        <p>
          Match data on these pages comes from open football data providers — principally the
          openfootball project, with TheSportsDB as a secondary source. If neither can be reached,
          the pages state that the data is unavailable. They will not display placeholder fixtures or
          invented scores to fill the gap.
        </p>
      </div>
    </div>
  );
}
