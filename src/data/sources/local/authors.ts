import type { Author } from '@/domain/entities/Article';

/**
 * Editorial attribution. All content is published under the single 26News
 * editorial entity rather than individual personas, so every byline maps to a
 * real, accountable source. Add a contributor here only when it represents a
 * genuine, verifiable author.
 */
export const AUTHORS: Record<string, Author> = {
  newsroom: {
    id: 'newsroom',
    name: '26News Newsroom',
    role: 'Editorial Desk',
    bio: 'Reporting and analysis from the 26News editorial team.',
    avatarUrl: '/images/authors/avatar.svg',
  },
};

export const getAuthor = (id: string): Author => AUTHORS[id] || AUTHORS['newsroom'];
