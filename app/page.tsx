import { articleService, footballService } from '@/di/container';
import { HeroArticle } from '@/presentation/components/HeroArticle';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { SectionHeading } from '@/presentation/components/SectionHeading';
import { AdSlot } from '@/presentation/components/AdSlot';
import { BreakingTicker } from '@/presentation/sections/BreakingTicker';
import { WorldCupWidget } from '@/presentation/sections/WorldCupWidget';

// Revalidate the homepage periodically (ISR) so new content + scores surface.
export const revalidate = 300;

export default async function HomePage() {
  const articles = articleService();
  const football = footballService();

  const [breaking, trending, latest, sports, worldCup, live, upcoming, snapshot] = await Promise.all([
    articles.getBreakingNews(5),
    articles.getTrending(5),
    articles.getLatest(7),
    articles.getSportsHighlights(4),
    articles.getWorldCupArticles(3),
    football.getLiveScores(),
    football.getUpcomingFixtures(3),
    football.getSnapshot(),
  ]);

  const [heroTrend, ...restTrend] = trending;
  // De-dupe latest against the hero to avoid showing the same story twice.
  const latestList = latest.filter((a) => a.id !== heroTrend?.id).slice(0, 6);

  return (
    <>
      <BreakingTicker items={breaking} />

      <div className="container-page py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lead story + trending sidebar */}
          <div className="lg:col-span-2">{heroTrend && <HeroArticle article={heroTrend} />}</div>
          <aside className="lg:col-span-1">
            <SectionHeading title="Trending" accent />
            <div className="space-y-4">
              {restTrend.map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </aside>
        </div>

        <AdSlot label="Advertisement" />

        {/* World Cup highlight */}
        <WorldCupWidget live={live} upcoming={upcoming} isFallback={snapshot.isFallback} />

        {/* Latest news grid */}
        <section className="mt-12">
          <SectionHeading title="Latest News" href="/category/world" accent />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestList.map((a, i) => (
              <ArticleCard key={a.id} article={a} priority={i < 3} />
            ))}
          </div>
        </section>

        {/* Sports highlights */}
        <section className="mt-12">
          <SectionHeading title="Sports Highlights" href="/category/sports" accent />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sports.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>

        <AdSlot label="Advertisement" />

        {/* World Cup editorial */}
        {worldCup.length > 0 && (
          <section className="mt-12">
            <SectionHeading title="World Cup Coverage" href="/world-cup" accent />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {worldCup.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
