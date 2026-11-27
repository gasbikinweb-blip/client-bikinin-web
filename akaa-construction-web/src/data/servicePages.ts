// Layanan yang punya halaman sendiri (/layanan/[slug]): hanya yang sudah ada proyek nyatanya.
// Dipakai halaman layanan, halaman area, footer, dan sitemap.
import type { WorkType } from './types';

export const servicePages = [
  {
    slug: 'bangun-rumah',
    serviceId: 'bangun-rumah',
    workType: 'bangun-baru',
    keyword: 'Jasa Bangun Rumah',
  },
  {
    slug: 'renovasi',
    serviceId: 'renovasi',
    workType: 'renovasi',
    keyword: 'Jasa Renovasi Rumah',
    // Konten lokal untuk kata kunci "jasa renovasi rumah cibubur" (kantor AKAA di Kota Wisata, Cibubur)
    local: {
      title: 'Jasa Renovasi Rumah Cibubur',
      intro:
        'Mencari jasa renovasi rumah di Cibubur? Kantor AKAA Construction ada di Ruko Fresh Market Kota Wisata, Cibubur, jadi tim kami bisa cepat datang untuk survei ke rumah Anda di Cibubur, Kota Wisata, Ciangsana, Cileungsi, Harvest City, sampai Jatisampurna. Konsultasi dan survei lokasi gratis, lalu Anda mendapat RAB yang jelas sebelum pekerjaan dimulai.',
      heading: 'Renovasi rumah di Cibubur dan sekitarnya',
      items: [
        'Tambah lantai dan tambah ruang (kamar, carport, dapur belakang)',
        'Renovasi dapur dan kitchen set',
        'Perbaikan atap bocor dan rembesan dinding',
        'Ganti lantai: keramik, granit, atau parket',
        'Renovasi fasad dan tampak depan rumah',
        'Cat ulang interior dan eksterior',
      ],
      faqs: [
        {
          q: 'Apakah AKAA melayani renovasi rumah di Cibubur?',
          a: 'Ya. Kantor kami di Ruko Fresh Market Kota Wisata, Cibubur, sehingga survei ke Cibubur, Kota Wisata, Ciangsana, Cileungsi, dan Harvest City bisa dijadwalkan cepat.',
        },
        {
          q: 'Berapa biaya renovasi rumah di Cibubur?',
          a: 'Biaya tergantung luas, jenis pekerjaan, dan material. Setelah survei gratis, kami buatkan RAB rinci agar Anda tahu biayanya sebelum pekerjaan dimulai.',
        },
      ],
    },
  },
  {
    slug: 'custom-interior',
    serviceId: 'interior',
    workType: 'interior',
    keyword: 'Jasa Custom Interior',
  },
] as const satisfies readonly {
  slug: string;
  serviceId: string;
  workType: WorkType;
  keyword: string;
  local?: {
    title: string;
    intro: string;
    heading: string;
    items: readonly string[];
    faqs: readonly { q: string; a: string }[];
  };
}[];
