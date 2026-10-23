// Data katalog 9 jenis produk & layanan utama Home Gorden Batam.
// Semua deskripsi teknis, spesifikasi bahan, dan rekomendasi ruangan bersifat contoh umum.
// TODO: verifikasi detail bahan dan koleksi warna aktual dengan pemilik usaha.

export type CategorySlug = 'gorden-vitrase' | 'blinds' | 'wallpaper-aksesoris';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  shortSummary: string;
  description: string;
  suitableRooms: readonly string[];
  benefits: readonly string[];
  /** Minimal satu gambar; gambar pertama dipakai sebagai sampul */
  images: readonly [ProductImage, ...ProductImage[]];
  specs: {
    material: string;
    dimensions: string;
    colors: readonly string[];
    installation: string;
  };
  /** Harga dalam Rupiah. Dikosongkan karena semua harga mengikuti ukuran hasil survei */
  price?: number;
  featured: boolean;
}

export const categories: readonly Category[] = [
  {
    slug: 'gorden-vitrase',
    name: 'Gorden & Vitrase',
    description:
      'Koleksi gorden custom, minimalis, blackout, dan vitrase siang yang dijahit sesuai ukuran jendela.',
  },
  {
    slug: 'blinds',
    name: 'Tirai Blinds',
    description:
      'Tirai modern praktis untuk kantor, dapur, dan hunian: vertical blinds, horizontal blinds, dan roller blinds.',
  },
  {
    slug: 'wallpaper-aksesoris',
    name: 'Wallpaper & Rell Besi',
    description:
      'Pelengkap interior dinding wallpaper vinyl serta komponen rell besi, bracket, dan aksesori gorden.',
  },
];

