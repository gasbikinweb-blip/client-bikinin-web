import type { Metadata, Viewport } from 'next';
import { Archivo, Barlow } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const heading = Archivo({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-heading',
});
const body = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const title = 'Jasa Bangun Rumah & Renovasi Cibubur, Jabodetabek | AKAA Construction';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.description,
  keywords: [
    'jasa bangun rumah Cibubur',
    'kontraktor rumah Jabodetabek',
    'jasa renovasi rumah Cibubur',
    'kontraktor rumah Bekasi',
    'jasa bangun rumah Bogor',
    'jasa interior rumah Jabodetabek',
  ],
  alternates: { canonical: '/' },
  // Ikon dari paket favicon AKAA (public/): huruf "A"
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  // Verifikasi Google Search Console (meta tag google-site-verification)
  verification: { google: 'RnbozMo0GR_fvTvogpUqpc9lo-DzRboMsib0EYCFst0' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f5f2' },
    { media: '(prefers-color-scheme: dark)', color: '#121315' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html lang="id" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Sengaja sinkron agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
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
