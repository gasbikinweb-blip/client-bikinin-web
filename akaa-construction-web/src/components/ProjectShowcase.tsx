'use client';

// Hero halaman detail proyek: foto terpilih tampil besar sebagai "panggung" (bentuk lengkung),
// kartu foto lain berjejer di bawah. Klik kartu → foto itu jadi latar hero (crossfade).
// Panah kiri/kanan juga bisa dipakai saat fokus ada di dalam showcase.
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowIcon, WhatsAppIcon } from './icons';

type ShowcaseImage = {
  src: string;
  thumb: string;
  alt: string;
  kind: 'foto' | 'progress' | 'render';
};

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  images: readonly ShowcaseImage[];
  waHref: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function ProjectShowcase({ eyebrow, title, text, images, waHref }: Props) {
  const [index, setIndex] = useState(0);
  const strip = useRef<HTMLUListElement>(null);
  const total = images.length;
  const current = images[index] ?? images[0];
  if (!current) return null;

  const show = (i: number) => {
    const next = (i + total) % total;
    setIndex(next);
    // Gulir strip saja (bukan halaman/section) agar kartu aktif ada di tengah
    const list = strip.current;
    const card = list?.children[next] as HTMLElement | undefined;
    if (list && card) {
      list.scrollTo({
        left: card.offsetLeft - list.offsetLeft - (list.clientWidth - card.clientWidth) / 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      aria-label={`Galeri proyek ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') show(index + 1);
        if (e.key === 'ArrowLeft') show(index - 1);
      }}
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:pt-14">
        {/* Teks kiri */}
        <div className="flex flex-col justify-center lg:py-10">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.02] font-black uppercase sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {text && <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{text}</p>}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-night py-2 pr-6 pl-2 font-bold text-white transition hover:bg-night-2 dark:bg-surface-2 dark:hover:bg-surface"
          >
            <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-ink">
              <WhatsAppIcon className="size-5" />
            </span>
            Konsultasikan Proyek Serupa
            <span className="sr-only"> (tab baru)</span>
          </a>

          {/* Penanda foto ke berapa + navigasi */}
          {total > 1 && (
            <div className="mt-10 flex items-center gap-4">
              <p className="font-display text-sm font-extrabold tabular-nums" aria-live="polite">
                <span className="text-2xl text-accent-text">{pad(index + 1)}</span>
                <span className="text-muted"> / {pad(total)}</span>
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
              <button
                type="button"
                onClick={() => show(index - 1)}
                className="grid size-11 place-items-center rounded-full border border-line transition hover:border-accent"
              >
                <span className="sr-only">Foto sebelumnya</span>
                <ArrowIcon dir="left" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => show(index + 1)}
                className="grid size-11 place-items-center rounded-full border border-line transition hover:border-accent"
              >
                <span className="sr-only">Foto berikutnya</span>
                <ArrowIcon className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Foto besar berbentuk lengkung */}
        <figure className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-surface-2 shadow-[0_40px_80px_-50px_rgb(0_0_0/0.6)] lg:aspect-[5/4] lg:rounded-tl-[12rem]">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="showcase-fade object-cover"
            />
            {current.kind === 'render' && (
              <span className="absolute top-4 right-4 rounded-full bg-night/85 px-3 py-1 text-xs font-bold text-white">
                Desain 3D
              </span>
            )}
            {/* Keterangan di dalam foto: gradasi gelap + label nomor, ala caption majalah */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night/85 via-night/40 to-transparent"
            />
            <figcaption
              key={`cap-${current.src}`}
              className="showcase-fade absolute inset-x-4 bottom-4 flex items-end gap-3 text-white sm:inset-x-6 sm:bottom-6"
            >
              <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 font-display text-xs font-extrabold text-accent-ink tabular-nums">
                {pad(index + 1)}
              </span>
              <span className="max-w-md text-sm leading-snug font-semibold text-balance drop-shadow sm:text-base">
                {current.alt}
              </span>
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Strip kartu foto */}
      {total > 1 && (
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 lg:pb-16">
          <ul
            ref={strip}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:px-0"
          >
            {images.map((img, i) => {
              const active = i === index;
              return (
                <li key={img.src} className="w-[16rem] shrink-0 snap-start sm:w-[19rem]">
                  <button
                    type="button"
                    onClick={() => show(i)}
                    aria-pressed={active}
                    className={`group flex h-full w-full items-center gap-3 rounded-2xl border p-2 text-left transition ${
                      active
                        ? 'border-accent bg-surface shadow-lg'
                        : 'border-line bg-surface/60 hover:border-accent/60 hover:bg-surface'
                    }`}
                  >
                    <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                      <Image
                        src={img.thumb}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold tracking-widest text-accent-text tabular-nums">
                        {pad(i + 1)}
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-sm leading-snug font-semibold">
                        {img.alt}
                      </span>
                    </span>
                    <ArrowIcon
                      className={`size-4 shrink-0 transition ${active ? 'text-accent-text' : 'text-muted group-hover:translate-x-0.5'}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
