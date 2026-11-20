// Metadata per halaman: judul, deskripsi, canonical, dan Open Graph/Twitter sendiri
// (tanpa ini, halaman mewarisi og:title & og:url beranda saat link dibagikan).
import type { Metadata } from 'next';
import { siteConfig } from './config';

type PageSeo = {
  title: string;
  description: string;
  /** Path halaman, mis. '/kontak' */
  path: string;
  /** Gambar preview (path di public/), default /og.jpg */
  image?: { src: string; alt: string; width?: number; height?: number };
};

export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const og = image ?? { src: '/og.jpg', alt: title, width: 1200, height: 630 };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      siteName: siteConfig.name,
      url: path,
      title,
      description,
      images: [{ url: og.src, alt: og.alt, width: og.width, height: og.height }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [og.src] },
  };
}

export type Crumb = { name: string; path: string };

/** Data terstruktur BreadcrumbList: Beranda › ... › halaman */
export function breadcrumbList(crumbs: readonly Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Beranda', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.path, siteConfig.url).href,
    })),
  };
}

/** Breadcrumb satu tingkat: Beranda › halaman */
export const breadcrumb = (name: string, path: string) => breadcrumbList([{ name, path }]);
