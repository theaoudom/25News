import Link from 'next/link';
import Image from 'next/image';
import type { ArticleSummary } from '@/domain/entities/Article';
import { formatDate } from '@/shared/utils/date';
import { isSvg } from '@/shared/utils/image';

interface Props {
  article: ArticleSummary;
  /** "default" full card, "compact" horizontal row, "minimal" text-only. */
  variant?: 'default' | 'compact' | 'minimal';
  priority?: boolean;
}

export function ArticleCard({ article, variant = 'default', priority = false }: Props) {
  const href = `/article/${article.slug}`;

  if (variant === 'minimal') {
    return (
      <article className="border-b border-[var(--border)] py-3 last:border-0">
        <Link href={href} className="group block">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {article.categoryLabel}
          </span>
          <h3 className="mt-1 font-medium leading-snug transition group-hover:text-brand-600 line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-muted">{formatDate(article.publishedAt)}</p>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-3">
        <Link href={href} className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            fill
            sizes="112px"
            unoptimized={isSvg(article.imageUrl)}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {article.categoryLabel}
          </span>
          <h3 className="mt-0.5 text-sm font-medium leading-snug line-clamp-2">
            <Link href={href} className="transition hover:text-brand-600">
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted">{article.readTimeMinutes} min read</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] surface transition hover:shadow-lg">
      <Link href={href} className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt || article.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={isSvg(article.imageUrl)}
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {article.isBreaking && (
          <span className="absolute left-3 top-3 rounded bg-brand-600 px-2 py-0.5 text-xs font-bold uppercase text-white">
            Breaking
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {article.categoryLabel}
        </span>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug line-clamp-2">
          <Link href={href} className="transition hover:text-brand-600">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted line-clamp-3">{article.summary}</p>
        <p className="mt-3 text-xs text-muted">
          By {article.authorName} · {formatDate(article.publishedAt)} · {article.readTimeMinutes} min
        </p>
      </div>
    </article>
  );
}
