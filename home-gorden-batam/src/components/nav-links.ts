// Navigasi 1 Halaman (Landing Page): ringkas & sejajar 1 baris bahkan saat browser di-zoom 120%
export const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#katalog', label: 'Katalog' },
  { href: '#solusi-ruangan', label: 'Solusi' },
  { href: '#portofolio', label: 'Portofolio' },
  { href: '#cara-kerja', label: 'Cara Kerja' },
  { href: '#faq', label: 'FAQ' },
  { href: '#kontak', label: 'Kontak' },
] as const;

export type NavHref = (typeof navLinks)[number]['href'];
