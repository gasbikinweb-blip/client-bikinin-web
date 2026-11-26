// Bagian bersama untuk halaman selain beranda (server component)
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './icons';
import { projects } from '@/data/projects';
import { ProjectCarousel } from './ProjectCarousel';

/** Banner atas halaman: satu-satunya h1 di halaman tersebut */
export function PageHeader({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/90 via-night/70 to-night/40" />
        </>
      )}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="eyebrow animate-in !text-accent">{eyebrow}</p>
        <h1
          className="animate-in mt-4 max-w-3xl font-display text-[length:clamp(1.75rem,9vw,2.25rem)] leading-[1.05] font-black uppercase [overflow-wrap:anywhere] sm:text-6xl"
          style={{ '--delay': '120ms' } as React.CSSProperties}
        >
          {title}
        </h1>
        {text && (
          <p
            className="animate-in mt-5 max-w-2xl text-lg text-white/80"
            style={{ '--delay': '240ms' } as React.CSSProperties}
          >
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

/** 3 proyek unggulan di beranda; klik membuka modal di halaman Proyek */
export function FeaturedProjects() {
  const list = projects
    .filter((p) => p.featured)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      meta: [p.year, p.location].filter(Boolean).join(' · '),
      photos: p.images.length,
      cover: p.cover,
    }));
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Proyek pilihan</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
            Hasil kerja kami
          </h2>
        </div>
        <Link
          href="/proyek"
          className="group inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold text-accent-text"
        >
          Lihat semua proyek <ArrowIcon className="size-5" />
        </Link>
      </div>
      <ProjectCarousel items={list} />
    </section>
  );
}

/** Ajakan konsultasi di akhir halaman */
export function CtaBand({ title = 'Siap mulai proyek Anda?' }: { title?: string }) {
  return (
    <section className="bg-accent text-accent-ink">
      <div className="reveal mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-display text-3xl font-black uppercase sm:text-4xl">{title}</h2>
          <p className="mt-2 opacity-85">Konsultasi gratis via WhatsApp, survei dan RAB jelas.</p>
        </div>
        <a
          href="/kontak#konsultasi"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-night px-6 font-bold text-white hover:brightness-110"
        >
          Konsultasi Gratis <ArrowIcon className="size-5" />
        </a>
      </div>
    </section>
  );
}
