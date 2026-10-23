import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml (1 Halaman Landing Page)
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL('/', siteConfig.url).href,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
