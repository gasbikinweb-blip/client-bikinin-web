// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6285882971295';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6285882971295).
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
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'AKAA Construction',
  description:
    'Jasa bangun rumah, renovasi, dan custom interior di Jabodetabek. Kantor di Cibubur. Free konsultasi, free survei lokasi, dan RAB transparan.',
  // TODO: ganti dengan domain asli
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://porto-akaa-construction.vercel.app',
  waNumber,
  waDisplay: '0858-8297-1295',
} as const;
