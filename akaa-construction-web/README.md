# AKAA Construction – Landing Page

Website satu halaman (Next.js 16, static export) untuk AKAA Construction (Aneka Kreasi Abadi), jasa bangun rumah,
renovasi, dan interior di Jabodetabek. Semua konsultasi lewat WhatsApp. Tanpa backend, form, login, atau upload.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Mode pengembangan |
| `npm run build` | Build statis ke `out/` |
| `npm start` | Menyajikan `out/` secara lokal |
| `npm run lint` / `typecheck` / `format` | Kualitas kode |
| `npm run audit` | Cek kerentanan dependency (aktifkan juga Dependabot/Renovate di GitHub) |
| `npm run optimize-images` | `../akaa_construction/assets/content ig/` → WebP di `public/images/proyek/[slug]/` (maks 1600px + thumb 500px, EXIF/GPS dibuang) |

## Mengubah konten

- **Tambah proyek:** daftarkan foto di array `photos` pada `scripts/optimize-images.mjs`, jalankan `npm run optimize-images`,
  lalu tambah objek di `src/data/projects.ts` (slug unik, `workType`, `status`, `cover`, `images`).
- **Tambah update progress:** tambah item `{ date, stage, note?, images? }` di `progress` proyek tersebut.
- **Promo:** `src/data/promos.ts`. Promo yang lewat `endDate` otomatis tidak tampil saat build berikutnya.
- **Nomor WA:** `NEXT_PUBLIC_WA_NUMBER` (lihat `.env.example`), default 6285882971295.
- Link modal proyek: `/#proyek-[slug]` (bisa dikirim admin ke calon klien lewat tombol "Salin Link").

## Konfigurasi & keamanan

- Semua `NEXT_PUBLIC_*` **bersifat publik** (ikut ke browser). Jangan menaruh secret di sana.
- Header di `next.config.ts` **tidak berlaku** di static export. Header keamanan ada di `vercel.json` (Vercel)
  dan `public/_headers` (Netlify/Cloudflare).
- CSP memakai `script-src 'self' 'unsafe-inline'` karena Next.js menyisipkan inline script hidrasi. Untuk CSP
  tanpa `unsafe-inline` perlu nonce/hash yang membutuhkan server, jadi trade-off ini dipilih untuk situs statis.
- `react/no-danger` aktif. JSON-LD dirender lewat `src/components/JsonLd.tsx` tanpa `dangerouslySetInnerHTML`.
- Satu iframe Google Maps di section Kontak (CSP `frame-src https://www.google.com`). Tanpa embed medsos atau tracking.

## Deploy (Vercel)

Root Directory: `akaa-construction-web`. Build & header sudah diatur di `vercel.json`.

## Hak cipta & privasi

- Foto dari Instagram AKAA (@akaa.construction, @akaa.official21) dan kiriman pemilik. **Pastikan izin klien** sebelum mempublikasikan foto rumah mereka.
- Lokasi proyek cukup tingkat kawasan/kota. Wajah, plat nomor, dan nomor rumah jangan ditampilkan.
