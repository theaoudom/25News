import Link from 'next/link';

export function SectionHeading({
  title,
  href,
  accent = false,
}: {
  title: string;
  href?: string;
  accent?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2
        className={`font-display text-2xl font-bold tracking-tight ${
          accent ? 'border-l-4 border-brand-600 pl-3' : ''
        }`}
      >
        {title}
      </h2>
      {href && (
        <Link href={href} className="whitespace-nowrap text-sm font-medium text-brand-600 hover:underline">
          View all →
        </Link>
      )}
    </div>
  );
}
