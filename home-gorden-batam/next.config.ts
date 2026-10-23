import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hasil build berupa file statis di folder /out
  output: 'export',
  // Optimasi gambar butuh server, jadi dimatikan untuk static export
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Hanya untuk `npm run dev`: izinkan membuka dev server dari HP lewat IP lokal atau tunnel ngrok.
  // Tidak berpengaruh pada hasil build. Sesuaikan IP dengan komputer kamu.
  allowedDevOrigins: [
    '192.168.100.5',
    '*.ngrok-free.app',
    '*.ngrok-free.dev',
    '*.ngrok.app',
    '*.ngrok.io',
  ],
  // Catatan: headers() TIDAK berfungsi di static export.
  // Atur security headers di hosting (public/_headers atau vercel.json).
};

export default nextConfig;
