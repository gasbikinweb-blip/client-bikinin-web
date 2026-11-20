// Layanan yang punya halaman sendiri (/layanan/[slug]): hanya yang sudah ada proyek nyatanya.
// Dipakai halaman layanan, halaman area, footer, dan sitemap.
import type { WorkType } from './types';

export const servicePages = [
  {
    slug: 'bangun-rumah',
    serviceId: 'bangun-rumah',
    workType: 'bangun-baru',
    keyword: 'Jasa Bangun Rumah',
  },
  { slug: 'renovasi', serviceId: 'renovasi', workType: 'renovasi', keyword: 'Jasa Renovasi Rumah' },
  {
    slug: 'custom-interior',
    serviceId: 'interior',
    workType: 'interior',
    keyword: 'Jasa Custom Interior',
  },
] as const satisfies readonly {
  slug: string;
  serviceId: string;
  workType: WorkType;
  keyword: string;
}[];
