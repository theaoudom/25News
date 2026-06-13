import Link from 'next/link';
import Image from 'next/image';
import type { ArticleSummary } from '@/domain/entities/Article';
import { formatDate } from '@/shared/utils/date';
import { isSvg } from '@/shared/utils/image';

/** Large featured article used at the top of the homepage / section pages. */
export function HeroArticle({ article }: { article: ArticleSummary }) {
  const href = `/article/${article.slug}`;
  return (
    <article className="group relative overflow-hidden rounded-2xl">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] sm:aspect-[21/9]">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            unoptimized={isSvg(article.imageUrl)}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <span className="inline-block rounded bg-brand-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
            {article.categoryLabel}
          </span>
          <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-4xl">
            {article.title}
          </h2>
          <p className="mt-2 hidden max-w-2xl text-sm text-white/85 sm:block line-clamp-2">
            {article.summary}
          </p>
          <p className="mt-3 text-xs text-white/70">
            By {article.authorName} · {formatDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    </article>
  );
}
