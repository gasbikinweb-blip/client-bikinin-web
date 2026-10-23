// Mengubah foto asli di ../assets/ menjadi WebP terkompresi di public/ tanpa menimpa file asli.
// Menghapus metadata EXIF/GPS, mendeteksi duplikat hash MD5, dan melakukan crop ringan pada bar hitam screenshot.
// Jalankan: npm run optimize-images
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = existsSync(path.resolve('assets'))
  ? path.resolve('assets')
  : path.resolve('..', 'assets');
const OUT_DIR = path.resolve('public');
const MAX_WIDTH = 1600;
const THUMB_WIDTH = 640;

// Foto logo yang diproses khusus ke public/brand/ (bukan foto gorden)
const EXCLUDED_FILES = new Set(['logo-home-gorden-batam.jpeg']);

// Pemetaan foto di subfolder "assets/Jenis Blind" ke nama slug yang rapi & deskriptif
const SUBFOLDER_BLIND_FILES = [
  {
    relPath: path.join('Jenis Blind', 'WhatsApp Image 2026-10-19 at 11.21.54.jpeg'),
    slug: 'vertical-blinds-putih-jendela-besar-01',
    cropKey: 'vertical-blinds-putih-jendela-besar-01',
  },
  {
    relPath: path.join('Jenis Blind', 'WhatsApp Image 2026-10-19 at 11.21.53 (1).jpeg'),
    slug: 'roller-blinds-cokelat-rantai-01',
    cropKey: 'roller-blinds-cokelat-rantai-01',
  },
  {
    relPath: path.join('Jenis Blind', 'WhatsApp Image 2026-10-19 at 11.21.53.jpeg'),
    slug: 'roller-blinds-abu-ruang-kantor-01',
    cropKey: 'roller-blinds-abu-ruang-kantor-01',
  },
];

// Foto yang memiliki letterbox bar hitam/UI atas/bawah dari screenshot HP -> di-trim otomatis bagian bar-nya
const LETTERBOX_CROPS = {
  'gorden-minimalis-abu-silver-01.jpeg': { top: 280, bottom: 280 },
  'rell-besi-batang-gorden-koleksi-01.jpeg': { top: 250, bottom: 250 },
  'gorden-custom-krem-vitrase-kamar-utama-01.jpeg': { top: 270, bottom: 210 },
  'gorden-minimalis-silver-vitrase-jendela-01.jpeg': { top: 150, bottom: 300 },
  'gorden-minimalis-emas-vitrase-jendela-tinggi-01.jpeg': { top: 145, bottom: 345 },
  'gorden-minimalis-kuning-emas-vitrase-01.jpeg': { top: 110, bottom: 310 },
  'gorden-minimalis-cokelat-susu-tanaman-01.jpeg': { top: 140, bottom: 330 },
  'gorden-custom-emas-sudut-ruang-tamu-01.jpeg': { top: 315, bottom: 390 },
  'roller-blinds-abu-ruang-kantor-01': { top: 385, bottom: 375 },
  'arsip-screenshot-fb-gorden-abu.jpeg': { top: 335, bottom: 185 },
};

