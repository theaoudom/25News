import type { Author } from '@/domain/entities/Article';
import { siteConfig } from '@/shared/config/site';

/**
 * Editorial attribution.
 *
 * Add a contributor here ONLY for a genuine, verifiable person. Inventing
 * author personas to look like a larger newsroom is the exact pattern that
 * destroys trust signals — the About page is written to match this file, so
 * keep the two consistent.
 *
 * Bios must state only what is true and checkable. Do not add years of
 * experience, past publications, qualifications or beat specialisms that
 * cannot be verified.
 */
export const AUTHORS: Record<string, Author> = {
  elvis: {
    id: 'elvis',
    name: 'Elvis',
    kind: 'person',
    role: 'Founder & Editor',
    bio:
      'Elvis founded 26News and writes and edits its football, FIFA World Cup and esports ' +
      'coverage. He works from primary records — club and governing-body statements and ' +
      'official competition rules — alongside published reporting, and lists the sources ' +
      `behind every news story. Corrections and story tips are welcome at ${siteConfig.contactEmail}.`,
    avatarUrl: '/images/authors/avatar.svg',
    url: `${siteConfig.url}/about`,
  },

  // Retained so historical `authorId: 'newsroom'` references and the
  // getAuthor fallback keep resolving.
  newsroom: {
    id: 'newsroom',
    name: '26News Newsroom',
    kind: 'organization',
    role: 'Football, World Cup & Esports Desk',
    bio:
      'The 26News editorial desk covers football, the FIFA World Cup and competitive esports. ' +
      'We work from primary records — club and governing-body statements, official competition ' +
      'rules and published reporting — and list our sources on every story. Corrections are ' +
      `welcome at ${siteConfig.contactEmail}.`,
    avatarUrl: '/images/authors/avatar.svg',
    url: `${siteConfig.url}/about`,
  },
};

export const getAuthor = (id: string): Author => AUTHORS[id] || AUTHORS['elvis'];
