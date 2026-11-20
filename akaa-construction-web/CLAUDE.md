# Panduan untuk Claude

Project ini adalah website katalog **statis** (Next.js 16 App Router, `output: 'export'`). Hanya frontend:
semua pertanyaan dan pemesanan lewat WhatsApp. Baca README.md untuk struktur lengkap.

## Wajib dipatuhi

- Tidak ada API routes, Server Actions, middleware, form yang mengirim data, keranjang, checkout, atau login.
- TypeScript strict; server component default, `'use client'` hanya untuk interaksi kecil.
- Dilarang `dangerouslySetInnerHTML` (rule ESLint `react/no-danger`). JSON-LD lewat `src/components/JsonLd.tsx`.
- Link eksternal: `target="_blank" rel="noopener noreferrer"`.
- Semua link WhatsApp lewat `buildWhatsAppLink()` / `productMessage()` di `src/lib/whatsapp.ts`.
- Konfigurasi toko hanya di `src/lib/config.ts` (nilai dari `NEXT_PUBLIC_*`, yang bersifat publik).
- Data produk di `src/data/*.ts` dengan tipe ketat. Data karangan ditandai `// TODO: ganti dengan data asli`.
- Gambar: foto asli di `assets-src/`, jalankan `npm run optimize-images`; pakai `next/image` dengan `fill` + `sizes`
  atau width/height, `alt` deskriptif, `priority` hanya di atas layar, rasio konsisten (anti-CLS).
- Warna lewat token CSS di `globals.css` (mode gelap `:root`, terang `[data-theme='light']`); kontras teks ≥ 4.5:1.
  Area teks di atas foto/video diberi kelas `.theme-dark`.
- Animasi scroll memakai kelas `reveal*` + `data-stagger`; semua animasi menghormati `prefers-reduced-motion`.
- Security headers diatur di `public/_headers` dan `vercel.json` (bukan `next.config.ts`). Tambah domain ke CSP
  hanya bila benar-benar perlu.
- Versi dependency exact; jangan tambah library tanpa alasan kuat.
- Teks UI dan komentar kode dalam bahasa Indonesia (singkat). Satu `h1` per halaman, HTML semantik, a11y.

## Alur kerja

1. Cek environment (`node -v`, `npm -v`) bila memulai.
2. Tampilkan rencana singkat dan tunggu konfirmasi sebelum perubahan besar.
3. Setelah mengubah kode: `npm run lint`, `npm run typecheck`, `npm run build` sampai bersih.
