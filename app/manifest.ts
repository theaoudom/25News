import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: siteConfig.themeColor,
    icons: [{ src: '/images/Logo.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
