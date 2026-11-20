import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan | AKAA Construction' };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="blueprint flex flex-1 flex-col items-center justify-center gap-5 px-4 py-28 text-center">
      <p className="font-display text-8xl font-black text-accent-text">404</p>
      <h1 className="font-display text-3xl font-extrabold uppercase sm:text-5xl">
        Halaman tidak ditemukan
      </h1>
      <p className="text-muted">Halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-12 items-center rounded-md bg-accent px-6 font-bold text-accent-ink"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
