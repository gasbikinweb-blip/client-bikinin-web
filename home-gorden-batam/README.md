# Home Gorden Batam — Website Company Profile & Katalog Statis

Website company profile dan katalog produk resmi untuk **Home Gorden Batam** (_Gorden Interrior Batam_), penyedia layanan penjualan dan pemasangan gorden custom, vitrase, minimalis, blackout, vertical/horizontal/roller blinds, wallpaper vinyl, dan rell besi dengan layanan **survei & pengukuran gratis ke seluruh area Batam**.

Website ini dirancang sebagai **100% static site (`output: 'export'`)** menggunakan Next.js App Router, TypeScript strict mode, dan Tailwind CSS v4. Seluruh konsultasi, permintaan jadwal survei gratis, dan penawaran harga diarahkan langsung ke WhatsApp resmi tanpa backend, database, login, atau penyimpanan data pengguna di server.

---

## 1. Spesifikasi Lingkungan & Teknologi

- **Node.js**: `>=20.9.0` (dikunci pada `.nvmrc` di `22.20.0`)
- **Framework**: Next.js `16.4.0` (App Router, Static Export ke `/out`)
- **UI & Bahasa**: React `19.3.0`, TypeScript `5.9.3` (`strict: true`, `noUncheckedIndexedAccess: true`)
- **Styling**: Tailwind CSS `4.3.3` dengan dukungan **Mode Gelap (Default) & Mode Terang** yang memenuhi standar kontras WCAG AA ($\ge 4.5:1$)
- **Optimasi Media**:
  - `sharp` (`scripts/optimize-images.mjs`): Mengonversi foto asli dari `../assets/` ke `.webp`, memotong letterbox hitam otomatis pada screenshot, menghasilkan thumbnail galeri, gambar OpenGraph `.jpg`, favicon, dan **menghapus seluruh metadata EXIF/GPS**.
  - `ffmpeg` (`scripts/optimize-videos.mjs`): Mengompres ke-5 video dokumentasi pemasangan (`<= 720p`, H.264, `crf 28`, `-movflags +faststart`, tanpa track audio untuk menjaga privasi percakapan di lokasi) beserta gambar poster `.webp`.

---

## 2. Cara Menjalankan & Membangun Proyek

Pastikan terminal berada di dalam folder `nextjs-static-catalog-starter/`:

```bash
# 1. Pasang seluruh dependency (versi terkunci)
npm install

# 2. Jalankan server pengembangan lokal (http://localhost:3000)
npm run dev

# 3. Optimasi ulang foto dari ../assets ke public/ (jika ada perubahan foto)
npm run optimize-images

# 4. Optimasi ulang video dari ../assets ke public/videos/ (butuh ffmpeg terpasang)
npm run optimize-videos

# 5. Pemeriksaan kualitas kode (ESLint, TypeScript, Prettier)
npm run lint
npm run typecheck
npm run format:check

# 6. Build static site siap produksi ke folder /out
npm run build
```

Hasil build statis berada di dalam folder `out/` dan dapat langsung di-deploy ke **Cloudflare Pages**, **Netlify**, **Vercel**, atau web server statis mana pun (Nginx, Apache, S3).

---

## 3. Panduan Mengubah Data Bisnis & Konten

Seluruh konten website disimpan di dalam kode (`src/data/` dan `src/lib/config.ts`) tanpa CMS atau database eksternal:

1. **Mengubah Nomor WhatsApp, Nama Brand, Alamat, & Jam Kerja**
   - Salin `.env.example` menjadi `.env.local` lalu sesuaikan:
     - `NEXT_PUBLIC_WA_NUMBER=6282162725097` (format internasional hanya angka, tanpa `+`, spasi, atau tanda hubung)
     - `NEXT_PUBLIC_SITE_NAME="Home Gorden Batam"`
     - `NEXT_PUBLIC_SITE_URL="https://homegordenbatam.com"`
   - Detail alamat, jam operasional, dan link sosial media dapat diedit langsung di [`src/lib/config.ts`](src/lib/config.ts).
   - Seluruh pembuatan tautan WhatsApp terpusat di [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts) melalui fungsi `buildWhatsAppLink()`.

2. **Mengubah atau Menambah Jenis Produk (`/produk` & `/produk/[slug]`)**
   - Edit [`src/data/products.ts`](src/data/products.ts).
   - Setiap produk memiliki `slug`, `name`, `category`, `description`, `suitableRooms`, `benefits`, `specs`, dan daftar `images`.
   - Jika menambah foto sumber baru di `../assets/`, daftarkan pemetaannya di [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs) lalu jalankan `npm run optimize-images`.

