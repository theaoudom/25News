import Image from 'next/image';
import { isSvg } from '@/shared/utils/image';

/**
 * Renders sanitised, server-trusted article HTML plus an optional secondary
 * image + body block (migrated from the legacy "subimage1"/"body2" fields).
 */
export function ArticleBody({
  html,
  secondaryImageUrl,
  secondaryHtml,
  imageAlt,
}: {
  html: string;
  secondaryImageUrl?: string;
  secondaryHtml?: string;
  imageAlt?: string;
}) {
  return (
    <div className="article-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {secondaryImageUrl && (
        <figure className="my-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={secondaryImageUrl}
              alt={imageAlt || ''}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              unoptimized={isSvg(secondaryImageUrl)}
              className="object-cover"
            />
          </div>
        </figure>
      )}
      {secondaryHtml && <div dangerouslySetInnerHTML={{ __html: secondaryHtml }} />}
    </div>
  );
}
