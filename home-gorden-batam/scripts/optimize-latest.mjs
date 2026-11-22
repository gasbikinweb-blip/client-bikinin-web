// Foto pemasangan terbaru (dari WhatsApp) → WebP 4:5 di public/projects/ + thumbs/, EXIF/GPS dibuang.
// Pemakaian: node scripts/optimize-latest.mjs "<folder foto>"
// Nama file asli → slug ditentukan di daftar `photos` di bawah (urut sesuai data di src/data/projects.ts).
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2];
if (!SRC) {
  console.error('Pakai: node scripts/optimize-latest.mjs "<folder foto>"');
  process.exit(1);
}

// Foto 22 November 2026
const photos = [
  ['WhatsApp Image 2026-11-22 at 08.51.40 (1).jpeg', 'vitrase-putih-gorden-mustard-plafon-tinggi-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.40.jpeg', 'roller-blinds-abu-jendela-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.41 (1).jpeg', 'gorden-krem-ring-sudut-ruangan-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.41 (2).jpeg', 'gorden-krem-ruang-tamu-plafon-kayu-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.41.jpeg', 'gorden-krem-detail-ring-plafon-kayu-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.42 (1).jpeg', 'gorden-cokelat-vitrase-pintu-kaca-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.42 (2).jpeg', 'gorden-cokelat-tua-vitrase-ruang-tv-2611-01'],
  ['WhatsApp Image 2026-11-22 at 08.51.42.jpeg', 'gorden-krem-pintu-ruang-tamu-2611-01'],
];

const OUT = path.resolve('public', 'projects');
await mkdir(path.join(OUT, 'thumbs'), { recursive: true });

for (const [file, slug] of photos) {
  // Potong ke 4:5 (sama dengan foto proyek lain), lalu kecilkan; sharp membuang metadata secara default
  const base = sharp(path.join(SRC, file)).rotate();
  await base
    .clone()
    .resize({ width: 1024, height: 1280, fit: 'cover', position: 'attention' })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${slug}.webp`));
  await base
    .clone()
    .resize({ width: 640, height: 800, fit: 'cover', position: 'attention' })
    .webp({ quality: 75 })
    .toFile(path.join(OUT, 'thumbs', `${slug}.webp`));
  console.log('✓', slug);
}
