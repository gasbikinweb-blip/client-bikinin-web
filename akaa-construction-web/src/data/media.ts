// Konten dari Instagram AKAA (@akaa.construction, 2026): klip video, katalog material, dan brosur.
// Klip dipotong ~8 detik tanpa suara dari video IG asli (ffmpeg), poster = frame video.

export type Reel = {
  slug: string;
  title: string;
  place: string;
  /** Format YYYY-MM-DD, tanggal posting IG */
  date: string;
  /** Rasio asli klip: portrait 9:16 atau landscape 4:3 */
  orientation: 'portrait' | 'landscape';
  /** Slug proyek terkait (modal /#proyek-[slug]) */
  project?: string;
};

export const reels: readonly Reel[] = [
  {
    slug: 'kolam-renang-sn-house',
    title: 'Area kolam renang',
    place: 'SN House, Rancamaya',
    date: '2026-10-19',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'sn-house-17-oktober',
    title: 'Plester & finishing dalam',
    place: 'SN House, Rancamaya',
    date: '2026-10-17',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'sn-house-26-september',
    title: 'Progress dinding villa',
    place: 'SN House, Rancamaya',
    date: '2026-09-26',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'piping-wiring-sn-house',
    title: 'Instalasi piping & wiring',
    place: 'SN House, Rancamaya',
    date: '2026-09-22',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'atap-upvc-sn-house',
    title: 'Rangka atap UPVC',
    place: 'SN House, Rancamaya',
    date: '2026-09-22',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'renovasi-dapur-harvest-city',
    title: 'Renovasi dapur',
    place: 'Harvest City, Cileungsi',
    date: '2026-08-26',
    orientation: 'landscape',
    project: 'renovasi-harvest-city',
  },
  {
    slug: 'sn-house-23-september',
    title: 'Progress villa 2 lantai',
    place: 'SN House, Rancamaya',
    date: '2026-09-23',
    orientation: 'landscape',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'bangun-rumah-agustus',
    title: 'Struktur & perancah',
    place: 'Jabodetabek',
    date: '2026-08-11',
    orientation: 'landscape',
  },
  {
    slug: 'sn-house-juli',
    title: 'Pembesian dak lantai',
    place: 'SN House, Rancamaya',
    date: '2026-07-19',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
  {
    slug: 'sn-house-awal',
    title: 'Pembesian struktur awal',
    place: 'Rancamaya Golf, Bogor',
    date: '2026-05-24',
    orientation: 'portrait',
    project: 'sn-house-rancamaya',
  },
];

export type CatalogItem = {
  id: string;
  name: string;
  tag: string;
  text: string;
  /** Harga hanya bila tertulis di katalog/poster resmi AKAA */
  price?: { amount: number; unit: string; note?: string };
  points: readonly string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Isian jumlah di tab "Pesan Material"; tanpa unit = cukup deskripsi pekerjaan */
  order: { unit?: string; qtyLabel?: string; placeholder: string };
};

export const catalog: readonly CatalogItem[] = [
  {
    id: 'bata-merah-jumbo',
    name: 'Bata Merah Jumbo',
    tag: 'Material',
    text: 'Bata merah ukuran jumbo yang kuat, tahan lama, dan lebih efisien untuk dinding.',
    // Sumber: katalog WhatsApp Business (IDR 1,000) & poster IG 24 Sep 2026
    price: { amount: 1000, unit: 'pcs', note: 'Belum termasuk ongkir' },
    points: ['Ukuran ±22 × 10 × 8 cm', 'Kirim se-Jabodetabek', 'Kokoh & tahan lama'],
    image: {
      src: '/images/katalog/bata-merah.webp',
      alt: 'Tumpukan bata merah jumbo',
      width: 480,
      height: 280,
    },
    order: { unit: 'pcs', qtyLabel: 'Jumlah bata (pcs)', placeholder: 'mis. 5000' },
  },
  {
    id: 'beton-readymix',
    name: 'Beton Readymix & Concrete Pump',
    tag: 'Material',
    text: 'Suplai beton readymix lengkap dengan concrete pump untuk pengecoran dak, kolom, dan lantai.',
    points: ['Truk mixer + concrete pump', 'Untuk rumah & ruko', 'Area Jabodetabek'],
    image: {
      src: '/images/katalog/readymix.webp',
      alt: 'Truk concrete pump dan mixer readymix AKAA di lokasi proyek',
      width: 960,
      height: 720,
    },
    order: { unit: 'm³', qtyLabel: 'Volume beton (m³)', placeholder: 'mis. 12' },
  },
  {
    id: 'granit-marmer',
    name: 'Granit & Marmer',
    tag: 'Material',
    text: 'Cari granit atau marmer untuk lantai, dinding, dan meja dapur? Konsultasikan motif dan ukurannya.',
    points: ['Lantai, dinding & meja dapur', 'Bisa sekalian pemasangan'],
    image: {
      src: '/images/katalog/granit-marmer.webp',
      alt: 'Toko marmer dan granit mitra AKAA',
      width: 720,
      height: 404,
    },
    order: { unit: 'm²', qtyLabel: 'Luas area (m²)', placeholder: 'mis. 40' },
  },
  {
    id: 'bongkaran-puing',
    name: 'Jasa Bongkaran & Buang Puing',
    tag: 'Jasa',
    text: 'Bongkar bangunan lama dan angkut puing dengan cepat, aman, dan bersih. Survei lokasi gratis.',
    points: [
      'Rumah, ruko, gudang, pabrik',
      'Excavator & dump truck',
      'Buang puing ke tempat resmi',
    ],
    image: {
      src: '/images/katalog/bongkaran.webp',
      alt: 'Excavator membongkar bangunan lama',
      width: 290,
      height: 280,
    },
    order: { placeholder: 'mis. bongkar rumah 1 lantai ±60 m², akses truk masuk' },
  },
];

export type Poster = {
  src: string;
  alt: string;
  title: string;
  /** Id katalog: tombol membuka tab Pesan Material; kosong = tab Konsultasi */
  order?: string;
};

export const posters: readonly Poster[] = [
  {
    src: '/posters/jasa-konstruksi-interior.webp',
    title: 'Jasa Konstruksi & Interior',
    alt: 'Brosur AKAA Jasa Konstruksi & Interior: rumah tinggal, gedung & ruko, renovasi, desain interior',
  },
  {
    src: '/posters/bata-merah-jumbo.webp',
    title: 'Bata Merah Jumbo Rp1.000/pcs',
    order: 'bata-merah-jumbo',
    alt: 'Brosur Bata Merah Jumbo harga Rp1.000 per pcs, ukuran 22 x 10 x 8 cm, kirim Jabodetabek',
  },
  {
    src: '/posters/bongkaran-buang-puing.webp',
    title: 'Jasa Bongkaran & Buang Puing',
    order: 'bongkaran-puing',
    alt: 'Brosur jasa bongkaran dan buang puing area Jabodetabek dengan excavator dan dump truck',
  },
];
