'use client';

// Brosur resmi dari IG. Klik untuk memperbesar (dialog native), lalu chat WA.
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowIcon, CloseIcon } from './icons';
import { posters, type Poster } from '@/data/media';

export function Posters() {
  const dlg = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<Poster | null>(null);

  const show = (p: Poster, el: HTMLButtonElement) => {
    trigger.current = el;
    setOpen(p);
    dlg.current?.showModal();
  };
  const close = () => {
    dlg.current?.close();
    setOpen(null);
    trigger.current?.focus();
  };

  return (
    <section id="brosur" className="border-y border-line bg-surface-2/50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_2fr]">
        <div className="reveal">
          <p className="eyebrow">Brosur</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
            Info layanan terbaru
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Brosur resmi AKAA dari Instagram. Ketuk untuk memperbesar, lalu tanyakan detailnya
            langsung ke admin.
          </p>
        </div>
        <ul data-stagger className="grid grid-cols-3 gap-3 sm:gap-5">
          {posters.map((p, i) => (
            <li key={p.src} className={`reveal ${i === 1 ? 'sm:-translate-y-6' : ''}`}>
              <button
                type="button"
                onClick={(e) => show(p, e.currentTarget)}
                aria-label={`Perbesar brosur: ${p.title}`}
                className="group relative block aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface shadow-lg ring-accent transition hover:-translate-y-1 hover:ring-2"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 260px, 33vw"
                  className="object-cover"
                />
              </button>
              <p className="mt-2 text-xs font-semibold sm:text-sm">{p.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dlg}
        aria-label={open?.title ?? 'Brosur'}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[92vh] w-[min(92vw,480px)] overflow-hidden rounded-2xl bg-surface p-0 text-foreground backdrop:bg-night/80 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="flex max-h-[92vh] flex-col">
            <div className="relative min-h-0 flex-1 overflow-y-auto">
              <Image
                src={open.src}
                alt={open.alt}
                width={720}
                height={1080}
                sizes="480px"
                className="h-auto w-full"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Tutup brosur"
                className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-night/70 text-white hover:bg-night"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <a
              href={open.order ? `/kontak#pesan-${open.order}` : '/kontak#konsultasi'}
              onClick={() => {
                dlg.current?.close();
                setOpen(null);
              }}
              className="m-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent font-bold text-accent-ink hover:brightness-95"
            >
              {open.order ? 'Pesan sekarang' : 'Konsultasi gratis'} <ArrowIcon className="size-5" />
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}
