// Data profil usaha, keunggulan, tahapan kerja, dan area layanan Home Gorden Batam.
import { siteConfig } from '@/lib/config';

export { siteConfig };

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
}

// 6 keunggulan utama di beranda
// TODO: verifikasi dengan pemilik usaha untuk setiap klaim operasional di bawah ini
export const advantages: readonly AdvantageItem[] = [
  {
    id: 'survei-gratis',
    title: 'Survei & Ukur Gratis se-Batam',
    description:
      'Tim kami datang langsung ke lokasi Anda di seluruh area Batam untuk mengukur jendela/pintu secara presisi tanpa biaya komitmen.',
  },
  {
    id: 'custom-presisi',
    title: 'Custom Sesuai Ukuran & Selera',
    description:
      'Setiap gorden dan blinds dijahit serta dirakit khusus mengikuti tinggi plafon, lebar jendela, dan gaya interior ruangan Anda.',
  },
  {
    id: 'pilihan-lengkap',
    title: 'Pilihan Produk Satu Pintu',
    description:
      'Tersedia lengkap mulai dari gorden custom, vitrase, minimalis, blackout, vertical/horizontal/roller blinds, wallpaper vinyl, hingga rell besi.',
  },
  {
    id: 'banyak-bahan',
    title: 'Bawa Sampel Bahan ke Lokasi',
    description:
      'Tidak perlu bingung membayangkan warna. Saat survei, kami membawakan katalog bahan agar Anda bisa mencocokkan langsung dengan warna dinding dan sofa.', // TODO: verifikasi dengan pemilik usaha
  },
  {
    id: 'pemasangan-rapi',
    title: 'Pemasangan Rapi & Bersih',
    description:
      'Dipasang oleh teknisi berpengalaman dengan gelombang jatuh gorden yang simetris, baut rell yang kokoh, dan area kerja yang tetap bersih.', // TODO: verifikasi dengan pemilik usaha
  },
  {
    id: 'respons-cepat',
    title: 'Konsultasi Mudah via WhatsApp',
    description:
      'Diskusikan kebutuhan rumah, apartemen, ruko, kantor, atau villa Anda langsung lewat WhatsApp dengan respons ramah dan transparan.',
  },
] as const;

export interface WorkStep {
  step: string;
  title: string;
  description: string;
}

// 4 langkah cara kerja
export const workSteps: readonly WorkStep[] = [
  {
    step: '01',
    title: 'Chat via WhatsApp',
    description:
      'Hubungi kami lewat WhatsApp untuk menyampaikan jenis ruangan, perkiraan jumlah jendela/pintu, dan jadwal kunjungan yang Anda inginkan.',
  },
  {
    step: '02',
    title: 'Survei Gratis & Pengukuran',
    description:
      'Tim kami datang ke lokasi Anda di Batam untuk mengukur jendela secara akurat sekaligus menunjukkan sampel kain, vitrase, atau blinds.',
  },
  {
    step: '03',
    title: 'Pilih Bahan & Penawaran',
    description:
      'Pilih bahan, warna, dan model yang paling pas dengan selera serta anggaran Anda. Kami susunkan rincian penawaran yang jelas dan transparan.',
  },
  {
    step: '04',
    title: 'Produksi & Pemasangan Rapi',
    description:
      'Setelah pesanan disepakati, gorden dijahit dengan rapi lalu dipasang langsung di lokasi Anda hingga siap mempercantik ruangan.',
  },
] as const;

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationEstimate: string;
  highlights: readonly string[];
}

