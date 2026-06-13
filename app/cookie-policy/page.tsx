import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description: 'How 26News uses cookies and similar technologies, and how to control them.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <StaticPage title="Cookie Policy" updated="June 13, 2026" path="/cookie-policy">
      <p>
        This Cookie Policy explains how {siteConfig.name} uses cookies and similar technologies on{' '}
        {siteConfig.url}. It should be read alongside our <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the
        site function, remember your preferences and understand how the site is used.
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li>
          <strong>Essential cookies:</strong> required for the site to function, such as remembering
          your light/dark theme preference.
        </li>
        <li>
          <strong>Analytics cookies:</strong> help us understand aggregate visitor behaviour so we can
          improve the site.
        </li>
        <li>
          <strong>Advertising cookies:</strong> used by Google AdSense and its partners to deliver and
          measure advertising. See our <a href="/privacy-policy">Privacy Policy</a> for opt-out links.
        </li>
      </ul>

      <h2>Managing Cookies</h2>
      <p>
        Most browsers let you refuse or delete cookies through their settings. Blocking some cookies
        may affect your experience of the site. You can also manage personalised advertising via{' '}
        <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">Google Ads Settings</a> and{' '}
        <a href="https://www.aboutads.info/choices" rel="nofollow noopener" target="_blank">aboutads.info/choices</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about our use of cookies? Email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </StaticPage>
  );
}
