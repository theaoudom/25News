import type { CategorySlug } from './Article';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'world',
    name: 'World',
    description:
      'International headlines, diplomacy, economy, science and breaking global stories.',
  },
  {
    slug: 'sports',
    name: 'Sports',
    description:
      'Scores, match reports, transfers and analysis across basketball, tennis, Formula 1 and more.',
  },
  {
    slug: 'football',
    name: 'Football',
    description:
      'Football news, transfers, match reports, standings and the road to the FIFA World Cup.',
  },
  {
    slug: 'esports',
    name: 'Esports',
    description:
      'Competitive gaming coverage — MLBB, League of Legends, CS2, tournaments and prize pools.',
  },
];

export const getCategory = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
