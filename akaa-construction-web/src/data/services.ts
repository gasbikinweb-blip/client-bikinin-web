// Layanan dari profil WhatsApp Business ("Jasa Bangun Rumah => Jasa Renovasi Rumah => Interior => Landscape"),
// katalog WA (Custom Interior, Supplier Bata Merah, Supply Material) dan caption IG 2026.
import type { Service } from './types';

export const services: readonly Service[] = [
  {
    id: 'bangun-rumah',
    name: 'Bangun Rumah Baru',
    description:
      'Membangun rumah dari nol sesuai kebutuhan dan budget, mulai dari pondasi sampai finishing. Juga melayani villa dan resto.',
    points: ['Rumah tinggal & villa', 'Struktur sampai finishing', 'Laporan progress rutin'],
    icon: 'rumah',
  },
  {
    id: 'renovasi',
    name: 'Renovasi Rumah',
    description:
      'Renovasi sebagian atau menyeluruh: tambah lantai, dapur, perbaikan kebocoran, sampai mengubah fungsi ruang.',
    points: ['Tambah lantai & ruang', 'Renovasi dapur', 'Perbaikan kebocoran'],
    icon: 'renovasi',
  },
  {
    id: 'interior',
    name: 'Custom Interior',
    description:
      'Interior custom untuk rumah di Jabodetabek, dari moodboard hingga pemasangan, termasuk kitchen set.',
    points: ['Moodboard & desain', 'Kitchen set', 'Furnitur custom'],
    icon: 'interior',
  },
  {
    id: 'taman',
    name: 'Taman & Landscape',
    description: 'Penataan taman dan landscape rumah agar hunian terasa lebih asri dan adem.',
    points: ['Taman rumah', 'Landscape halaman'], // TODO: konfirmasi lingkup layanan taman
    icon: 'taman',
  },
  {
    id: 'material',
    name: 'Supply Material',
    description:
      'Penyediaan material bangunan untuk area Jabodetabek, seperti bata merah dan beton readymix.',
    points: ['Bata merah', 'Beton readymix', 'Granit & marmer'], // TODO: konfirmasi daftar & harga material
    icon: 'material',
  },
];
