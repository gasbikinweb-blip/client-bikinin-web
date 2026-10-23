'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { projectVideos, type VideoProjectItem } from '@/data/projects';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from './icons';

/**
 * Showcase Video Bergaya Melengkung (Curved Gallery Strip) & Geser Kanan-Kiri (Carousel)
 * Sesuai gambar referensi "Engage Audiences with Stunning Videos":
 * - Pill badge hangat di bagian atas
 * - Judul tebal dengan aksen garis lengkung & panah dekoratif ("Survei Gratis se-Batam")
 * - Deretan kartu video vertikal (9:16) yang bisa digeser kanan-kiri (scroll-snap, drag, & tombol panah),
 *   dengan efek skala/lengkungan halus seperti galeri sinematik
 * - Klik kartu untuk langsung memutar video lengkap dengan audio asli (otomatis menghentikan video lain yang sedang berputar)
 * - Tombol CTA pil dengan aksen dekoratif di bagian bawah
 */
export function VideoShowcaseCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(2); // Fokus awal di tengah (kartu ke-3 dari 5)

  // Geser track ke kiri / kanan dengan mulus
  const scrollByStep = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIdx = Math.max(0, Math.min(projectVideos.length - 1, activeIndex + direction));
    setActiveIndex(nextIdx);
    const cards = track.querySelectorAll<HTMLElement>('[data-video-card]');
    const targetCard = cards[nextIdx];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    } else {
      track.scrollBy({ left: direction * 290, behavior: 'smooth' });
    }
  };

  const focusCard = (index: number) => {
    setActiveIndex(index);
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-video-card]');
    cards[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  // Putar / jeda video dengan audio asli, serta hentikan video lain agar suara tidak bertumpuk
  const togglePlay = (video: VideoProjectItem, index: number) => {
    focusCard(index);
    const currentEl = videoRefs.current.get(video.id);
    if (!currentEl) return;

    // Hentikan video lain yang sedang berputar
    videoRefs.current.forEach((el, id) => {
      if (id !== video.id && !el.paused) {
        el.pause();
      }
    });

    if (currentEl.paused) {
      void currentEl.play();
      setPlayingId(video.id);
    } else {
      currentEl.pause();
      setPlayingId(null);
    }
  };

  return (
    <section
      id="video-pemasangan"
      aria-labelledby="video-pemasangan-heading"
      className="relative scroll-mt-24 overflow-hidden rounded-[2.25rem] border border-line bg-surface px-4 py-14 shadow-lg sm:px-8 sm:py-16 lg:py-20"
    >
      {/* ---------- 1. Header Tengah + Dekorasi Garis Tangan & Panah Melengkung ---------- */}
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Pill Badge Atas ala "Join over 100,000 happy creators" */}
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground shadow-sm">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          <span>Dokumentasi Video &amp; Audio Asli • {projectVideos.length} Video Proyek</span>
        </div>

        {/* Judul Besar dengan Aksen Sparkle Kiri & Panah Melengkung Kanan */}
        <div className="relative mt-5">
          {/* Aksen garis sparkle kiri bawah judul (seperti di referensi) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="pointer-events-none absolute -bottom-3 left-2 hidden size-9 text-foreground/70 md:block lg:left-6"
          >
            <path
              d="M34 10 L14 26 M38 22 L18 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <h3
            id="video-pemasangan-heading"
            className="font-serif text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Ciptakan Pengalaman Ruang
            <br />
            yang <span className="text-accent">Lebih Berkelas</span>
          </h3>

          {/* Aksen tulisan miring + panah melengkung di kanan (seperti "Elevate your brand" di referensi) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -bottom-12 hidden flex-col items-center lg:flex xl:right-2"
          >
            <span className="-rotate-12 font-serif text-sm font-semibold italic text-foreground/85">
              Hasil rapi &amp; nyata
            </span>
            <svg viewBox="0 0 90 70" className="mt-1 h-14 w-20 text-foreground/75">
              <path
                d="M10 12 C 45 14, 68 28, 56 58"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M46 50 L55 60 L66 51"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Geser ke kanan atau kiri dan klik kartu video untuk menonton langsung hasil pemasangan tim{' '}
          <strong className="font-semibold text-foreground">{siteConfig.name}</strong> lengkap
          dengan audio asli.
        </p>

        {/* Tombol Navigasi Geser Kiri / Kanan */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            aria-label="Geser video ke kiri"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-background text-foreground shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-background"
          >
            <ArrowIcon className="size-4 rotate-180" />
          </button>

          {/* Indikator Titik Aktif */}
          <div className="flex items-center gap-1.5 px-2" role="tablist" aria-label="Pilih video">
            {projectVideos.map((v, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Fokus ke ${v.title}`}
                  onClick={() => focusCard(idx)}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    isCurrent ? 'w-7 bg-accent' : 'w-2 bg-foreground/25 hover:bg-foreground/45'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollByStep(1)}
            aria-label="Geser video ke kanan"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-background text-foreground shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-background"
          >
            <ArrowIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* ---------- 2. Curved Horizontal Scrollable Video Strip (Geser Kanan-Kiri) ---------- */}
      <div className="relative mt-10">
        {/* Efek Fade Lembut di Tepi Kiri & Kanan */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-surface to-transparent sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-surface to-transparent sm:block"
        />

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-4 py-6 [scrollbar-width:none] sm:gap-6 sm:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {projectVideos.map((video, idx) => {
            const isPlaying = playingId === video.id;
            const isFocused = activeIndex === idx;
            // Pola siluet kurva melengkung (tinggi di tepi luar, cekung rapi di tengah seperti gambar referensi)
            const distFromCenter = Math.abs(idx - 2);
            const curveHeightClass =
              distFromCenter === 2
                ? 'sm:h-[430px]'
                : distFromCenter === 1
                  ? 'sm:h-[395px]'
                  : 'sm:h-[370px]';

            return (
              <article
                key={video.id}
                data-video-card
                onClick={() => focusCard(idx)}
                className={`group relative h-[380px] w-[240px] shrink-0 snap-center overflow-hidden rounded-[2rem] border-2 bg-black shadow-xl transition-all duration-500 sm:w-[255px] ${curveHeightClass} ${
                  isFocused || isPlaying
                    ? 'scale-[1.03] border-accent shadow-2xl ring-4 ring-accent/20'
                    : 'border-white/20 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Poster Gambar (selalu tampil tajam sebelum video diputar) */}
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  sizes="260px"
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Elemen Video HTML5 dengan Audio Asli */}
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current.set(video.id, el);
                    } else {
                      videoRefs.current.delete(video.id);
                    }
                  }}
                  src={video.src}
                  poster={video.poster}
                  playsInline
                  preload="metadata"
                  controls={isPlaying}
                  onPlay={() => {
                    // Matikan video lain jika diputar lewat kontrol native
                    videoRefs.current.forEach((otherEl, otherId) => {
                      if (otherId !== video.id && !otherEl.paused) {
                        otherEl.pause();
                      }
                    });
                    setPlayingId(video.id);
                    setActiveIndex(idx);
                  }}
                  onPause={() => {
                    if (playingId === video.id) setPlayingId(null);
                  }}
                  onEnded={() => {
                    if (playingId === video.id) setPlayingId(null);
                  }}
                  aria-label={video.title}
                  className={`relative z-10 h-full w-full object-cover transition-opacity duration-300 ${
                    isPlaying ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  Browser Anda tidak mendukung pemutaran video HTML5.
                </video>

                {/* Overlay Interaktif saat Video Belum Diputar */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(video, idx);
                    }}
                    aria-label={`Putar video ${video.title} dengan suara`}
                    className="theme-dark absolute inset-0 z-20 flex w-full cursor-pointer flex-col justify-between bg-gradient-to-t from-black/85 via-black/15 to-black/45 p-4 text-left transition-opacity duration-300"
                  >
                    {/* Badge Atas: Nomor & Indikator Audio */}
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                        {video.productType}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[10px] font-bold text-[#12100d] shadow-sm">
                        <span aria-hidden="true">🔊</span>
                        <span>Audio</span>
                      </span>
                    </div>

                    {/* Tombol Play di Tengah */}
                    <div className="my-auto flex items-center justify-center">
                      <span className="grid size-14 place-items-center rounded-full border border-white/40 bg-black/60 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-[#12100d]">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="ml-0.5 size-6 fill-current"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>

                    {/* Info Judul & Ruangan di Bawah Kartu */}
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-accent-strong uppercase">
                        {video.roomType} • {video.location ?? 'Batam'}
                      </p>
                      <h4 className="mt-1 line-clamp-2 font-serif text-lg leading-snug font-medium text-white">
                        {video.title}
                      </h4>
                    </div>
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* ---------- 3. Footer CTA Pill + Tulisan "Gratis Survei!" & Panah (Sesuai Referensi) ---------- */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="relative inline-flex items-center">
          {/* Aksen teks "Gratis Survei!" + panah kecil di kiri tombol seperti "It's free ->" di referensi */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -bottom-2 hidden items-center gap-1.5 sm:flex"
          >
            <span className="-rotate-12 font-serif text-sm font-semibold italic text-foreground/85">
              Gratis survei!
            </span>
            <svg viewBox="0 0 50 32" className="h-7 w-11 text-foreground/75">
              <path
                d="M4 22 C 18 26, 30 22, 42 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M34 10 L43 11 L40 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full border-2 border-dashed border-accent/60 bg-accent px-8 py-3.5 text-sm font-semibold whitespace-nowrap text-background shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span>Minta Survei Gratis</span>
          </a>
        </div>
      </div>
    </section>
  );
}
