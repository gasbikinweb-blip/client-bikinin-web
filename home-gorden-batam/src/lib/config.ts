// Konfigurasi utama Home Gorden Batam.
// Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6282162725097';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6282162725097).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER ?? DEFAULT_WA_NUMBER);
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Gorden Interior Batam',
  legalOrLogoName: 'Home Gorden Batam',
  tagline: 'Gorden Rapi & Elegan untuk Rumah dan Bangunan Anda di Batam',
  description:
    'Jasa pembuatan dan pemasangan gorden custom, vitrase, gorden minimalis, blackout, vertical/horizontal/roller blinds, wallpaper vinyl, dan rell besi di Batam. Gratis survei dan pengukuran ke seluruh area Batam.',
  // TODO: ganti dengan domain production resmi setelah rilis
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gordeninteriorbatam.web.id',
  waNumber,
  waDisplay: '0821-6272-5097',
  instagram: 'https://www.instagram.com/homegordenbatam',
  instagramHandle: 'homegordenbatam',
  threads: 'https://www.threads.com/@homegordenbatam',
  threadsHandle: 'homegordenbatam',
  facebook: 'https://www.facebook.com/share/1C8WsRYZao/',
  facebookName: 'Gorden interior batam',
  email: 'info@homegordenbatam.com', // TODO: konfirmasi alamat email resmi toko
  address:
    'Legenda Villa Hang Lekir, Baloi Permai, Batam Kota, Kota Batam, Kepulauan Riau 29463',
  coordinates: {
    lat: 1.1016109,
    lng: 104.0565643,
  },
  mapsUrl: 'https://maps.app.goo.gl/n5PkeXiYGLTiHnmu5',
  // Street View lokasi toko (dari tombol Sematkan peta di Google Maps)
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!3m2!1sen!2sid!4v1792888333661!5m2!1sen!2sid!6m8!1m7!1sfJ5vrkkP7axmPhhCSsorHA!2m2!1d1.101572670971949!2d104.056705468921!3f168.9442961363974!4f-15.658532738708715!5f0.7820865974627469',
  serviceArea:
    'Seluruh Area Batam (Batam Centre, Nagoya, Lubuk Baja, Sekupang, Batu Aji, Tiban, Bengkong, Nongsa, Kabil, Muka Kuning, dan sekitarnya)',
  // TODO: konfirmasi jam operasional toko dengan pemilik usaha
  hours: [
    { day: 'Senin – Sabtu', time: '08.00 – 20.00 WIB', note: 'Layanan Konsultasi & Survei' }, // TODO: verifikasi jam buka
    { day: 'Minggu & Hari Libur', time: '09.00 – 17.00 WIB', note: 'Janji Temu Survei' }, // TODO: verifikasi jam buka Minggu
  ],
  // TODO: verifikasi tahun berdiri dan jumlah proyek dengan pemilik usaha
  stats: [
    { label: 'Layanan Survei', value: 'Gratis se-Batam', note: 'Datang bawa sampel bahan' },
    { label: 'Pilihan Produk', value: '9+ Kategori', note: 'Gorden, vitrase, blinds, wallpaper' },
    { label: 'Pengerjaan', value: 'Custom Presisi', note: 'Sesuai ukuran jendela & pintu' }, // TODO: verifikasi dengan pemilik usaha
    { label: 'Garansi Pasang', value: 'Rapi & Tepat', note: 'Dikerjakan teknisi berpengalaman' }, // TODO: verifikasi dengan pemilik usaha
  ],
  catalogPdfUrl: '/katalog-home-gorden-batam.pdf',
  catalogPdfName: 'Katalog-Home-Gorden-Batam.pdf',
} as const;
