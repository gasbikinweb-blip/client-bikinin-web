// Mengompres video dari ../assets/ menjadi MP4 (H.264, <=720p, DENGAN audio AAC 128k, target <= 5-8 MB)
// dan membuat poster thumbnail WebP di public/videos/.
// Jalankan: npm run optimize-videos
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);

const SRC_DIR = existsSync(path.resolve('assets'))
  ? path.resolve('assets')
  : path.resolve('..', 'assets');
const OUT_DIR = path.resolve('public', 'videos');

// Cari binary ffmpeg di PATH atau di folder instalasi WinGet Windows
function findFfmpeg() {
  const localAppData = process.env.LOCALAPPDATA ?? '';
  const wingetPath = path.join(
    localAppData,
    'Microsoft',
    'WinGet',
    'Packages',
    'Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe',
    'ffmpeg-9.0.1-essentials_build',
    'bin',
    'ffmpeg.exe',
  );
  if (existsSync(wingetPath)) return wingetPath;
  return 'ffmpeg';
}

async function main() {
  const ffmpegBin = findFfmpeg();
  try {
    await execFileAsync(ffmpegBin, ['-version']);
  } catch {
    console.error(
      'ERROR: ffmpeg belum terpasang atau tidak ditemukan di PATH.\n' +
        'Cara memasang di Windows: jalankan `winget install --id Gyan.FFmpeg.Essentials -e` di terminal.',
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const entries = await readdir(SRC_DIR, { withFileTypes: true });
  const videos = entries
    .filter((e) => e.isFile() && /\.mp4$/i.test(e.name))
    .map((e) => e.name)
    .sort();

  for (const filename of videos) {
    const srcPath = path.join(SRC_DIR, filename);
    const base = filename.replace(/\.[^.]+$/, '');
    const outMp4 = path.join(OUT_DIR, `${base}.mp4`);
    const tmpPosterJpg = path.join(OUT_DIR, `${base}-tmp.jpg`);
    const outPosterWebp = path.join(OUT_DIR, `${base}-poster.webp`);

    const srcStat = await stat(srcPath);
    const srcMb = (srcStat.size / (1024 * 1024)).toFixed(2);
    console.log(`Memproses ${filename} (${srcMb} MB)...`);

    // Kompres video: H.264, lebar maksimal 720p, CRF 28, preset fast, audio AAC 128k, faststart
    await execFileAsync(ffmpegBin, [
      '-y',
      '-i',
      srcPath,
      '-vf',
      "scale='min(720,iw)':-2",
      '-c:v',
      'libx264',
      '-crf',
      '28',
      '-preset',
      'fast',
      '-pix_fmt',
      'yuv420p',
      '-c:a',
      'aac',
      '-b:a',
      '128k',
      '-movflags',
      '+faststart',
      outMp4,
    ]);

    // Ekstrak frame detik ke-1 untuk poster thumbnail
    await execFileAsync(ffmpegBin, [
      '-y',
      '-ss',
      '00:00:01',
      '-i',
      outMp4,
      '-frames:v',
      '1',
      '-q:v',
      '2',
      tmpPosterJpg,
    ]);

    // Ubah poster menjadi WebP ringan tanpa EXIF
    await sharp(tmpPosterJpg)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outPosterWebp);

    // Hapus file jpg sementara
    await rm(tmpPosterJpg, { force: true });

    const outStat = await stat(outMp4);
    const outMb = (outStat.size / (1024 * 1024)).toFixed(2);
    console.log(`✓ ${base}.mp4 selesai (${srcMb} MB -> ${outMb} MB, dengan audio) + poster WebP.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
