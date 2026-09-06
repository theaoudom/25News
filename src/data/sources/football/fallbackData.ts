import type { Fixture, GroupStanding } from '@/domain/entities/Football';

/**
 * Last-resort fallback for the World Cup data chain.
 *
 * This is intentionally EMPTY. An earlier version of this file shipped
 * hand-written "illustrative" fixtures and group tables — invented scores,
 * an invented in-progress match and groups that did not match the real
 * tournament. Because the repository falls back to this data whenever both
 * upstream providers fail, those inventions could be served to readers as
 * genuine results.
 *
 * Publishing fabricated sports results as fact is a factual-accuracy failure
 * and breaches our own editorial rule against presenting unverified claims as
 * fact. When no live provider can be reached the correct behaviour is to say
 * so, not to guess. The UI renders an explicit "data unavailable" state from
 * these empty arrays.
 *
 * Do not repopulate this file with example data. If you need offline
 * development fixtures, load them from a local file that is excluded from
 * production builds instead.
 */

export const FALLBACK_FIXTURES: Fixture[] = [];

export const FALLBACK_STANDINGS: GroupStanding[] = [];
