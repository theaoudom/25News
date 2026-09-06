import type { Author } from '@/domain/entities/Article';

/**
 * Editorial attribution. All content is published under the single 26News
 * editorial entity rather than individual personas, so every byline maps to a
 * real, accountable source.
 *
 * Add a contributor here ONLY for a genuine, verifiable person. Inventing
 * author personas to look like a larger newsroom is the exact pattern that
 * destroys trust signals — the About page is written to match this file, so
 * keep the two consistent.
 */
export const AUTHORS: Record<string, Author> = {
  newsroom: {
    id: 'newsroom',
    name: '26News Newsroom',
    role: 'Football, World Cup & Esports Desk',
    bio:
      'The 26News editorial desk covers football, the FIFA World Cup and competitive esports. ' +
      'We work from primary records — club and governing-body statements, official competition ' +
      'rules and published reporting — and list our sources on every story. Corrections are ' +
      'welcome at ' +
      'info@26news.xyz.',
    avatarUrl: '/images/authors/avatar.svg',
  },
};

export const getAuthor = (id: string): Author => AUTHORS[id] || AUTHORS['newsroom'];
