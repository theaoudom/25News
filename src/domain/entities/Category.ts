import type { CategorySlug } from './Article';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'sports',
    name: 'Sports',
    description:
      'Motorsport and wider sport beyond football — Formula 1 race news, championship regulations and the decisions that shape a season.',
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
