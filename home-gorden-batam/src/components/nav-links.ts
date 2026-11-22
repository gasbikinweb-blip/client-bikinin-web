// Navigasi Paket Pro (multi halaman): ringkas & sejajar 1 baris bahkan saat browser di-zoom 120%
export const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/katalog-gorden', label: 'Katalog Gorden' },
  { href: '/blinds-wallpaper', label: 'Blinds & Wallpaper' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/faq', label: 'FAQ' },
  { href: '/#kontak', label: 'Kontak' },
] as const;

export type NavHref = (typeof navLinks)[number]['href'];
