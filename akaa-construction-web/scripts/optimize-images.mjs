import { existsSync } from 'node:fs';
// Mengolah foto pilihan dari ../akaa_construction/assets/content ig/ menjadi WebP di public/images/proyek/[slug]/.
// File asli TIDAK ditimpa. Metadata (EXIF/GPS) otomatis dibuang oleh sharp.
// Jalankan: npm run optimize-images
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.env.ASSETS_DIR ?? '../akaa_construction/assets/content ig';
const OUT = 'public/images/proyek';

// [slug proyek, nama file hasil, file sumber, crop opsional {top, bottom, left, right} dalam persen]
// Crop dipakai untuk membuang stempel tanggal/lokasi di pojok foto.
const photos = [
  ['sn-house-rancamaya', '01', '2026-05-18_DYee50fx_Ns/01.jpg', { bottom: 14, right: 20 }],
  ['sn-house-rancamaya', '02', '2026-05-15_DYWRbxCRCKh/01.jpg', { bottom: 12 }],
  ['hotel-kemang', '01', '2020-12-26_CJPiyDtn863/01.jpg'],
  ['hotel-kemang', '02', '2020-12-26_CJPiyDtn863/04.jpg'],
  ['hotel-kemang', '03', '2020-12-26_CJPiyDtn863/05.jpg'],
  ['hotel-kemang', '04', '2020-12-26_CJPiyDtn863/06.jpg'],
  ['hotel-kemang', '05', '2020-12-26_CJPiyDtn863/07.jpg'],
  ['hotel-kemang', '06', '2020-12-26_CJPiyDtn863/10.jpg'],
  ['renovasi-rumah-office', '01', '2020-11-23_CH7IXdHH-11/02.jpg'],
  ['renovasi-rumah-office', '02', '2020-11-26_CICewuZnp9T/02.jpg'],
  ['renovasi-rumah-office', '03', '2020-11-27_CIF6mHLHV37/01.jpg'],
  ['perbaikan-kebocoran', '01', '2020-12-11_CIpDo5fnDtO/01.jpg'],
  ['fasad-gedung-sudirman', '01', '2020-12-28_CJV_FZbHaRT/01.jpg'],
  ['canopy-pintu-sliding', '01', '2021-04-08_CNYxeSwH383/01.jpg'],
  ['canopy-pintu-sliding', '02', '2021-04-20_CN3mxt3nZJc/01.jpg'],
];

for (const [slug, name, file, crop] of photos) {
  const dir = path.join(OUT, slug);
  await mkdir(dir, { recursive: true });
  let img = sharp(path.join(SRC, file)).rotate();
  if (crop) {
    const { width = 0, height = 0 } = await img.metadata();
    const t = Math.round((height * (crop.top ?? 0)) / 100);
    const b = Math.round((height * (crop.bottom ?? 0)) / 100);
    const l = Math.round((width * (crop.left ?? 0)) / 100);
    const r = Math.round((width * (crop.right ?? 0)) / 100);
    img = img.extract({ left: l, top: t, width: width - l - r, height: height - t - b });
  }
  const buf = await img.toBuffer();
  await sharp(buf)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(dir, `${name}.webp`));
  await sharp(buf)
    .resize({ width: 500, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(dir, `${name}-thumb.webp`));
  console.log(`✓ ${file} -> ${dir}/${name}.webp`);
}

// Gambar pratinjau link (WhatsApp/medsos) dalam JPG.
// Tidak ditimpa bila sudah ada: public/og.jpg sekarang kolase desain khusus (foto proyek + logo + judul).
if (!existsSync('public/og.jpg')) {
  await sharp(path.join(SRC, photos[0][2]))
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile('public/og.jpg');
}

// Ukuran tiap hasil, untuk diisi ke src/data/projects.ts
for (const [slug, name] of photos) {
  const m = await sharp(path.join(OUT, slug, `${name}.webp`)).metadata();
  console.log(`${slug}/${name}: ${m.width}x${m.height}`);
}