// Pemetaan sampul & galeri lengkap untuk 9 produk utama (menggunakan seluruh foto gorden & blinds dari assets/)
const PRODUCT_GALLERIES = {
  'gorden-custom': [
    'gorden-custom-krem-ruang-tamu-mewah-01.jpeg',
    'gorden-custom-krem-ruang-tamu-mewah-02.jpeg',
    'gorden-custom-emas-poni-klasik-01.jpeg',
    'gorden-custom-krem-vitrase-kamar-01.jpeg',
    'gorden-custom-krem-tertutup-kamar-02.jpeg',
    'gorden-custom-krem-vitrase-kamar-utama-01.jpeg',
    'gorden-custom-abu-vitrase-void-tinggi-01.jpeg',
    'gorden-custom-emas-sudut-ruang-tamu-01.jpeg',
    'gorden-custom-cokelat-tua-wardrobe-kamar-01.jpeg',
    'gorden-custom-taupe-vitrase-tangga-lampu-01.jpeg',
    'poster-promosi-gorden-spanyol-ilustrasi.jpeg',
  ],
  'gorden-vitrase': [
    'gorden-vitrase-putih-polos-minimalis-01.jpeg',
    'gorden-vitrase-putih-kupu-pita-emas-01.jpeg',
    'gorden-minimalis-taupe-vitrase-putih-01.jpeg',
    'gorden-minimalis-silver-vitrase-jendela-01.jpeg',
    'gorden-minimalis-emas-vitrase-jendela-tinggi-01.jpeg',
    'gorden-minimalis-krem-lantai-kayu-01.jpeg',
  ],
  'gorden-minimalis': [
    'gorden-minimalis-krem-ruang-tamu-modern-01.jpeg',
    'gorden-minimalis-abu-vitrase-pintu-besar-01.jpeg',
    'gorden-minimalis-cokelat-keemasan-pintu-kaca-01.jpeg',
    'gorden-minimalis-emas-dua-jendela-01.jpeg',
    'gorden-minimalis-emas-smokring-01.jpeg',
    'gorden-minimalis-cokelat-terracotta-vitrase-01.jpeg',
    'gorden-minimalis-cokelat-vitrase-ruang-tamu-03.jpeg',
    'gorden-minimalis-cokelat-muda-tinggi-01.jpeg',
    'gorden-minimalis-merah-maroon-vitrase-01.jpeg',
    'gorden-minimalis-krem-hangat-ruang-keluarga-01.jpeg',
    'gorden-minimalis-cokelat-tua-vitrase-sofa-01.jpeg',
    'gorden-minimalis-biru-muda-pembatas-ruang-01.jpeg',
    'gorden-minimalis-abu-vitrase-ruang-tamu-02.jpeg',
    'gorden-minimalis-abu-vitrase-ruang-makan-01.jpeg',
    'gorden-minimalis-mocca-krem-jendela-lebar-01.jpeg',
    'gorden-minimalis-cokelat-susu-tanaman-01.jpeg',
    'gorden-minimalis-kuning-emas-vitrase-01.jpeg',
  ],
  'gorden-blackout': [
    'gorden-blackout-hitam-arang-vitrase-kamar-01.jpeg',
    'gorden-blackout-abu-sofa-ruang-tamu-01.jpeg',
    'gorden-blackout-abu-tua-pintu-01.jpeg',
    'gorden-blackout-abu-gelap-sudut-01.jpeg',
    'gorden-blackout-cokelat-tinggi-pintu-01.jpeg',
    'gorden-blackout-cokelat-tua-ruang-tamu-klasik-01.jpeg',
    'gorden-blackout-cokelat-vitrase-ruang-makan-01.jpeg',
    'gorden-blackout-abu-kebiruan-kamar-01.jpeg',
    'gorden-blackout-cokelat-plafon-led-01.jpeg',
    'arsip-screenshot-fb-gorden-abu.jpeg',
  ],
  'vertical-blinds': [
    path.join('Jenis Blind', 'WhatsApp Image 2026-10-19 at 11.21.54.jpeg'),
    'horizontal-blinds-putih-minimalis-01.jpeg',
    'horizontal-blinds-abu-dapur-01.jpeg',
  ],
  'horizontal-blinds': [
    'horizontal-blinds-putih-minimalis-01.jpeg',
    'horizontal-blinds-krem-dapur-01.jpeg',
    'horizontal-blinds-abu-dapur-01.jpeg',
    'horizontal-blinds-abu-detail-stik-02.jpeg',
    'horizontal-blinds-cokelat-kayu-detail-01.jpeg',
  ],
  'roller-blinds': [
    path.join('Jenis Blind', 'WhatsApp Image 2026-10-19 at 11.21.53 (1).jpeg'),
    path.join('Jenis Blind', 'WhatsApp Image 2026-10-19 at 11.21.53.jpeg'),
  ],
  'wallpaper-vinyl': [
    'gorden-minimalis-abu-silver-01.jpeg',
    'gorden-minimalis-krem-ruang-tamu-modern-01.jpeg',
  ],
  'rell-besi': [
    'rell-besi-batang-gorden-koleksi-01.jpeg',
    'rell-besi-tutup-endcup-katalog-02.jpeg',
  ],
};

function applyCrop(pipeline, cropKey, meta) {
  const crop = LETTERBOX_CROPS[cropKey];
  if (!crop || !meta.width || !meta.height) return pipeline;
  const top = crop.top ?? 0;
  const bottom = crop.bottom ?? 0;
  const height = meta.height - top - bottom;
  if (height > 200) {
    return pipeline.extract({ left: 0, top, width: meta.width, height });
  }
  return pipeline;
}

