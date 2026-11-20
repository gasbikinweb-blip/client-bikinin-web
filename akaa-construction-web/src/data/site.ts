// Profil usaha. Sosmed = akun AKAA OFFICIAL (permintaan pemilik). Sumber: bio IG, katalog WhatsApp Business, caption 2026.

export const site = {
  brand: 'AKAA',
  legalName: 'Aneka Kreasi Abadi', // TODO: konfirmasi badan usaha (PT/CV)
  subtitle: 'Construction & Interior',
  tagline: 'Mari ciptakan cerita di setiap sudut rumah Anda',
  area: 'Jabodetabek',
  areaDetail: ['Cibubur', 'Cileungsi', 'Bekasi', 'Bogor', 'Depok', 'Jakarta'],
  office:
    'Ruko Fresh Market FMR2 No. 16, Jl. Boulevard Kota Wisata, Ciangsana, Kec. Gn. Putri, Kab. Bogor, Jawa Barat 16968',
  email: 'akaa.official21@gmail.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Ruko+Fresh+Market+Kota+Wisata+Ciangsana+Gunung+Putri+Bogor',
  // Embed Google Maps (frame-src https://www.google.com sudah diizinkan di CSP)
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3965.219754765404!2d106.9575!3d-6.3656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993778fd1ca4b%3A0xf16de5b85a36c885!2sRuko%20Fresh%20Market%2C%20Jl.%20Boulevard%20Kota%20Wisata%2C%20Ciangsana%2C%20Kec.%20Gn.%20Putri%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016968!5e0!3m2!1sen!2sid!4v1794722647877!5m2!1sen!2sid',
  hours: 'Senin–Sabtu, 08.00–17.00 WIB' as string | undefined, // jam kantor standar (permintaan pemilik)
  social: {
    instagram: 'https://www.instagram.com/akaa.official21/',
    threads: 'https://www.threads.com/@akaa.official21',
    tiktok: 'https://www.tiktok.com/@akaa.official',
    facebook: 'https://www.facebook.com/share/1CNKyMNK4B/',
  },
} as const;

// Menu: 5 halaman (Paket Pro)
export const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/proyek', label: 'Proyek' },
  { href: '/kontak', label: 'Kontak' },
] as const;
