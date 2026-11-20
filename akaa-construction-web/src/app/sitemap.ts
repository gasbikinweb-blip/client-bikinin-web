import type { MetadataRoute } from 'next';
import { areas } from '@/data/areas';
import { projects } from '@/data/projects';
import { servicePages } from '@/data/servicePages';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: [string, number][] = [
    ['/', 1],
    ...['/tentang', '/layanan', '/proyek', '/kontak'].map((p): [string, number] => [p, 0.8]),
    ...servicePages.map((s): [string, number] => [`/layanan/${s.slug}`, 0.8]),
    ...areas.map((a): [string, number] => [`/area/${a.slug}`, 0.7]),
    ...projects.map((p): [string, number] => [`/proyek/${p.slug}`, 0.6]),
  ];
  return paths.map(([path, priority]) => ({
    url: new URL(path, siteConfig.url).href,
    // Tanggal build = tanggal konten terakhir berubah
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority,
  }));
}
