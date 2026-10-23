// Data solusi pemilihan gorden dan interior jendela per ruangan.
// TODO: verifikasi saran kombinasi produk dengan pemilik usaha.

export interface RoomSolution {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  recommendedProducts: readonly {
    slug: string;
    name: string;
    reason: string;
  }[];
  tips: readonly string[];
}

export const solutions: readonly RoomSolution[] = [
  {
    id: 'ruang-tamu',
    name: 'Ruang Tamu',
    subtitle: 'Kesan pertama yang hangat, terang, dan berwibawa',
    description:
      'Ruang tamu adalah wajah utama rumah Anda. Kombinasi gorden custom atau minimalis dengan vitrase putih (double track) sangat direkomendasikan agar cahaya siang tetap masuk dengan lembut tanpa mengurangi privasi keluarga.',
    image: {
      src: '/projects/gorden-minimalis-krem-ruang-tamu-modern-01.webp',
      alt: 'Pemasangan gorden minimalis krem dan vitrase putih di ruang tamu modern',
    },
    recommendedProducts: [
      {
        slug: 'gorden-minimalis',
        name: 'Gorden Minimalis Smokring',
        reason: 'Memberikan lipatan vertikal yang bersih dan serasi dengan sofa modern.',
      },
      {
        slug: 'gorden-vitrase',
        name: 'Gorden Vitrase Putih',
        reason: 'Menyaring terik matahari siang sambil menjaga privasi dari jalan depan rumah.',
      },
      {
        slug: 'gorden-custom',
        name: 'Gorden Custom Plafon Tinggi',
        reason: 'Ideal untuk ruang tamu dengan plafon tinggi atau gaya klasik mewah.',
      },
    ],
    tips: [
      'Pasang rell gorden mendekati plafon agar ruangan tampak lebih tinggi dan megah.',
      'Pilih warna netral hangat seperti krem, mocca, taupe, atau abu-abu muda yang menyatu dengan warna dinding.',
    ],
  },
  {
    id: 'ruang-keluarga',
    name: 'Ruang Keluarga & Ruang TV',
    subtitle: 'Nyaman berkumpul tanpa silau di layar televisi',
    description:
      'Ruang keluarga membutuhkan suasana yang santai di siang hari sekaligus bebas pantulan cahaya matahari pada layar TV. Gunakan gorden semi-blackout atau blackout dengan tekstur lembut yang mudah digeser.',
    image: {
      src: '/projects/gorden-blackout-abu-sofa-ruang-tamu-01.webp',
      alt: 'Gorden blackout abu-abu tua dengan vitrase putih di ruang keluarga ber-AC',
    },
    recommendedProducts: [
      {
        slug: 'gorden-blackout',
        name: 'Gorden Blackout',
        reason: 'Menghilangkan silau matahari pada layar TV dan menjaga kesejukan AC.',
      },
      {
        slug: 'gorden-vitrase',
        name: 'Gorden Vitrase Polos',
        reason: 'Tetap terang saat gorden utama dibuka di pagi dan sore hari.',
      },
      {
        slug: 'wallpaper-vinyl',
        name: 'Wallpaper Vinyl',
        reason: 'Mempercantik dinding backdrop TV agar serasi dengan warna gorden.',
      },
    ],
    tips: [
      'Gunakan sistem double rell (gorden blackout + vitrase) untuk fleksibilitas pengaturan cahaya sepanjang hari.',
      'Pilih kain yang mudah dibersihkan karena ruang keluarga adalah area dengan aktivitas tertinggi.',
    ],
  },
  {
    id: 'kamar-tidur',
    name: 'Kamar Tidur Utama',
    subtitle: 'Privasi penuh dan keteduhan maksimal untuk istirahat berkualitas',
    description:
      'Kualitas tidur sangat dipengaruhi oleh keteduhan dan suhu kamar. Kain blackout tebal mampu menahan cahaya lampu jalan di malam hari maupun terik matahari pagi, serta meredam panas dari jendela kaca.',
    image: {
      src: '/projects/gorden-blackout-hitam-arang-vitrase-kamar-01.webp',
      alt: 'Gorden blackout hitam arang dengan vitrase putih di kamar tidur',
    },
    recommendedProducts: [
      {
        slug: 'gorden-blackout',
        name: 'Gorden Blackout Tebal',
        reason: 'Menahan cahaya matahari hingga maksimal agar tidur lebih nyenyak.',
      },
      {
        slug: 'gorden-custom',
        name: 'Gorden Custom Box Pelmet',
        reason: 'Menutup celah cahaya di bagian atas rell untuk kamar yang ekstra teduh.',
      },
      {
        slug: 'gorden-vitrase',
        name: 'Gorden Vitrase Lembut',
        reason: 'Memberikan cahaya pagi yang teduh tanpa terlihat dari luar kamar.',
      },
    ],
    tips: [
      'Lebarkan ukuran rell 15–20 cm di kiri dan kanan kusen agar tidak ada bocoran cahaya dari samping jendela.',
      'Warna gelap seperti charcoal, cokelat tua, biru dongker, atau taupe tua memberikan efek menenangkan.',
    ],
  },
  {
    id: 'pintu-jendela-besar',
    name: 'Pintu Kaca & Jendela Besar / Void',
    subtitle: 'Jatuhan kain tinggi yang simetris dan mudah dioperasikan',
    description:
      'Untuk pintu geser menuju taman, balkon, atau jendela void tinggi, dibutuhkan kain yang jatuh lurus berwibawa serta rell besi/aluminium yang kuat menahan beban bentangan lebar.',
    image: {
      src: '/projects/gorden-minimalis-abu-vitrase-pintu-besar-01.webp',
      alt: 'Gorden minimalis abu-abu dengan vitrase putih pada pintu kaca besar',
    },
    recommendedProducts: [
      {
        slug: 'gorden-custom',
        name: 'Gorden Custom Bentang Lebar',
        reason: 'Dibuat dengan bukaan tengah (center open) agar akses keluar-masuk pintu leluasa.',
      },
      {
        slug: 'rell-besi',
        name: 'Rell Besi & Bracket Heavy-Duty',
        reason: 'Menopang beban kain yang lebar dan tinggi agar rell tidak melengkung.',
      },
      {
        slug: 'vertical-blinds',
        name: 'Vertical Blinds',
        reason: 'Alternatif praktis untuk pintu kaca geser dengan pengaturan bilah vertikal.',
      },
    ],
    tips: [
      'Gunakan bukaan dua arah (kiri dan kanan) agar gorden tidak menumpuk berat di satu sisi pintu.',
      'Pastikan tinggi ujung bawah gorden sekitar 1–2 cm di atas lantai keramik agar tetap bersih saat lantai dipel.',
    ],
  },
  {
    id: 'kamar-anak',
    name: 'Kamar Anak & Area Belajar',
    subtitle: 'Cerah, aman, tidak mudah berdebu, dan nyaman untuk tidur siang',
    description:
      'Kamar anak membutuhkan pencahayaan yang cukup saat belajar di siang hari dan keteduhan saat jam tidur siang. Pilih bahan yang tidak mudah menyimpan debu serta warna yang ceria namun lembut di mata.',
    image: {
      src: '/projects/gorden-minimalis-biru-muda-pembatas-ruang-01.webp',
      alt: 'Gorden minimalis warna biru muda terang yang rapi dan bersih',
    },
    recommendedProducts: [
      {
        slug: 'gorden-minimalis',
        name: 'Gorden Minimalis Warna Cerah',
        reason: 'Desain simpel tanpa rumbai berlebih sehingga tidak menyimpan debu.',
      },
      {
        slug: 'roller-blinds',
        name: 'Roller Blinds',
        reason: 'Ringkas untuk jendela di dekat meja belajar anak.',
      },
      {
        slug: 'gorden-blackout',
        name: 'Gorden Blackout Pastel',
        reason: 'Membantu anak tidur siang dengan tenang tanpa silau matahari.',
      },
    ],
    tips: [
      'Pilih warna biru muda, krem hangat, atau abu-abu terang agar kamar terasa luas dan segar.',
      'Pastikan tali penarik tirai terpasang rapi pada pengait dinding agar aman bagi anak-anak.',
    ],
  },
  {
    id: 'ruko-kantor',
    name: 'Ruko, Kantor, & Dapur Bersih',
    subtitle: 'Fungsional, hemat tempat, tahan lembap, dan tampak profesional',
    description:
      'Untuk ruang kerja, ruko, klinik, maupun area dapur dan wastafel rumah, tirai jenis blinds memberikan tampilan yang jauh lebih ringkas, mudah dilap, dan tidak memakan ruang.',
    image: {
      src: '/projects/horizontal-blinds-abu-dapur-01.webp',
      alt: 'Pemasangan horizontal blinds abu-abu rapi pada jendela ruangan',
    },
    recommendedProducts: [
      {
        slug: 'horizontal-blinds',
        name: 'Horizontal Blinds',
        reason: 'Tahan cipratan air dan sangat mudah dilap untuk area dapur atau ruang kerja.',
      },
      {
        slug: 'vertical-blinds',
        name: 'Vertical Blinds',
        reason: 'Pilihan utama untuk jendela ruko dan ruang kantor yang lebar.',
      },
      {
        slug: 'roller-blinds',
        name: 'Roller Blinds Solar Screen',
        reason: 'Menahan panas matahari di ruko kaca tanpa menutup pandangan ke luar.',
      },
    ],
    tips: [
      'Gunakan Horizontal Blinds aluminium untuk jendela di dekat sink/wastafel dapur karena tahan lembap.',
      'Untuk kantor yang menghadap jalan raya, gunakan Vertical atau Roller Blinds warna netral (putih, abu-abu, krem).',
    ],
  },
] as const;
