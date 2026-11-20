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

/** Data terstruktur BreadcrumbList: Beranda › halaman */
export function breadcrumb(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name, item: new URL(path, siteConfig.url).href },
    ],
  };
}