// Pembuat daftar gambar: /products/<slug>/01.webp, 02.webp, ...
function gallery(slug: string, alts: readonly [string, ...string[]]) {
  const [first, ...rest] = alts.map((alt, i) => ({
    src: `/products/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt,
  }));
  return [first!, ...rest] as const;
}

// Katalog 9 jenis produk & layanan utama Home Gorden Batam.
const products: readonly Product[] = [
  {
    slug: 'gorden-custom',
    name: 'Gorden Custom',
    category: 'gorden-vitrase',
    shortSummary:
      'Dijahit khusus mengikuti tinggi plafon, lebar jendela, dan gaya interior rumah Anda.',
    description:
      'Layanan pembuatan gorden custom yang sepenuhnya menyesuaikan ukuran jendela, pintu kaca, maupun void plafon tinggi di rumah Anda. Tersedia berbagai gaya jahitan mulai dari lipatan klasik, gelombang rapi, hingga model poni elegan (seperti model Spanyol) yang dipadukan dengan vitrase dan tali tassel serasi.',
    suitableRooms: [
      'Ruang Tamu Utama',
      'Kamar Tidur Utama',
      'Jendela Void Plafon Tinggi',
      'Villa & Hotel',
    ],
    benefits: [
      'Ukuran pas presisi hingga ke lantai atau sesuai tinggi kusen',
      'Bebas memilih kombinasi kain utama, vitrase, poni, dan tassel',
      'Jatuhan gelombang kain dihitung proporsional agar tampak mewah',
    ],
    images: gallery('gorden-custom', [
      'Pemasangan gorden custom krem tinggi dengan vitrase putih di ruang tamu plafon tinggi',
      'Sudut ruang tamu dengan gorden custom krem dan vitrase siang yang rapi',
      'Gorden custom smokring warna emas lengkap dengan poni klasik dan ornamen kipas di sudut ruangan',
      'Gorden custom plisket warna krem keemasan dengan boks pelmet putih dan vitrase di kamar tidur',
      'Gorden custom boks pelmet krem tertutup rapi menutup penuh jendela kamar tidur',
      'Gorden custom warna krem muda dengan vitrase plisket putih dan tassel di kamar utama',
      'Gorden custom warna abu-abu tua dan vitrase putih menjuntai tinggi di area pintu utama',
      'Dua jendela sudut ruang tamu menggunakan gorden custom warna emas dan vitrase putih',
      'Gorden custom cokelat tua dengan vitrase putih di antara lemari kamar tidur',
      'Inspirasi gorden custom gelombang warna taupe dengan vitrase putih di area tangga',
      'Referensi gorden custom model Spanyol klasik dengan poni bertumpuk mewah',
    ]),
    specs: {
      material: 'Pilihan kain blackout, dimout, linen look, atau beludru halus berkualitas',
      dimensions: 'Custom sesuai pengukuran survei di lokasi',
      colors: ['Krem Emas', 'Cokelat Tua', 'Taupe', 'Abu-abu', 'Biru Dongker'],
      installation: 'Termasuk pengukuran, perakitan rell, dan pemasangan rapi di lokasi',
    },
    featured: true,
  },
  {
    slug: 'gorden-vitrase',
    name: 'Gorden Vitrase',
    category: 'gorden-vitrase',
    shortSummary:
      'Tirai tipis transparan untuk menyaring cahaya matahari siang sambil menjaga privasi ruangan.',
    description:
      'Gorden vitrase (sheer curtain) berfungsi menyaring terik matahari di siang hari agar ruangan tetap terang alami tanpa silau, sekaligus menghalangi pandangan langsung dari luar rumah. Sangat cocok dipasang berpasangan di balik gorden utama maupun dipasang tersendiri dengan model kupu-kupu pita pada jendela kaca.',
    suitableRooms: ['Ruang Tamu', 'Ruang Keluarga', 'Jendela Sudut / Kaca Mati', 'Kamar Tidur'],
    benefits: [
      'Membuat ruangan terasa terang, lembut, dan lapang di siang hari',
      'Menjaga privasi penghuni rumah dari pandangan luar di siang hari',
      'Tersedia model jatuh lurus minimalis maupun model ikat kupu-kupu',
    ],
    images: gallery('gorden-vitrase', [
      'Gorden vitrase putih polos model smokring yang rapi di ruang keluarga',
      'Gorden vitrase putih model kupu-kupu dengan pita emas pada tiga jendela tinggi',
      'Perpaduan vitrase putih bersih di balik gorden smokring warna taupe',
      'Gorden vitrase putih motif bordir berpadu gorden smokring silver abu-abu pada jendela kamar',
      'Vitrase putih plisket di balik gorden smokring warna emas pada jendela tinggi samping pintu',
      'Perpaduan vitrase putih bersih dan gorden smokring krem muda pada ruangan berlantai kayu',
    ]),
    specs: {
      material: 'Voile putih halus, sheer bertekstur lembut, atau vitrase motif elegan',
      dimensions: 'Custom mengikuti lebar dan tinggi jendela/pintu',
      colors: ['Putih Bersih', 'Broken White / Krem Muda', 'Kombinasi Pita Emas'],
      installation: 'Dipasang pada rell tersendiri (double track) atau stik kupu-kupu',
    },
    featured: true,
  },
  {
    slug: 'gorden-minimalis',
    name: 'Gorden Minimalis',
    category: 'gorden-vitrase',
    shortSummary:
      'Desain smokring dan plisket modern yang bersih, praktis, dan serasi untuk perumahan masa kini.',
    description:
      'Pilihan favorit untuk rumah modern dan perumahan di Batam. Gorden minimalis menonjolkan garis gelombang vertikal yang tegas dan bersih tanpa banyak ornamen rumit. Menggunakan ring smokring maupun kawat plisket yang mudah digeser, memberikan kesan ruangan yang rapi, lega, dan hangat.',
    suitableRooms: ['Ruang Tamu Minimalis', 'Ruang Keluarga', 'Kamar Tidur', 'Apartemen'],
    benefits: [
      'Tampilan modern dan bersih yang mudah menyatu dengan berbagai warna cat dinding',
      'Gelombang smokring teratur dan mudah dibuka-tutup setiap hari',
      'Perawatan lebih praktis dan tidak mudah menyimpan debu',
    ],
    images: gallery('gorden-minimalis', [
      'Gorden minimalis krem terang dengan vitrase putih dan sofa senada di ruang tamu modern',
      'Gorden minimalis abu-abu muda dengan vitrase putih pada pintu kaca besar',
      'Gorden minimalis cokelat keemasan model smokring pada pintu kaca berbingkai hitam',
      'Dua pasang gorden minimalis warna emas smokring yang serasi pada pintu kayu',
      'Gorden smokring minimalis warna emas gold tertutup rapi dengan lipatan gelombang simetris',
      'Gorden smokring warna cokelat terracotta berpadu vitrase putih dan tassel krem',
      'Gorden smokring cokelat muda dengan vitrase putih di ruang tamu keluarga',
      'Gorden minimalis plisket cokelat muda menjuntai tinggi dari plafon dengan vitrase putih',
      'Gorden smokring minimalis warna merah maroon berpadu vitrase putih dan sabuk emas',
      'Gorden smokring minimalis warna krem hangat tertutup rapi di ruang keluarga',
      'Gorden smokring cokelat kopi berpadu vitrase putih di sebelah sofa ruang tamu',
      'Gorden smokring minimalis warna biru muda keabuan sebagai penyekat ruangan yang rapi',
      'Gorden smokring minimalis abu-abu dengan vitrase putih dan dekorasi dinding daun emas',
      'Set gorden smokring abu-abu dengan poni atas pintu utama dan vitrase putih di ruang makan',
      'Gorden minimalis smokring warna mocca krem dengan vitrase pada jendela kaca lebar',
      'Gorden smokring minimalis warna cokelat susu dengan vitrase bermotif di ruang tamu',
      'Inspirasi gorden smokring minimalis warna kuning keemasan (mustard gold) dengan vitrase putih',
    ]),
    specs: {
      material: 'Kain semi-blackout dan blackout polos bertekstur halus',
      dimensions: 'Custom sesuai ukuran jendela satu daun, dua daun, atau pintu geser',
      colors: ['Krem Modern', 'Abu-abu Muda', 'Cokelat Keemasan', 'Mocca', 'Silver'],
      installation: 'Rell pipa smokring atau rell kotak aluminium',
    },
    featured: true,
  },
  {
    slug: 'gorden-blackout',
    name: 'Gorden Blackout',
    category: 'gorden-vitrase',
    shortSummary:
      'Menahan cahaya matahari dan meredam panas terik agar tidur lebih nyenyak dan AC lebih dingin.',
    description:
      'Dirancang khusus untuk iklim Batam yang cerah dan hangat. Kain gorden blackout memiliki tenunan rapat yang efektif menghalangi masuknya sinar matahari langsung serta membantu menahan hawa panas dari kaca jendela. Sangat ideal untuk kamar tidur, ruang TV, maupun ruangan ber-AC.',
    suitableRooms: [
      'Kamar Tidur Utama',
      'Kamar Anak',
      'Ruang Keluarga / TV',
      'Apartemen Hadap Barat/Timur',
    ],
    benefits: [
      'Menghalangi silau matahari secara optimal untuk kualitas istirahat lebih baik',
      'Membantu menjaga suhu ruangan tetap sejuk sehingga kerja AC lebih ringan',
      'Kain tebal, jatuh berwibawa, dan memberikan privasi penuh siang maupun malam',
    ],
    images: gallery('gorden-blackout', [
      'Gorden blackout abu-abu tua arang dengan vitrase putih di kamar tidur',
      'Gorden blackout abu-abu gelap dengan vitrase putih di ruang tamu ber-AC',
      'Gorden blackout abu-abu tua tinggi menutup area pintu dan jendela',
      'Gorden blackout abu-abu gelap model smokring pada dua sisi jendela sudut',
      'Gorden blackout smokring warna cokelat tinggi menutup pintu utama dan jendela ruang tamu',
      'Dua pasang gorden blackout warna cokelat tua dengan vitrase putih di ruang tamu klasik',
      'Gorden blackout warna cokelat tua dengan vitrase putih di area ruang makan keluarga',
      'Gorden blackout smokring warna abu-abu kebiruan yang tebal di kamar tidur',
      'Inspirasi gorden blackout cokelat penuh satu dinding dengan pencahayaan plafon LED hangat',
      'Gorden smokring blackout abu-abu tua berpadu vitrase putih pada jendela kamar ber-AC',
    ]),
    specs: {
      material: 'Kain blackout tebal bertekstur doff maupun satin lembut penahan cahaya',
      dimensions: 'Custom menutup penuh kusen jendela (disarankan lebih lebar 15–20 cm tiap sisi)',
      colors: [
        'Hitam Arang (Charcoal)',
        'Abu-abu Tua',
        'Biru Dongker (Navy)',
        'Cokelat Tua',
        'Krem Tebal',
      ],
      installation: 'Rell besi kokoh dengan bracket penahan beban kain tebal',
    },
    featured: true,
  },
  {
    slug: 'vertical-blinds',
    name: 'Vertical Blinds',
    category: 'blinds',
    shortSummary:
      'Tirai bilah vertikal yang rapi dan profesional untuk jendela ruko, kantor, dan bidang kaca lebar.',
    description:
      'Vertical blinds terdiri dari bilah-bilah vertikal yang dapat diputar untuk mengatur sudut masuknya cahaya maupun digeser ke samping layaknya tirai. Memberikan kesan formal, bersih, dan efisien untuk ruang kerja, ruko, klinik, maupun jendela besar di hunian modern.',
    suitableRooms: ['Ruko & Kantor', 'Ruang Rapat', 'Klinik & Instansi', 'Jendela Kaca Lebar'],
    benefits: [
      'Pengaturan arah cahaya sangat fleksibel dengan memutar bilah vertikal',
      'Tampilan ringkas, profesional, dan hemat ruang',
      'Cocok untuk bidang jendela yang lebar maupun tinggi',
    ],
    images: gallery('vertical-blinds', [
      'Vertical blinds warna putih bersih terpasang rapi pada jendela kaca besar berbingkai hitam',
      'Referensi tirai blinds putih bersih yang presisi menutup bidang jendela ruang kerja dan kantor',
      'Referensi pemasangan tirai blinds warna abu-abu rapi pada jendela ruangan berlapis keramik putih',
    ]),
    specs: {
      material: 'Fabric polyester kaku anti-debu (pilihan dimout, blackout, atau sun screen)',
      dimensions: 'Custom mengikuti lebar dan tinggi bukaan jendela kantor/rumah',
      colors: ['Putih Bersih', 'Abu-abu Kantor', 'Krem Netral', 'Biru Dongker'],
      installation: 'Track kepala aluminium dengan rantai pengatur sudut dan tali geser',
    },
    featured: true,
  },
  {
    slug: 'horizontal-blinds',
    name: 'Horizontal Blinds',
    category: 'blinds',
    shortSummary:
      'Tirai bilah horizontal aluminium/kayu yang tahan lembap, mudah dilap, dan praktis untuk dapur atau kerja.',
    description:
      'Horizontal blinds (Venetian blinds) memiliki bilah mendatar yang dilengkapi stik pemutar untuk mengatur celah cahaya dan tali penarik untuk menaikkan tirai. Karena bahannya tahan cipratan air dan mudah dibersihkan, produk ini sangat populer untuk jendela dapur, dekat wastafel, kamar mandi kering, maupun ruang kerja.',
    suitableRooms: [
      'Dapur & Area Wastafel',
      'Ruang Kerja / Kantor',
      'Jendela Kamar Minimalis',
      'Area Servis',
    ],
    benefits: [
      'Tahan lembap dan mudah dibersihkan cukup dengan lap kering/lembap',
      'Pengaturan cahaya presisi lewat stik pemutar akrilik yang ringan',
      'Ukuran pas masuk di dalam maupun di luar cekungan kusen jendela',
    ],
    images: gallery('horizontal-blinds', [
      'Horizontal blinds putih minimalis yang terpasang rapi pada dinding krem',
      'Horizontal blinds warna krem terpasang di atas meja wastafel dapur',
      'Horizontal blinds warna abu-abu modern pada dinding keramik bata putih',
      'Detail stik pemutar akrilik dan bilah horizontal blinds abu-abu yang presisi',
      'Detail kemiringan bilah horizontal blinds warna cokelat motif kayu hangat penahan terik matahari',
    ]),
    specs: {
      material: 'Bilah aluminium ringan anti-karat atau motif serat kayu pilihan',
      dimensions: 'Lebar bilah 25mm / 50mm, ukuran kotak custom sesuai jendela',
      colors: ['Putih Minimalis', 'Krem Hangat', 'Abu-abu Perak', 'Cokelat Motif Kayu'],
      installation: 'Bracket atas/samping dengan stik pemutar dan pengunci tali otomatis',
    },
    featured: true,
  },
  {
    slug: 'roller-blinds',
    name: 'Roller Blinds',
    category: 'blinds',
    shortSummary:
      'Tirai gulung satu lembar yang ekstra ringkas, modern, dan hemat tempat untuk apartemen & kantor.',
    description:
      'Roller blinds menggulung kain secara rapi ke tabung atas menggunakan tarikan rantai samping (chain system). Memberikan tampilan jendela yang sangat bersih dan rata saat ditutup, serta nyaris tidak terlihat saat digulung penuh ke atas.',
    suitableRooms: ['Apartemen', 'Ruko & Kafe', 'Ruang Kerja', 'Kamar Tidur Minimalis'],
    benefits: [
      'Sangat hemat tempat dan tidak memakan ruang di sekitar jendela',
      'Tersedia bahan solar screen (menahan silau tapi tetap bisa melihat ke luar) maupun blackout',
      'Mekanisme gulung halus dan mudah dioperasikan',
    ],
    images: gallery('roller-blinds', [
      'Roller blinds warna cokelat hangat dua lajur dengan rantai tarikan samping yang rapi',
      'Pemasangan roller blinds warna abu-abu pada deretan jendela ruang kerja kantor modern',
    ]),
    specs: {
      material: 'Pilihan kain blackout, dimout, atau solar screen penahan sinar UV',
      dimensions: 'Custom per bidang kaca jendela',
      colors: ['Cokelat Hangat', 'Abu-abu Kantor', 'Krem', 'Putih', 'Hitam Arang'],
      installation: 'Tabung roller aluminium dengan rantai tarikan samping',
    },
    featured: true,
  },
  {
    slug: 'wallpaper-vinyl',
    name: 'Wallpaper Vinyl',
    category: 'wallpaper-aksesoris',
    shortSummary:
      'Pelapis dinding bertekstur elegan yang tahan lembap, mudah dibersihkan, dan serasi dengan gorden.',
    description:
      'Selain gorden, kami melayani pengadaan dan pemasangan wallpaper vinyl untuk menyempurnakan tampilan dinding ruang tamu maupun kamar tidur Anda. Permukaan berlapis vinyl membuat dinding tampak lebih hidup, menutup retak rambut pada tembok, serta lebih mudah dibersihkan dibanding cat biasa.',
    suitableRooms: [
      'Dinding Fokus Ruang Tamu',
      'Backdrop Kepala Tempat Tidur',
      'Ruang Keluarga',
      'Ruko & Kantor',
    ],
    benefits: [
      'Warna dan tekstur dinding langsung selaras dengan gorden yang dipasang',
      'Permukaan vinyl tahan lama dan mudah dilap jika terkena noda ringan',
      'Pemasangan cepat dan rapi dengan sambungan motif yang presisi',
    ],
    images: gallery('wallpaper-vinyl', [
      'Perpaduan gorden smokring silver dengan dinding beraksen wallpaper garis vertikal',
      'Suasana ruang tamu hangat dengan dinding bernuansa krem lembut dan gorden senada',
    ]),
    specs: {
      material: 'Wallpaper berbahan dasar tebal dengan lapisan permukaan PVC/Vinyl berkualitas',
      dimensions: 'Dijual per roll dan dihitung sesuai luas bidang dinding saat survei',
      colors: ['Krem Tekstur Linen', 'Motif Garis Klasik', 'Abu-abu Modern', 'Aksen Emas Lembut'],
      installation: 'Termasuk lem wallpaper khusus dan pemasangan rapi di lokasi',
    },
    featured: false,
  },
  {
    slug: 'rell-besi',
    name: 'Rell Besi & Aksesori',
    category: 'wallpaper-aksesoris',
    shortSummary:
      'Batang rell gorden kokoh, tutup endcup dekoratif, bracket, dan pengait dengan pilihan warna mewah.',
    description:
      'Gorden yang indah membutuhkan penopang yang kuat dan serasi. Kami menyediakan berbagai pilihan batang rell besi/aluminium (ulir, garis, maupun polos) lengkap dengan tutup ujung (endcup) bermotif klasik hingga minimalis, bracket penahan kokoh, roda plisket, serta pengait tali (hook/tassel).',
    suitableRooms: [
      'Semua Jenis Jendela & Pintu',
      'Penggantian Rell Lama',
      'Gorden Satu Lapis & Dua Lapis',
    ],
    benefits: [
      'Batang pipa tebal yang tidak mudah melengkung saat menahan gorden blackout berat',
      'Banyak pilihan model tutup ujung (endcup) dan warna (emas, hitam, perunggu, silver, cokelat)',
      'Bisa dipesan sekaligus saat pasang gorden baru maupun untuk perbaikan rell lama',
    ],
    images: gallery('rell-besi', [
      'Koleksi batang rell besi gorden berbagai motif ulir dan warna emas, perak, hitam, serta cokelat',
      'Katalog pilihan tutup ujung rell gorden (endcup) minimalis dalam warna bronze, hitam, putih, dan coffee',
    ]),
    specs: {
      material: 'Besi berlapis coating anti-karat & aluminium tebal berkualitas',
      dimensions: 'Dipotong sesuai lebar jendela (tersedia single track & double track)',
      colors: [
        'Gold / Emas',
        'Black / Hitam Doff',
        'Bronze / Perunggu',
        'Silver / Perak',
        'Coffee / Cokelat Tua',
      ],
      installation: 'Dipasang dengan sekrup dan fischer kuat ke dinding beton atau kusen',
    },
    featured: true,
  },
];

export function getAllProducts(): readonly Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): readonly Product[] {
  return products.filter((p) => p.featured);
}

/** Kategori yang memiliki minimal satu produk */
export function getCategories(): readonly Category[] {
  return categories.filter((c) => products.some((p) => p.category === c.slug));
}

export function getCategory(slug: CategorySlug): Category {
  return categories.find((c) => c.slug === slug)!;
}
