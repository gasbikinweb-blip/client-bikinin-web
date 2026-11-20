'use client';

// Klip video pendek dari IG (dengan suara asli). Diputar otomatis tanpa suara hanya saat terlihat;
// tombol speaker menyalakan suara (satu video bersuara sekaligus).
// tidak autoplay bila pengguna memilih "kurangi animasi".
import { useEffect, useRef, useState } from 'react';
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from './icons';
import { reels, type Reel } from '@/data/media';
import { VideoLightbox } from './VideoLightbox';
import { site } from '@/data/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

function ReelCard({ r, onOpen }: { r: Reel; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Hanya satu video bersuara: bila video lain dinyalakan suaranya, video ini dibisukan
  useEffect(() => {
    const onOther = (e: Event) => {
      const v = ref.current;
      if (v && (e as CustomEvent<HTMLVideoElement | null>).detail !== v) {
        v.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener('reel-sound', onOther);
    return () => window.removeEventListener('reel-sound', onOther);
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) {
      window.dispatchEvent(new CustomEvent('reel-sound', { detail: v }));
      v.play().catch(() => {});
    }
  };

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const msg = `Halo AKAA Construction, saya lihat video "${r.title}" (${r.place}) di website. Saya mau konsultasi untuk pekerjaan serupa.`;

  return (
    <li className="reveal w-[72vw] max-w-[260px] shrink-0 snap-start sm:w-[240px]">
      <div className="group relative aspect-[9/14] overflow-hidden rounded-2xl bg-night shadow-lg">
        <video
          ref={ref}
          src={`/reels/${r.slug}.mp4`}
          poster={`/reels/${r.slug}.webp`}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={`Video: ${r.title}, ${r.place}`}
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/10 to-night/30"
        />
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Putar layar penuh: ${r.title}`}
          className="absolute inset-0 cursor-zoom-in"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Jeda video ${r.title}` : `Putar video ${r.title}`}
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-night/60 text-white backdrop-blur hover:bg-night"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? `Nyalakan suara video ${r.title}` : `Matikan suara video ${r.title}`}
          className="absolute top-15 right-3 grid size-10 place-items-center rounded-full bg-night/60 text-white backdrop-blur hover:bg-night aria-pressed:bg-accent aria-pressed:text-accent-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
            {muted ? (
              <path d="m22 9-6 6m0-6 6 6" />
            ) : (
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            )}
          </svg>
        </button>
        <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-ink">
          {shortDate(r.date)}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="font-display text-lg leading-tight font-extrabold uppercase">{r.title}</p>
          <p className="mt-0.5 text-xs text-white/75">{r.place}</p>
          <div className="mt-3 flex gap-2">
            <a
              href={buildWhatsAppLink(msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-wa px-3 text-xs font-bold text-white hover:brightness-110"
            >
              <WhatsAppIcon className="size-4" /> Mau seperti ini
              <span className="sr-only"> (WhatsApp, tab baru)</span>
            </a>
            {r.project && (
              <a
                href={`/proyek#proyek-${r.project}`}
                aria-label={`Lihat detail proyek ${r.place}`}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/40 hover:border-white"
              >
                <ArrowIcon className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function Reels() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="video" className="overflow-hidden bg-night py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow !text-accent">Langsung dari lapangan</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
              Lihat tim AKAA bekerja
            </h2>
            <p className="mt-4 text-white/70">
              Rekaman asli progress proyek terbaru. Tanpa render, tanpa gambar stok.
            </p>
          </div>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-bold hover:border-white"
          >
            <InstagramIcon className="size-4" /> Video lainnya di Instagram
            <span className="sr-only"> (tab baru)</span>
          </a>
        </div>
      </div>
      {/* Baris geser: rata kiri dengan container, menembus ke tepi kanan layar */}
      <ul
        data-stagger
        className="mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 xl:scroll-px-[calc((100vw-80rem)/2+1.5rem)] xl:px-[calc((100vw-80rem)/2+1.5rem)]"
      >
        {reels.map((r, i) => (
          <ReelCard key={r.slug} r={r} onOpen={() => setOpen(i)} />
        ))}
      </ul>
      <VideoLightbox
        items={reels.map((r) => ({
          src: `/reels/${r.slug}.mp4`,
          poster: `/reels/${r.slug}.webp`,
          title: r.title,
          sub: r.place,
        }))}
        index={open}
        onIndex={setOpen}
      />
    </section>
  );
}