3. **Mengubah atau Menambah Foto & Video Portofolio (`/proyek`)**
   - Edit [`src/data/projects.ts`](src/data/projects.ts).
   - Untuk foto hasil pemasangan nyata di lokasi klien, gunakan `kind: 'proyek'` (UI akan menampilkan badge ruangan).
   - Untuk gambar referensi desain/render katalog, wajib gunakan `kind: 'ilustrasi'` (UI otomatis menampilkan badge **"Ilustrasi"**).
   - Daftar 5 video dokumentasi pemasangan diatur pada array `projectVideos` di [`src/data/projects.ts`](src/data/projects.ts).

4. **Mengubah Rekomendasi Ruangan (`/solusi`), Layanan (`/layanan`), & FAQ**
   - Solusi per ruangan: [`src/data/solutions.ts`](src/data/solutions.ts) dan [`src/data/rooms.ts`](src/data/rooms.ts)
   - Layanan, keunggulan, tahapan kerja, dan cakupan area Batam: [`src/data/site.ts`](src/data/site.ts)
   - Pertanyaan umum (FAQ): [`src/data/faq.ts`](src/data/faq.ts)

5. **Mengganti File Katalog PDF**
   - Ganti file [`public/katalog-home-gorden-batam.pdf`](public/katalog-home-gorden-batam.pdf) dengan file PDF katalog terbaru Anda menggunakan nama file yang sama.

---

## 4. Catatan Keamanan, Privasi, & Hardening

1. **Sifat Publik Variabel `NEXT_PUBLIC_*`**
   - Semua environment variable berawalan `NEXT_PUBLIC_*` akan disertakan langsung ke dalam bundel statis HTML/JS yang dikirim ke browser pengunjung. **JANGAN PERNAH** menyimpan secret key, token API rahasia, atau kredensial privat di dalam `.env` proyek ini.

2. **Content Security Policy (CSP) & Trade-off Static Export**
   - Header keamanan lengkap (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin`, dan `Strict-Transport-Security`) telah dikonfigurasi di [`public/_headers`](public/_headers) (untuk Cloudflare Pages / Netlify) dan [`vercel.json`](vercel.json) (untuk Vercel).
   - Karena Next.js App Router menyisipkan skrip hidrasi inline pada file HTML hasil static export (`output: 'export'`) dan tidak ada server runtime untuk menghasilkan nonce dinamis per-request, direktif `script-src 'self' 'unsafe-inline'` dan `style-src 'self' 'unsafe-inline'` diperlukan agar aplikasi berjalan normal. Seluruh resource lain dikunci ketat pada `'self'`, `object-src 'none'`, `base-uri 'self'`, dan `frame-ancestors 'none'`.

3. **Pencegahan XSS & Pembuat Pesan WhatsApp**
   - Aturan ESLint `react/no-danger: 'error'` diaktifkan secara ketat; hanya komponen [`src/components/JsonLd.tsx`](src/components/JsonLd.tsx) yang diizinkan merender JSON-LD terstruktur dengan sanitasi karakter `<` menjadi `\u003c`.
   - Komponen [`src/components/WhatsAppBuilder.tsx`](src/components/WhatsAppBuilder.tsx) **bukan** form yang mengirim data ke server. Seluruh pilihan divalidasi terhadap whitelist produk/ruangan/kawasan Batam, jumlah titik jendela divalidasi sebagai bilangan bulat positif (1–100), teks opsional dibersihkan dari karakter kontrol serta dibatasi panjangnya, lalu di-encode menggunakan `encodeURIComponent` sebelum membuka tautan `https://wa.me/...` dengan `rel="noopener noreferrer"`.

4. **Privasi Pemilik Rumah & Penghapusan Metadata EXIF**
   - Skrip [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs) secara default menghapus semua metadata EXIF (termasuk koordinat lokasi GPS dan informasi perangkat kamera) saat menghasilkan gambar `.webp` dan `.jpg` di folder `public/`.
   - Skrip [`scripts/optimize-videos.mjs`](scripts/optimize-videos.mjs) menghapus metadata dan menonaktifkan jalur audio (`-an`) agar suara percakapan di rumah klien tidak ikut terpublikasi.
   - **Pengingat Penting bagi Pemilik Usaha**: Sebelum menambahkan foto atau video proyek baru ke website, pastikan telah memperoleh izin dari pemilik rumah/ruangan dan pastikan tidak ada wajah penghuni, foto keluarga di dinding, plat nomor kendaraan, atau nomor detail rumah yang terlihat jelas.

5. **Pemeliharaan Dependency Berkala**
   - Seluruh versi dependency di [`package.json`](package.json) telah dikunci secara eksak (tanpa `^` atau `~`). Aktifkan **GitHub Dependabot** atau **Renovate** pada repositori Git Anda serta jalankan `npm audit` secara berkala untuk memantau pembaruan keamanan.
