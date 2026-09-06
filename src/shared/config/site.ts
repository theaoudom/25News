/**
 * Central site configuration. Pure data, no framework dependencies — consumed
 * across all layers for SEO, navigation, and branding.
 */

export const siteConfig = {
  name: '26News',
  shortName: '26News',
  tagline: 'Football, World Cup & Esports — covered.',
  description:
    'Football, FIFA World Cup and esports coverage — transfer news, match analysis, tournament explainers and the stories behind the results.',
  // Canonical base. Override via NEXT_PUBLIC_SITE_URL once a permanent custom
  // domain is live; defaults to the current Vercel URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://26news.xyz').replace(/\/$/, ''),
  locale: 'en_US',
  themeColor: '#c8102e',
  twitterHandle: '@26news',
  publisher: '26News Media',
  foundingYear: 2025,
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  contactEmail: 'info@26news.xyz',
  logo: '/images/26News.png',
  defaultOgImage: '/images/26News.png',
} as const;

/** Primary navigation, also used to generate breadcrumbs and the sitemap. */
export const mainNav: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Sports', href: '/category/sports' },
  { label: 'Football', href: '/category/football' },
  { label: 'World Cup', href: '/world-cup' },
  { label: 'Esports', href: '/category/esports' },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Sections',
    links: [
      { label: 'Sports', href: '/category/sports' },
      { label: 'Football', href: '/category/football' },
      { label: 'World Cup', href: '/world-cup' },
      { label: 'Esports', href: '/category/esports' },
    ],
  },
  {
    title: 'World Cup',
    links: [
      { label: 'Results', href: '/world-cup/results' },
      { label: 'Standings', href: '/world-cup/standings' },
      { label: 'Bracket', href: '/world-cup/bracket' },
      { label: 'Analysis', href: '/world-cup/news' },
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
