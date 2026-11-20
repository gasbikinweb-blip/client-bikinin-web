// Halaman area layanan (/area/[slug]). Hanya area yang punya proyek nyata, plus Cibubur (lokasi kantor).
// Proyek dicocokkan dari field `location` di projects.ts; tidak ada klaim/angka karangan.
import { projects } from './projects';
import type { Project } from './types';

export type Area = {
  slug: string;
  name: string;
  /** Kata di `location` proyek yang dianggap masuk area ini */
  match: readonly string[];
  intro: string;
  /** Judul daftar proyek (Cibubur memakai proyek di sekitarnya) */
  projectsTitle: string;
};

export const areas: readonly Area[] = [
  {
    slug: 'cibubur',
    name: 'Cibubur',
    match: ['Cileungsi', 'Bogor', 'Bekasi'],
    intro:
      'Kantor AKAA Construction ada di Ruko Fresh Market Kota Wisata, Cibubur. Dari sini kami melayani bangun rumah, renovasi, dan custom interior untuk Cibubur dan sekitarnya, dengan konsultasi dan survei lokasi gratis.',
    projectsTitle: 'Proyek di sekitar Cibubur',
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    match: ['Jakarta'],
    intro:
      'AKAA Construction mengerjakan renovasi, interior, dan pekerjaan bangunan di Jakarta, dari rumah tinggal sampai kafe, hotel, dan gedung perkantoran.',
    projectsTitle: 'Proyek kami di Jakarta',
  },
  {
    slug: 'bekasi',
    name: 'Bekasi',
    match: ['Bekasi'],
    intro:
      'Butuh kontraktor untuk renovasi, finishing, atau interior di Bekasi? AKAA Construction sudah mengerjakan beberapa proyek di Bekasi, mulai dari lantai granit sampai interior hunian.',
    projectsTitle: 'Proyek kami di Bekasi',
  },
  {
    slug: 'bogor',
    name: 'Bogor',
    match: ['Bogor'],
    intro:
      'AKAA Construction membangun rumah dan villa di Bogor, salah satunya SN House Villa di Rancamaya yang progresnya kami laporkan rutin dari struktur sampai atap.',
    projectsTitle: 'Proyek kami di Bogor',
  },
  {
    slug: 'cileungsi',
    name: 'Cileungsi',
    match: ['Cileungsi'],
    intro:
      'Untuk renovasi rumah di Cileungsi dan Harvest City, AKAA Construction siap membantu dari survei, RAB, sampai pengerjaan selesai. Kantor kami di Cibubur, tidak jauh dari Cileungsi.',
    projectsTitle: 'Proyek kami di Cileungsi',
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);

export const projectsInArea = (a: Area): Project[] =>
  projects.filter((p) => p.location && a.match.some((m) => p.location!.includes(m)));
