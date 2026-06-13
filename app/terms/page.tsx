import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description: 'The terms governing your use of the 25News website and its content.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions" updated="June 13, 2026" path="/terms">
      <p>
        These Terms &amp; Conditions govern your access to and use of {siteConfig.name} at{' '}
        {siteConfig.url}. By using the site, you agree to these terms.
      </p>

      <h2>Use of Content</h2>
      <p>
        All content on this site — including articles, images, graphics and code — is owned by or
        licensed to {siteConfig.publisher} and is protected by copyright. You may read and share
        links to our content for personal, non-commercial use. You may not republish, reproduce or
        redistribute content without prior written permission.
      </p>

      <h2>Acceptable Use</h2>
      <ul>
        <li>Do not use the site for any unlawful purpose or in violation of these terms.</li>
        <li>Do not attempt to disrupt, attack or gain unauthorised access to the site or its systems.</li>
        <li>Do not scrape, harvest or systematically extract content without permission.</li>
      </ul>

      <h2>Accuracy &amp; Availability</h2>
      <p>
        We strive for accuracy but make no warranties that content is complete, current or
        error-free. Sports data such as fixtures, scores and standings is provided by third parties
        and may be delayed or, where labelled, illustrative. The site is provided &ldquo;as is&rdquo; without
        warranties of any kind.
      </p>

      <h2>Third-Party Links &amp; Advertising</h2>
      <p>
        The site contains links to third-party websites and displays third-party advertising. We are
        not responsible for the content, products or practices of third parties.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.publisher} shall not be liable for any
        indirect, incidental or consequential damages arising from your use of the site.
      </p>

      <h2>Changes</h2>
      <p>
        We may revise these terms at any time. Continued use of the site after changes constitutes
        acceptance of the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </StaticPage>
  );
}
