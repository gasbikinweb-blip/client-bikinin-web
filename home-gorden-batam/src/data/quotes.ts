// Prinsip kerja & nilai layanan untuk ditampilkan di QuoteCarousel
export interface Quote {
  text: string;
  author: string;
  role: string;
}

// TODO: verifikasi dengan pemilik usaha (jangan mengarang testimoni klien palsu, gunakan prinsip layanan resmi)
export const quotes: readonly Quote[] = [
  {
    text: 'Setiap jendela memiliki karakter tersendiri. Kami memastikan pengukuran yang presisi di lokasi agar gorden jatuh rapi dan serasi dengan ruangan Anda.',
    author: 'Prinsip Kerja Kami',
    role: 'Survei & Pengukuran Gratis Seluruh Batam',
  },
  {
    text: 'Mulai dari gorden blackout penahan terik matahari hingga vitrase lembut dan tirai blinds modern—semua dikerjakan sesuai ukuran dan pilihan bahan Anda.',
    author: 'Komitmen Kualitas',
    role: 'Gorden Interior Batam',
  },
  {
    text: 'Konsultasi mudah tanpa harus langsung memesan. Tim kami siap membawakan sampel kain ke rumah, apartemen, ruko, atau kantor Anda di Batam.',
    author: 'Layanan Pelanggan',
    role: 'Respons Cepat via WhatsApp',
  },
];
