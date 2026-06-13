import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Disclaimer',
  description: 'Editorial and data disclaimer for the 26News website.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" updated="June 13, 2026" path="/disclaimer">
      <p>
        The information provided by {siteConfig.name} on {siteConfig.url} is for general
        informational purposes only. All content is provided in good faith; however, we make no
        representation or warranty of any kind regarding its accuracy, adequacy, validity,
        reliability or completeness.
      </p>

      <h2>News &amp; Editorial</h2>
      <p>
        Articles reflect the reporting and analysis of their named authors at the time of
        publication. News develops over time; we update stories where appropriate but cannot
        guarantee that every article reflects the latest developments.
      </p>

      <h2>Sports Data</h2>
      <p>
        Fixtures, results, live scores and standings in our World Cup section are sourced from
        third-party football data providers. Where a live data source is unavailable, we display
        clearly labelled illustrative sample data. We are not responsible for inaccuracies, delays
        or interruptions in third-party data.
      </p>

      <h2>External Links</h2>
      <p>
        Our content may contain links to external websites that are not provided or maintained by us.
        We do not guarantee the accuracy or completeness of any information on these external sites.
      </p>

      <h2>No Professional Advice</h2>
      <p>
        Nothing on this site constitutes professional, financial, medical or legal advice. Always
        seek the guidance of a qualified professional with any questions you may have.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this disclaimer? Email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </StaticPage>
  );
}