async function main() {
  console.log(`Membaca sumber gambar dari: ${SRC_DIR}`);

  // Bersihkan produk contoh bawaan starter jika masih ada
  for (const ex of ['produk-contoh-1', 'produk-contoh-2', 'produk-contoh-3']) {
    await rm(path.join(OUT_DIR, 'products', ex), { recursive: true, force: true });
  }

  await mkdir(path.join(OUT_DIR, 'brand'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'projects'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'projects', 'thumbs'), { recursive: true });

  // 1. Proses Logo (Header, OG Image, Favicon / App Icon)
  const logoSrc = path.join(SRC_DIR, 'logo-home-gorden-batam.jpeg');
  await sharp(logoSrc)
    .rotate()
    .resize({ width: 256, height: 256, fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, 'brand', 'logo.webp'));

  await sharp(logoSrc)
    .rotate()
    .resize({ width: 640, height: 640, fit: 'cover' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(OUT_DIR, 'brand', 'og-logo.jpg'));

  await sharp(logoSrc)
    .rotate()
    .resize({ width: 192, height: 192, fit: 'cover' })
    .png()
    .toFile(path.resolve('src', 'app', 'icon.png'));

  console.log('✓ Logo (logo.webp, og-logo.jpg, src/app/icon.png) berhasil dibuat tanpa EXIF.');

  // 2. Proses Semua Foto Proyek di root assets/ + subfolder assets/Jenis Blind/
  const entries = await readdir(SRC_DIR, { withFileTypes: true });
  const rootFiles = entries
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name))
    .map((e) => ({
      relPath: e.name,
      slug: e.name.replace(/\.[^.]+$/, ''),
      cropKey: e.name,
    }))
    .sort((a, b) => a.relPath.localeCompare(b.relPath));

  const allProjectSources = [...rootFiles, ...SUBFOLDER_BLIND_FILES];

  const seenHashes = new Map();
  const dimensionsReport = {};
  let processedProjects = 0;
  let skippedDuplicates = 0;

  for (const item of allProjectSources) {
    if (EXCLUDED_FILES.has(item.relPath)) continue;

    const fullPath = path.join(SRC_DIR, item.relPath);
    if (!existsSync(fullPath)) continue;
    const buf = await readFile(fullPath);
    const hash = createHash('md5').update(buf).digest('hex');

    if (seenHashes.has(hash)) {
      console.log(
        `⚠ Lewati duplikat identik: ${item.relPath} (sama dengan ${seenHashes.get(hash)})`,
      );
      skippedDuplicates++;
      continue;
    }
    seenHashes.set(hash, item.relPath);

    const outWebp = path.join(OUT_DIR, 'projects', `${item.slug}.webp`);
    const outThumb = path.join(OUT_DIR, 'projects', 'thumbs', `${item.slug}.webp`);

    const meta = await sharp(buf).metadata();
    const info = await applyCrop(sharp(buf).rotate(), item.cropKey, meta)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outWebp);

    await applyCrop(sharp(buf).rotate(), item.cropKey, meta)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outThumb);

    dimensionsReport[item.slug] = { width: info.width, height: info.height };
    processedProjects++;
  }

  // 3. Buat OG Banner 1200x630 dari foto terbaik untuk beranda
  const heroSrc = path.join(SRC_DIR, 'gorden-minimalis-krem-ruang-tamu-modern-01.jpeg');
  await sharp(heroSrc)
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT_DIR, 'brand', 'og-home.jpg'));

  // 4. Proses Gambar Katalog Produk (/public/products/<slug>/01.webp, 02.webp, ..., og.jpg)
  let processedProductImages = 0;
  for (const [productSlug, files] of Object.entries(PRODUCT_GALLERIES)) {
    const prodDir = path.join(OUT_DIR, 'products', productSlug);
    await rm(prodDir, { recursive: true, force: true });
    await mkdir(prodDir, { recursive: true });

    for (let i = 0; i < files.length; i++) {
      const relFile = files[i];
      const srcFile = path.join(SRC_DIR, relFile);
      const buf = await readFile(srcFile);
      const meta = await sharp(buf).metadata();
      const indexStr = String(i + 1).padStart(2, '0');
      const targetWebp = path.join(prodDir, `${indexStr}.webp`);

      // Cari cropKey jika berasal dari subfolder Jenis Blind
      const blindMatch = SUBFOLDER_BLIND_FILES.find((b) => b.relPath === relFile);
      const cropKey = blindMatch ? blindMatch.cropKey : relFile;

      await applyCrop(sharp(buf).rotate(), cropKey, meta)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(targetWebp);
      processedProductImages++;

      if (i === 0) {
        const ogJpg = path.join(prodDir, 'og.jpg');
        await applyCrop(sharp(buf).rotate(), cropKey, meta)
          .resize({ width: 600, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(ogJpg);
      }
    }
  }

  console.log(
    `Selesai: ${processedProjects} foto proyek (+ thumbnail), ${processedProductImages} foto produk diproses. Duplikat dilewati: ${skippedDuplicates}.`,
  );
  console.log('Dimensi foto baru:', {
    'vertical-blinds-putih-jendela-besar-01':
      dimensionsReport['vertical-blinds-putih-jendela-besar-01'],
    'roller-blinds-cokelat-rantai-01': dimensionsReport['roller-blinds-cokelat-rantai-01'],
    'roller-blinds-abu-ruang-kantor-01': dimensionsReport['roller-blinds-abu-ruang-kantor-01'],
    'arsip-screenshot-fb-gorden-abu': dimensionsReport['arsip-screenshot-fb-gorden-abu'],
    'poster-promosi-gorden-spanyol-ilustrasi':
      dimensionsReport['poster-promosi-gorden-spanyol-ilustrasi'],
    'horizontal-blinds-cokelat-kayu-detail-01':
      dimensionsReport['horizontal-blinds-cokelat-kayu-detail-01'],
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
