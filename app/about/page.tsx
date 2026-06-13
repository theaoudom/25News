import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    'Learn about 25News — our editorial mission, standards, and the team behind our World, Sports, Football and Esports coverage.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <StaticPage
      title="About 25News"
      intro={`${siteConfig.name} is an independent digital newsroom covering World affairs, Sports, Football, the FIFA World Cup and Esports.`}
      path="/about"
    >
      <h2>Our Mission</h2>
      <p>
        At 25News, our mission is to deliver timely, accurate and insightful journalism that helps
        readers understand the stories shaping our world. We combine original reporting with clear
        analysis across our core sections: World, Sports, Football and Esports.
      </p>

      <h2>Editorial Standards</h2>
      <p>
        Every article published on 25News is written by a named author and reviewed for accuracy
        before publication. We are committed to:
      </p>
      <ul>
        <li><strong>Accuracy:</strong> verifying facts against multiple credible sources.</li>
        <li><strong>Transparency:</strong> clearly attributing sources, quotes and data.</li>
        <li><strong>Independence:</strong> keeping editorial decisions free from advertiser influence.</li>
        <li><strong>Corrections:</strong> promptly correcting errors and noting significant updates.</li>
      </ul>

      <h2>Our Expertise (E-E-A-T)</h2>
      <p>
        Our contributors bring first-hand experience and subject-matter expertise to their beats —
        from football transfer specialists and tennis correspondents to esports analysts and sports
        scientists. Author bios and roles appear on every story so readers know exactly who is
        behind the reporting.
      </p>

      <h2>How We Cover the World Cup</h2>
      <p>
        Our dedicated World Cup section combines editorial coverage with live data — fixtures,
        results, group standings and live scores — sourced from established football data providers
        and clearly labelled when illustrative.
      </p>

      <h2>Contact</h2>
      <p>
        We welcome feedback, story tips and corrections. Reach us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or through our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </StaticPage>
  );
}
