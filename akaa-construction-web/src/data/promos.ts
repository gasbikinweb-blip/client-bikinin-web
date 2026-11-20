// Promo aktif. Promo yang sudah lewat endDate otomatis disembunyikan saat build.
import type { Promo } from './types';

export const promos: readonly Promo[] = [
  {
    id: 'cctv-september-2026',
    title: 'Free Unit CCTV',
    // Dari caption "Promo September" (24–30 Sep 2026)
    terms: [
      'Berlaku untuk jasa bangun rumah & renovasi', // TODO: konfirmasi syarat promo
      'Termasuk free konsultasi & survei lokasi',
    ],
    startDate: '2026-09-01',
    endDate: '2026-09-30', // TODO: perbarui bila promo diperpanjang
  },
];

/** Promo yang masih berlaku pada tanggal build */
export function activePromos(today = new Date().toISOString().slice(0, 10)) {
  return promos.filter((p) => p.startDate <= today && today <= p.endDate);
}
