/** Date helpers shared across layers. All input is ISO 8601. */

const DATE_FMT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const TIME_FMT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', DATE_FMT).format(d);
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${new Intl.DateTimeFormat('en-US', DATE_FMT).format(d)} · ${new Intl.DateTimeFormat(
    'en-US',
    TIME_FMT,
  ).format(d)}`;
}

export function formatKickoff(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Parse the legacy human-readable dates (e.g. "June 11, 2025") into ISO.
 * Falls back to a stable default when unparseable so builds stay deterministic.
 */
export function legacyDateToIso(input: string | undefined, fallback = '2025-06-01'): string {
  if (!input) return new Date(`${fallback}T09:00:00Z`).toISOString();
  const d = new Date(input);
  if (!Number.isNaN(d.getTime())) return d.toISOString();
  return new Date(`${fallback}T09:00:00Z`).toISOString();
}
