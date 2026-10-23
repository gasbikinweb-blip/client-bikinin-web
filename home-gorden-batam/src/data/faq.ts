// Data Pertanyaan Umum (FAQ) Home Gorden Batam.
// TODO: verifikasi kebijakan operasional dan waktu pengerjaan dengan pemilik usaha.

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    id: 'survei-gratis',
    question: 'Apakah survei dan pengukuran ke lokasi benar-benar gratis?',
    answer:
      'Ya, kami menyediakan layanan survei dan pengukuran gratis ke seluruh area Batam (Batam Centre, Nagoya, Lubuk Baja, Bengkong, Batu Aji, Sekupang, Tiban, Nongsa, dan sekitarnya). Tim kami juga dapat membawakan sampel bahan agar Anda bisa memilih langsung di rumah atau kantor.', // TODO: verifikasi syarat & ketentuan survei gratis dengan pemilik usaha
  },
  {
    id: 'lama-pengerjaan',
    question: 'Berapa lama proses penjahitan hingga pemasangan gorden selesai?',
    answer:
      'Rata-rata waktu produksi gorden custom maupun blinds berkisar antara 3 hingga 7 hari kerja setelah bahan dan ukuran disepakati, tergantung jumlah jendela serta antrean jahit. Jadwal pemasangan di lokasi akan disesuaikan dengan waktu luang Anda.', // TODO: verifikasi estimasi lama pengerjaan dengan pemilik usaha
  },
  {
    id: 'cara-pengukuran',
    question: 'Bagaimana jika saya belum tahu ukuran jendela atau pintu saya?',
    answer:
      'Anda tidak perlu mengukur sendiri secara detail. Cukup beri tahu kami perkiraan jumlah jendela atau pintu melalui WhatsApp, lalu tim kami yang akan datang mengukur lebar, tinggi, dan posisi pemasangan bracket rell secara presisi.',
  },
  {
    id: 'pilihan-bahan',
    question: 'Apa saja pilihan bahan gorden dan tirai yang tersedia?',
    answer:
      'Kami menyediakan pilihan lengkap mulai dari kain gorden blackout (penahan cahaya dan panas), semi-blackout/dimout, kain gorden minimalis bertekstur halus, vitrase siang (voile/sheer), hingga vertical blinds, horizontal blinds, roller blinds, wallpaper vinyl, serta rell besi.', // TODO: verifikasi ketersediaan stok bahan dengan pemilik usaha
  },
  {
    id: 'perawatan-gorden',
    question: 'Bagaimana cara merawat gorden blackout, vitrase, dan blinds agar awet?',
    answer:
      'Untuk perawatan rutin, bersihkan debu menggunakan kemoceng halus atau vacuum cleaner berujung sikat lembut. Vitrase dapat dicuci lembut tanpa pemutih, sedangkan kain blackout sebaiknya tidak diperas keras atau disikat kasar agar lapisan penahan cahayanya tetap awet. Untuk blinds, cukup dilap dengan kain microfiber lembap.', // TODO: verifikasi panduan perawatan dengan pemilik usaha
  },
  {
    id: 'ganti-model-atau-rell',
    question: 'Apakah bisa hanya pesan kain gorden saja atau ganti model menggunakan rell lama?',
    answer:
      'Tentu bisa. Saat survei, teknisi kami akan mengecek kondisi rell lama Anda. Jika rell masih kokoh dan lancar, Anda cukup memesan kain gorden baru. Namun jika bracket atau rell sudah macet/bengkok, kami juga menyediakan penggantian rell besi dan aksesorinya.', // TODO: verifikasi dengan pemilik usaha
  },
  {
    id: 'area-layanan',
    question: 'Area mana saja yang dilayani oleh Gorden Interior Batam?',
    answer:
      'Kami melayani survei dan pemasangan untuk perumahan, apartemen, ruko, kantor, villa, hingga hotel di seluruh wilayah Pulau Batam, termasuk Batam Centre, Nagoya, Baloi, Bengkong, Tiban, Sekupang, Batu Aji, Sagulung, Muka Kuning, Kabil, dan Nongsa.',
  },
] as const;
