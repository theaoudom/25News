import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How 25News collects, uses and protects your personal data, including cookies and advertising partners.',
  path: '/privacy-policy',
});

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" updated="June 13, 2026" path="/privacy-policy">
      <p>
        This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and
        safeguards information when you visit {siteConfig.url}. By using the site you agree to the
        practices described here.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Usage data:</strong> pages visited, device and browser type, and referring pages, collected via analytics.</li>
        <li><strong>Cookies:</strong> small files used to remember preferences (such as light/dark theme) and to support advertising and analytics.</li>
        <li><strong>Contact data:</strong> any information you voluntarily provide when emailing us or using the contact form.</li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>To operate, maintain and improve the website and its content.</li>
        <li>To understand how readers use the site through aggregated analytics.</li>
        <li>To serve relevant advertising via third-party partners.</li>
        <li>To respond to enquiries you send us.</li>
      </ul>

      <h2>Advertising &amp; Google AdSense</h2>
      <p>
        We use Google AdSense to display advertisements. Third-party vendors, including Google, use
        cookies to serve ads based on your prior visits to this and other websites. Google&rsquo;s use of
        advertising cookies enables it and its partners to serve ads based on your visits.
      </p>
      <ul>
        <li>
          You may opt out of personalised advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">Google Ads Settings</a>.
        </li>
        <li>
          Learn more about how Google uses data at{' '}
          <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener" target="_blank">
            policies.google.com/technologies/partner-sites
          </a>.
        </li>
        <li>
          Visit{' '}
          <a href="https://www.aboutads.info" rel="nofollow noopener" target="_blank">www.aboutads.info</a> to opt out of
          third-party vendor cookies for personalised advertising.
        </li>
      </ul>

      <h2>Your Rights</h2>
      <p>
        Depending on your location (including under the GDPR and CCPA), you may have the right to
        access, correct or delete your personal data, and to object to certain processing. To
        exercise these rights, contact us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Children&rsquo;s Privacy</h2>
      <p>
        The site is not directed to children under 13, and we do not knowingly collect personal data
        from children.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected by the
        &ldquo;Last updated&rdquo; date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. See also our{' '}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>
    </StaticPage>
  );
}
