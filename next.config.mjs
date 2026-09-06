/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    // Team-flag and crest assets (e.g. media.api-sports.io) are SVGs. Allow the
    // optimizer to serve them; they are sandboxed and scripts are blocked.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // Retired content. These pages were generic explainers outside the site's
    // football/World Cup/esports remit (and one general fitness how-to), so
    // they were removed rather than kept as thin filler. Permanent redirects
    // send any inbound link or stale index entry to a relevant section instead
    // of a 404.
    const retired = [
      ['/article/renewable-energy-explained-how-solar-power-works', '/'],
      ['/article/how-cryptocurrency-works-a-beginner-s-guide-to-bitcoin-and-blockchain', '/'],
      ['/article/how-artificial-intelligence-is-reshaping-everyday-life-in-2026', '/'],
      ['/article/training-for-your-first-marathon-a-beginner-s-guide', '/category/sports'],
      // Generic beginner guides to sports outside our remit. Removed for the
      // same reason: interchangeable reference content, not original reporting.
      ['/article/basketball-101-the-rules-and-how-the-game-works', '/category/sports'],
      ['/article/nba-vs-fiba-how-basketball-rules-differ-around-the-world', '/category/sports'],
      ['/article/tennis-scoring-explained-love-deuce-and-tie-breaks', '/category/sports'],
      ['/article/the-four-tennis-grand-slams-explained-a-beginner-s-guide', '/category/sports'],
      ['/article/what-is-a-battle-royale-the-genre-behind-pubg-and-fortnite', '/category/esports'],
    ];
    return [
      ...retired.map(([source, destination]) => ({ source, destination, permanent: true })),
      // The World category held only the retired off-topic explainers.
      { source: '/category/world', destination: '/', permanent: true },
      // Retired World Cup routes. Both were indexed while the tournament was
      // running but can now only ever render an empty state, so they point at
      // the archive pages that carry the equivalent information.
      { source: '/world-cup/fixtures', destination: '/world-cup/results', permanent: true },
      { source: '/world-cup/live', destination: '/world-cup/results', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
