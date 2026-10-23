import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Geist } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Jasa Gorden Custom, Vitrase & Blinds Batam`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  verification: { google: 'SB73t9kmNVy1Z3g4_YsCSh_ARnogrc4nxwqrrUDjpP8' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Jasa Gorden Custom, Vitrase & Blinds Batam`,
    description: siteConfig.description,
    images: [
      {
        url: '/brand/og-home.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: `${siteConfig.name} — Survei & Pemasangan Gorden se-Batam`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Jasa Gorden Custom, Vitrase & Blinds Batam`,
    description: siteConfig.description,
    images: ['/brand/og-home.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#12100d',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: siteConfig.name,
  alternateName: siteConfig.legalOrLogoName,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: `+${siteConfig.waNumber}`,
  image: new URL('/brand/og-home.jpg', siteConfig.url).href,
  logo: new URL('/brand/logo.webp', siteConfig.url).href,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Legenda Villa Hang Lekir, Blok DD2 No 07, Batam Centre',
    addressLocality: 'Batam',
    addressRegion: 'Kepulauan Riau',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.coordinates.lat,
    longitude: siteConfig.coordinates.lng,
  },
  hasMap: siteConfig.mapsUrl,
  sameAs: [siteConfig.instagram, siteConfig.threads],
  areaServed: {
    '@type': 'City',
    name: 'Batam',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html lang="id" className={`${geist.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <JsonLd data={localBusinessSchema} />
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
      </body>
    </html>
  );
}
