import type { Author } from '@/domain/entities/Article';

/**
 * Editorial team. Migrated from the legacy `authors` map and enriched with
 * roles to strengthen E-E-A-T (author expertise) signals. Avatars use neutral
 * generated images; replace with real headshots when available.
 */
export const AUTHORS: Record<string, Author> = {
  'jane-doe': {
    id: 'jane-doe',
    name: 'Jane Doe',
    role: 'Sports Technology Correspondent',
    bio: 'Jane is a leading voice in sports technology, with a focus on AI and sustainability.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'mike-johnson': {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    role: 'Senior Football & Basketball Writer',
    bio: 'Mike has covered the NBA and European football for over a decade, known for sharp analysis of emerging talent.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'carlos-rodriguez': {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodriguez',
    role: 'European Football Insider',
    bio: 'Carlos is an insider in the world of European football, with a network of sources in top clubs.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'emily-white': {
    id: 'emily-white',
    name: 'Emily White',
    role: 'Esports Analyst',
    bio: 'Emily is a former professional gamer and now a premier analyst in the esports community.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'sarah-jenkins': {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Tennis Correspondent',
    bio: 'Sarah covers the international tennis circuit, with a keen eye for emerging stars.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'david-foster': {
    id: 'david-foster',
    name: 'David Foster',
    role: 'Features Writer',
    bio: 'David has a long history of breaking stories about sports legends and their careers.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'ben-carter': {
    id: 'ben-carter',
    name: 'Ben Carter',
    role: 'Sports Business Reporter',
    bio: 'Ben specialises in the business side of sport, including contracts and team management.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'evelyn-reed': {
    id: 'evelyn-reed',
    name: 'Dr. Evelyn Reed',
    role: 'Sports Science Columnist',
    bio: 'Dr. Reed is a sports scientist who writes about the intersection of technology and athletic performance.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'tom-frank': {
    id: 'tom-frank',
    name: 'Tom Frank',
    role: 'Football Match Analyst',
    bio: 'Tom is a seasoned football analyst known for his dramatic game commentary.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  'leo-chen': {
    id: 'leo-chen',
    name: 'Leo Chen',
    role: 'Esports Industry Reporter',
    bio: 'Leo covers the explosive growth of the esports industry and its financial impact.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  elvis: {
    id: 'elvis',
    name: 'Elvis Sok',
    role: 'MLBB & Mobile Esports Writer',
    bio: 'Elvis follows the Mobile Legends competitive scene across Southeast Asia.',
    avatarUrl: '/images/authors/avatar.svg',
  },
  newsroom: {
    id: 'newsroom',
    name: '25News Newsroom',
    role: 'Editorial Desk',
    bio: 'Reporting and analysis from the 25News editorial team.',
    avatarUrl: '/images/authors/avatar.svg',
  },
};

export const getAuthor = (id: string): Author => AUTHORS[id] || AUTHORS['newsroom'];
