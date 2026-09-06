import type { ArticleSource } from '@/domain/entities/Article';

/**
 * Visible citation list for the reporting behind an article.
 *
 * Attribution is a trust signal that has to be on the page, not just in our
 * notes: readers can verify every claim, and it makes clear which parts of a
 * story are other outlets' reporting rather than our own. Links carry
 * `rel="nofollow noopener"` — we are crediting a source, not passing ranking
 * signals — and open in the same tab so we never hijack navigation.
 */
export function ArticleSources({ sources }: { sources: ArticleSource[] }) {
  if (sources.length === 0) return null;

  return (
    <section className="mt-8 rounded-xl border border-[var(--border)] surface p-5">
      <h2 className="font-display text-lg font-bold">Sources &amp; further reading</h2>
      <p className="mt-1 text-sm text-muted">
        This report is based on the following primary and published sources.
      </p>
      <ol className="mt-4 space-y-3 text-sm">
        {sources.map((s) => (
          <li key={s.url} className="border-l-2 border-[var(--border)] pl-3">
            <a
              href={s.url}
              rel="nofollow noopener"
              className="font-medium text-brand-600 hover:underline"
            >
              {s.title}
            </a>
            <p className="mt-0.5 text-xs text-muted">
              <span className="font-semibold">{s.publisher}</span>
              {s.note && <> — {s.note}</>}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
