import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from '@/shared/config/site';
import { ThemeProvider } from '@/presentation/components/ThemeProvider';
import { Navbar } from '@/presentation/components/Navbar';
import { Footer } from '@/presentation/components/Footer';
import { JsonLd } from '@/presentation/components/JsonLd';
import { Analytics } from '@/presentation/components/Analytics';
import { organizationJsonLd, webSiteJsonLd } from '@/shared/seo/jsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/images/Logo.svg', apple: '/images/Logo.svg' },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  ...(siteConfig.adsenseClient ? { other: { 'google-adsense-account': siteConfig.adsenseClient } } : {}),
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans">
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        {siteConfig.adsenseClient && (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
          />
        )}
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
