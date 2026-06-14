import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articleService } from '@/di/container';
import { getCategory } from '@/domain/entities/Category';
import { buildMetadata } from '@/shared/seo/metadata';
import { articleJsonLd } from '@/shared/seo/jsonLd';
import { JsonLd } from '@/presentation/components/JsonLd';
import { Breadcrumbs } from '@/presentation/components/Breadcrumbs';
import { ArticleBody } from '@/presentation/components/ArticleBody';
import { ArticleCard } from '@/presentation/components/ArticleCard';
import { AdSlot } from '@/presentation/components/AdSlot';
import { SectionHeading } from '@/presentation/components/SectionHeading';
import { formatDate } from '@/shared/utils/date';
import { isSvg } from '@/shared/utils/image';

export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await articleService().allSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await articleService().getArticle(params.slug);
  if (!article) return buildMetadata({ title: 'Article not found', description: '', path: `/article/${params.slug}`, noIndex: true });

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/article/${article.slug}`,
    images: [article.imageUrl],
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author.name],
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const service = articleService();
  const article = await service.getArticle(params.slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = await service.getRelated(article, 3);
  const path = `/article/${article.slug}`;

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: category?.name || 'News', path: `/category/${article.category}` },
    { name: article.title, path },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(article, path)} />
      <Breadcrumbs items={crumbs} />

      <article className="container-page max-w-3xl py-4">
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {article.categoryLabel}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{article.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-[var(--border)] py-3 text-sm">
            <Image
              src={article.author.avatarUrl || '/images/authors/avatar.svg'}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{article.author.name}</p>
              {article.author.role && <p className="text-xs text-muted">{article.author.role}</p>}
            </div>
            <div className="ml-auto text-right text-xs text-muted">
              <p>
                Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </p>
              {article.updatedAt !== article.publishedAt && (
                <p>
                  Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </p>
              )}
              <p>{article.readTimeMinutes} min read</p>
            </div>
          </div>
        </header>

        <figure className="my-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized={isSvg(article.imageUrl)}
              className="object-cover"
            />
          </div>
          {article.imageCredit && (
            <figcaption className="mt-2 text-xs text-muted">{article.imageCredit}</figcaption>
          )}
        </figure>

        <ArticleBody
          html={article.body}
          secondaryImageUrl={article.secondaryImageUrl}
          secondaryHtml={article.secondaryBody}
          imageAlt={article.imageAlt}
        />

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[var(--bg-soft)] px-3 py-1 text-xs text-muted">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author bio reinforces E-E-A-T */}
        {article.author.bio && (
          <aside className="mt-8 flex gap-4 rounded-xl border border-[var(--border)] surface p-5">
            <Image
              src={article.author.avatarUrl || '/images/authors/avatar.svg'}
              alt=""
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 rounded-full"
            />
            <div>
              <p className="font-display text-lg font-bold">{article.author.name}</p>
              {article.author.role && <p className="text-sm text-brand-600">{article.author.role}</p>}
              <p className="mt-1 text-sm text-muted">{article.author.bio}</p>
            </div>
          </aside>
        )}

        <AdSlot label="Advertisement" />
      </article>

      {related.length > 0 && (
        <section className="container-page max-w-5xl pb-12">
          <SectionHeading title="Related Stories" accent />
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
