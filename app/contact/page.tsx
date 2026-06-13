import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { ContactForm } from '@/presentation/components/ContactForm';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the 25News team — story tips, feedback, corrections and advertising enquiries.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact Us"
      intro="We'd love to hear from you. Send story tips, feedback, corrections or advertising enquiries."
      path="/contact"
    >
      <h2>Reach the Newsroom</h2>
      <p>
        For general enquiries, email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. We aim to respond
        within two business days.
      </p>
      <ul>
        <li><strong>Editorial &amp; corrections:</strong> {siteConfig.contactEmail}</li>
        <li><strong>Advertising:</strong> {siteConfig.contactEmail}</li>
        <li><strong>Privacy requests:</strong> {siteConfig.contactEmail}</li>
      </ul>

      <h2>Send a Message</h2>
      <p>Use the form below and your message will open in your email client, pre-addressed to our team.</p>
      <ContactForm />
    </StaticPage>
  );
}