// Daftar layanan untuk halaman /layanan
export const services: readonly ServiceItem[] = [
  {
    id: 'survei-pengukuran',
    title: 'Survei Gratis & Pengukuran Lokasi',
    subtitle: 'Layanan unggulan ke seluruh area Batam',
    description:
      'Kami memahami bahwa ukuran jendela setiap rumah dan bangunan berbeda-beda. Tim kami datang langsung membawa alat ukur dan buku sampel bahan ke rumah, apartemen, ruko, atau kantor Anda di Batam.',
    durationEstimate: 'Estimasi kunjungan: 30–60 menit sesuai jumlah jendela',
    highlights: [
      'Gratis biaya kunjungan untuk seluruh wilayah Batam',
      'Pengukuran presisi lebar, tinggi, dan posisi pemasangan bracket rell',
      'Konsultasi pencahayaan ruangan & kecocokan warna bahan di tempat',
    ],
  },
  {
    id: 'pengadaan-custom',
    title: 'Penjahitan Gorden Custom & Pengadaan Bahan',
    subtitle: 'Dijahit rapi sesuai ukuran dan model pilihan',
    description:
      'Setiap helai gorden dipotong dan dijahit khusus mengikuti ukuran hasil survei. Tersedia model smokring minimalis, plisket, gelombang S-wave, hingga gorden klasik model Spanyol dengan poni.',
    durationEstimate: 'Estimasi produksi: 3–7 hari kerja sesuai jumlah pesanan',
    highlights: [
      'Pilihan kain blackout, dimout, semi-blackout, dan vitrase siang',
      'Jahitan kelim tepi dan lipatan atas yang rapi serta simetris',
      'Tersedia juga pemesanan vertical, horizontal, roller blinds, dan wallpaper vinyl',
    ],
  },
  {
    id: 'pemasangan',
    title: 'Pemasangan Gorden, Blinds, & Rell Besi',
    subtitle: 'Instalasi kokoh, lurus, dan siap pakai',
    description:
      'Teknisi kami memasang rell besi, bracket, pengait (hook), vitrase, gorden utama, maupun tirai blinds dengan peralatan lengkap sehingga terpasang kuat di dinding beton maupun plafon.',
    durationEstimate: 'Estimasi pasang: 1–4 jam di lokasi sesuai jumlah titik',
    highlights: [
      'Pemasangan rell besi, roda plisket, dan endcup yang presisi',
      'Penataan lipatan gorden (styling) agar langsung tampak jatuh elegan',
      'Pemasangan wallpaper vinyl dinding dengan sambungan motif yang rapi',
    ],
  },
  {
    id: 'perbaikan-penggantian',
    title: 'Perbaikan & Penggantian Komponen',
    subtitle: 'Peremajaan rell, bracket, atau ganti kain gorden lama',
    description:
      'Jika Anda sudah memiliki gorden namun rell besinya macet/bengkok, atau ingin mengganti kain gorden lama dengan suasana baru menggunakan rell yang masih bagus, kami siap membantu.',
    durationEstimate: 'Estimasi pengerjaan: Menyesuaikan kondisi titik di lokasi',
    highlights: [
      'Penggantian rell besi, roda, kawat S, atau bracket yang aus',
      'Pembuatan kain gorden baru menyesuaikan ukuran rell yang sudah ada',
      'Penyesuaian ukuran gorden saat pindah rumah atau renovasi ruangan',
    ],
  },
  {
    id: 'perawatan',
    title: 'Panduan & Layanan Perawatan Berkala',
    subtitle: 'Menjaga gorden dan blinds tetap bersih dan awet',
    description:
      'Kami memberikan panduan perawatan yang tepat untuk setiap jenis bahan—mulai dari cara mencuci vitrase, membersihkan debu pada bilah blinds, hingga perawatan kain blackout agar lapisan penahan cahayanya awet.',
    durationEstimate: 'Konsultasi perawatan kapan saja via WhatsApp resmi kami',
    highlights: [
      'Tips perawatan harian sesuai jenis kain dan mekanisme tirai',
      'Bantuan pengecekan mekanisme tarikan rantai/tali pada blinds',
      'Layanan konsultasi purnajual yang ramah melalui WhatsApp',
    ],
  },
] as const;

export const targetClients = [
  'Pemilik Rumah & Perumahan Baru',
  'Penghuni Apartemen',
  'Ruko & Ruang Kantor',
  'Villa & Resort',
  'Hotel & Penginapan',
  'Developer & Kontraktor Interior',
] as const;

// 12 Kecamatan Resmi di Kota Batam beserta kawasan populernya
export const batamAreas = [
  'Kec. Batam Kota (Batam Centre, Botania, Sukajadi)',
  'Kec. Lubuk Baja (Nagoya, Baloi, Penuin)',
  'Kec. Bengkong (Bengkong Indah, Sadai, Tg. Buntung)',
  'Kec. Batu Ampar (Jodoh, Sei Panas, Tg. Sengkuang)',
  'Kec. Sekupang (Tiban, Patam Lestari, Tg. Riau)',
  'Kec. Batu Aji (Tanjung Uncang, Buliang, Kibing)',
  'Kec. Sagulung (Tembesi, Dapur 12, Sei Langkai)',
  'Kec. Sei Beduk (Tanjung Piayu, Muka Kuning, Mangsang)',
  'Kec. Nongsa (Batu Besar, Kabil, Punggur, Sambau)',
  'Kec. Galang (Barelang, Rempang, Sembulang)',
  'Kec. Bulang (Setokok, Pulau Buluh, Temoyong)',
  'Kec. Belakang Padang',
] as const;
