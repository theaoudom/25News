import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleService } from '@/di/container';
import { CATEGORIES, getCategory } from '@/domain/entities/Category';
import { buildMetadata } from '@/shared/seo/metadata';
import { Breadcrumbs } from '@/presentation/components/Breadcrumbs';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { HeroArticle } from '@/presentation/components/HeroArticle';
import { AdSlot } from '@/presentation/components/AdSlot';

export const revalidate = 600;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategory(params.slug);
  if (!category) return buildMetadata({ title: 'Not found', description: '', path: `/category/${params.slug}`, noIndex: true });
  return buildMetadata({
    title: `${category.name} News`,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const articles = await articleService().getByCategory(category.slug);
  const [lead, ...rest] = articles;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: category.name, path: `/category/${category.slug}` },
        ]}
      />
      <div className="container-page py-4">
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-muted">{category.description}</p>
        </header>

        {articles.length === 0 ? (
          <p className="text-muted">No articles yet. Check back soon.</p>
        ) : (
          <>
            {lead && (
              <div className="mb-8">
                <HeroArticle article={lead} />
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </>
        )}

        <AdSlot label="Advertisement" />
      </div>
    </>
  );
}
