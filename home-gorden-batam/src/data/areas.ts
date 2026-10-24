// Data 12 kecamatan Kota Batam untuk halaman SEO lokal /area/[slug].
// Daftar kelurahan mengikuti pembagian administratif Kota Batam.
// TODO: ganti dengan data asli — paragraf pembuka & rekomendasi produk masih contoh umum,
// verifikasi area layanan dan perumahan yang pernah dipasang dengan pemilik usaha.

export interface Area {
  slug: string;
  /** Nama kecamatan tanpa awalan "Kec." */
  name: string;
  /** Kawasan populer yang sering diketik orang di Google (dipakai di judul) */
  popular: readonly string[];
  /** Kelurahan resmi di kecamatan ini */
  villages: readonly string[];
  /** Paragraf pembuka unik per daerah agar halaman tidak dianggap konten tipis */
  intro: string;
  /** Slug produk dari src/data/products.ts yang paling cocok untuk daerah ini */
  recommendedProducts: readonly string[];
  /** Kecamatan pulau (hinterland): jadwal survei menyesuaikan penyeberangan */
  island?: boolean;
}

const areas: readonly Area[] = [
  {
    slug: 'batam-kota',
    name: 'Batam Kota',
    popular: ['Batam Centre', 'Botania', 'Engku Putri'],
    villages: ['Baloi Permai', 'Belian', 'Sukajadi', 'Sungai Panas', 'Taman Baloi', 'Teluk Tering'],
    intro:
      'Batam Kota adalah pusat hunian dan perkantoran di Batam, mulai dari perumahan di Batam Centre dan Botania hingga apartemen serta ruko di sekitar Engku Putri. Banyak rumah di kawasan ini memiliki jendela lebar dan plafon tinggi, sehingga gorden custom dengan vitrase menjadi pilihan favorit, sedangkan apartemen dan kantor lebih praktis memakai roller blinds atau gorden blackout.',
    recommendedProducts: ['gorden-custom', 'gorden-blackout', 'roller-blinds'],
  },
  {
    slug: 'lubuk-baja',
    name: 'Lubuk Baja',
    popular: ['Nagoya', 'Penuin', 'Baloi Indah'],
    villages: ['Baloi Indah', 'Batu Selicin', 'Kampung Pelita', 'Lubuk Baja Kota', 'Tanjung Uma'],
    intro:
      'Lubuk Baja dengan kawasan Nagoya dan Penuin dikenal sebagai pusat bisnis, hotel, dan ruko di Batam. Untuk ruko, kantor, dan kamar hotel, vertical blinds serta gorden blackout membantu menahan panas matahari dan menjaga privasi, sementara hunian di Baloi Indah dan Batu Selicin cocok memakai gorden minimalis yang rapi.',
    recommendedProducts: ['vertical-blinds', 'gorden-blackout', 'gorden-minimalis'],
  },
  {
    slug: 'bengkong',
    name: 'Bengkong',
    popular: ['Bengkong Indah', 'Sadai', 'Tanjung Buntung'],
    villages: ['Bengkong Indah', 'Bengkong Laut', 'Sadai', 'Tanjung Buntung'],
    intro:
      'Bengkong adalah kawasan permukiman padat yang dekat dengan pusat kota. Rumah-rumah di Bengkong Indah, Sadai, dan Tanjung Buntung umumnya membutuhkan gorden minimalis yang hemat tempat serta vitrase untuk menjaga privasi dari jalan tanpa membuat ruangan gelap.',
    recommendedProducts: ['gorden-minimalis', 'gorden-vitrase', 'rell-besi'],
  },
  {
    slug: 'batu-ampar',
    name: 'Batu Ampar',
    popular: ['Jodoh', 'Batu Merah', 'Tanjung Sengkuang'],
    villages: ['Batu Merah', 'Kampung Seraya', 'Sungai Jodoh', 'Tanjung Sengkuang'],
    intro:
      'Batu Ampar mencakup kawasan pelabuhan, pergudangan, dan permukiman di Sungai Jodoh, Batu Merah, hingga Tanjung Sengkuang. Kantor dan gudang di area ini cocok memakai vertical atau horizontal blinds yang mudah dibersihkan, sedangkan rumah tinggal bisa memilih gorden blackout untuk meredam terik dan kebisingan.',
    recommendedProducts: ['vertical-blinds', 'horizontal-blinds', 'gorden-blackout'],
  },
  {
    slug: 'sekupang',
    name: 'Sekupang',
    popular: ['Tiban', 'Patam Lestari', 'Marina'],
    villages: [
      'Patam Lestari',
      'Sungai Harapan',
      'Tanjung Pinggir',
      'Tanjung Riau',
      'Tiban Baru',
      'Tiban Indah',
      'Tiban Lama',
    ],
    intro:
      'Sekupang dengan kawasan Tiban yang luas adalah salah satu daerah perumahan terbesar di Batam. Rumah keluarga di Tiban dan Patam Lestari banyak memilih gorden custom dan vitrase untuk ruang tamu, sedangkan rumah menghadap laut di sekitar Tanjung Riau dan Tanjung Pinggir cocok memakai gorden blackout untuk menahan silau sore.',
    recommendedProducts: ['gorden-custom', 'gorden-vitrase', 'gorden-blackout'],
  },
  {
    slug: 'batu-aji',
    name: 'Batu Aji',
    popular: ['Tanjung Uncang', 'Buliang', 'Kibing'],
    villages: ['Bukit Tempayan', 'Buliang', 'Kibing', 'Tanjung Uncang'],
    intro:
      'Batu Aji berkembang pesat dengan banyak perumahan baru di Buliang, Kibing, dan Bukit Tempayan, serta kawasan industri galangan kapal di Tanjung Uncang. Untuk rumah baru, paket gorden minimalis lengkap dengan rell besi menjadi pilihan praktis, sementara mes dan kantor industri cocok memakai vertical blinds.',
    recommendedProducts: ['gorden-minimalis', 'rell-besi', 'vertical-blinds'],
  },
  {
    slug: 'sagulung',
    name: 'Sagulung',
    popular: ['Tembesi', 'Dapur 12', 'Sei Langkai'],
    villages: [
      'Sagulung Kota',
      'Sungai Binti',
      'Sungai Langkai',
      'Sungai Lekop',
      'Sungai Pelunggut',
      'Tembesi',
    ],
    intro:
      'Sagulung adalah kecamatan dengan penduduk terbanyak di Batam, dengan permukiman yang tersebar dari Tembesi, Dapur 12, hingga Sungai Langkai. Gorden minimalis dan gorden blackout menjadi pilihan populer karena harganya bersahabat, mudah dirawat, dan efektif menahan panas matahari siang.',
    recommendedProducts: ['gorden-minimalis', 'gorden-blackout', 'gorden-vitrase'],
  },
  {
    slug: 'sei-beduk',
    name: 'Sei Beduk',
    popular: ['Tanjung Piayu', 'Muka Kuning', 'Mangsang'],
    villages: ['Duriangkang', 'Mangsang', 'Muka Kuning', 'Tanjung Piayu'],
    intro:
      'Sei Beduk mencakup kawasan industri Muka Kuning serta perumahan di Tanjung Piayu, Mangsang, dan Duriangkang. Kantor dan dormitori di kawasan industri cocok memakai vertical blinds yang tahan lama, sedangkan rumah keluarga di Piayu banyak memilih gorden minimalis dan roller blinds untuk dapur.',
    recommendedProducts: ['vertical-blinds', 'gorden-minimalis', 'roller-blinds'],
  },
  {
    slug: 'nongsa',
    name: 'Nongsa',
    popular: ['Batu Besar', 'Kabil', 'Punggur'],
    villages: ['Batu Besar', 'Kabil', 'Ngenang', 'Sambau'],
    intro:
      'Nongsa dikenal dengan kawasan resort, villa tepi pantai, serta perumahan di Batu Besar dan Kabil. Hunian dekat laut mendapat sinar matahari yang terik, sehingga kombinasi gorden blackout dan vitrase sangat cocok untuk menjaga ruangan tetap sejuk, sementara villa dan resort sering memilih gorden custom yang tampak mewah.',
    recommendedProducts: ['gorden-custom', 'gorden-blackout', 'gorden-vitrase'],
  },
  {
    slug: 'galang',
    name: 'Galang',
    popular: ['Barelang', 'Rempang', 'Sembulang'],
    villages: [
      'Air Raja',
      'Galang Baru',
      'Karas',
      'Pulau Abang',
      'Rempang Cate',
      'Sembulang',
      'Sijantung',
      'Subang Mas',
    ],
    intro:
      'Galang mencakup gugusan pulau di kawasan Barelang, termasuk Rempang dan Sembulang, yang banyak dihuni rumah warga serta penginapan wisata. Untuk rumah dan homestay, gorden minimalis dan gorden blackout praktis dipasang serta tahan terhadap udara laut.',
    recommendedProducts: ['gorden-minimalis', 'gorden-blackout', 'rell-besi'],
    island: true,
  },
  {
    slug: 'bulang',
    name: 'Bulang',
    popular: ['Setokok', 'Pulau Buluh', 'Temoyong'],
    villages: [
      'Batu Legong',
      'Bulang Lintang',
      'Pantai Gelam',
      'Pulau Buluh',
      'Pulau Setokok',
      'Temoyong',
    ],
    intro:
      'Bulang adalah kecamatan kepulauan di selatan Batam dengan permukiman di Pulau Buluh, Setokok, dan Temoyong. Kami melayani pemasangan gorden minimalis dan vitrase untuk rumah tinggal, dengan jadwal survei yang disesuaikan bersama pelanggan.',
    recommendedProducts: ['gorden-minimalis', 'gorden-vitrase', 'rell-besi'],
    island: true,
  },
  {
    slug: 'belakang-padang',
    name: 'Belakang Padang',
    popular: ['Pulau Penawar Rindu', 'Sekanak Raya', 'Pulau Terong'],
    villages: ['Kasu', 'Pecong', 'Pemping', 'Pulau Terong', 'Sekanak Raya', 'Tanjung Sari'],
    intro:
      'Belakang Padang, yang dikenal sebagai Pulau Penawar Rindu, adalah kecamatan kepulauan yang dekat dengan Singapura. Untuk rumah warga di Sekanak Raya, Tanjung Sari, dan pulau sekitarnya, kami menyediakan gorden minimalis dan gorden blackout dengan jadwal survei yang disesuaikan.',
    recommendedProducts: ['gorden-minimalis', 'gorden-blackout', 'gorden-vitrase'],
    island: true,
  },
];

export function getAllAreas(): readonly Area[] {
  return areas;
}

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

/** Nama pendek untuk judul, mis. "Batam Kota & Batam Centre" */
export function areaHeadline(area: Area): string {
  return `${area.name} & ${area.popular[0]}`;
}
