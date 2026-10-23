import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan' };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
      <p className="animate-in font-serif text-8xl text-accent">404</p>
      <h1 className="animate-in font-serif text-3xl sm:text-5xl">Halaman Tidak Ditemukan</h1>
      <p className="text-muted">Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-strong"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/#katalog"
          className="rounded-full border border-line px-6 py-3 text-sm hover:border-accent"
        >
          Lihat Katalog
        </Link>
      </div>
    </section>
  );
}
