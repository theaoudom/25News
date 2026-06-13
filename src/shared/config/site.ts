/**
 * Central site configuration. Pure data, no framework dependencies — consumed
 * across all layers for SEO, navigation, and branding.
 */

export const siteConfig = {
  name: '25News',
  shortName: '25News',
  tagline: 'World, Sports, Football & Esports — covered.',
  description:
    'Your trusted source for the latest news in World affairs, Sports, Football, the FIFA World Cup, and Esports. Timely, accurate, and in-depth reporting.',
  // Canonical base. Override via NEXT_PUBLIC_SITE_URL once a permanent custom
  // domain is live; defaults to the current Vercel URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://25-news.vercel.app').replace(/\/$/, ''),
  locale: 'en_US',
  themeColor: '#c8102e',
  twitterHandle: '@25news',
  publisher: '25News Media',
  foundingYear: 2025,
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  contactEmail: 'info@25news.xyz',
  logo: '/images/25News.png',
  defaultOgImage: '/images/25News.png',
} as const;

/** Primary navigation, also used to generate breadcrumbs and the sitemap. */
export const mainNav: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'World', href: '/category/world' },
  { label: 'Sports', href: '/category/sports' },
  { label: 'Football', href: '/category/football' },
  { label: 'World Cup', href: '/world-cup' },
  { label: 'Esports', href: '/category/esports' },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Sections',
    links: [
      { label: 'World', href: '/category/world' },
      { label: 'Sports', href: '/category/sports' },
      { label: 'Football', href: '/category/football' },
      { label: 'World Cup', href: '/world-cup' },
      { label: 'Esports', href: '/category/esports' },
    ],
  },
  {
    title: 'World Cup',
    links: [
      { label: 'Fixtures', href: '/world-cup/fixtures' },
      { label: 'Results', href: '/world-cup/results' },
      { label: 'Standings', href: '/world-cup/standings' },
      { label: 'Live Scores', href: '/world-cup/live' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];
