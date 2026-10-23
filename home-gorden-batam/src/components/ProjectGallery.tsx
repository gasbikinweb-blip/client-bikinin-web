'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type ProjectFilterCategory, type ProjectItem, projects } from '@/data/projects';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { VideoShowcaseCarousel } from './VideoShowcaseCarousel';

const FILTER_OPTIONS: readonly ('Semua' | ProjectFilterCategory)[] = [
  'Semua',
  'Gorden',
  'Vitrase',
  'Blinds',
  'Wallpaper',
  'Ruko/Kantor',
] as const;

const INITIAL_PHOTO_COUNT = 12;

export function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<'Semua' | ProjectFilterCategory>('Semua');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastFocusedIdRef = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const filteredProjects: readonly ProjectItem[] =
    activeFilter === 'Semua'
      ? projects
      : projects.filter((item) => item.filterCategory === activeFilter);

  const displayedProjects =
    showAllPhotos || activeFilter !== 'Semua'
      ? filteredProjects
      : filteredProjects.slice(0, INITIAL_PHOTO_COUNT);

  const activeItem = lightboxIndex !== null ? filteredProjects[lightboxIndex] : undefined;

  const openLightbox = useCallback((index: number, itemId: string) => {
    lastFocusedIdRef.current = itemId;
    setLightboxIndex(index);
    window.requestAnimationFrame(() => {
      setIsLightboxVisible(true);
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false);
    const triggerId = lastFocusedIdRef.current;
    window.setTimeout(() => {
      setLightboxIndex(null);
      if (triggerId) {
        triggerRefs.current.get(triggerId)?.focus();
      }
    }, 260);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredProjects.length === 0) return null;
      return (prev - 1 + filteredProjects.length) % filteredProjects.length;
    });
  }, [filteredProjects.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredProjects.length === 0) return null;
      return (prev + 1) % filteredProjects.length;
    });
  }, [filteredProjects.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="space-y-24">
      {/* Bagian 1: Filter Kategori Terpusat & Grid Foto Portofolio Sejajar Rapi */}
      <section aria-labelledby="judul-portofolio">
        <div className="flex flex-col items-center text-center">
          {/* Filter Kategori Terpusat Satu Baris Rapi */}
          <div
            role="toolbar"
            aria-label="Filter kategori portofolio"
            className="-mx-4 flex max-w-full gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {FILTER_OPTIONS.map((category) => {
              const isSelected = activeFilter === category;
              const count =
                category === 'Semua'
                  ? projects.length
                  : projects.filter((p) => p.filterCategory === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveFilter(category);
                    setIsLightboxVisible(false);
                    setLightboxIndex(null);
                  }}
                  aria-pressed={isSelected}
                  className={`shrink-0 cursor-pointer rounded-full border px-5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 sm:text-sm ${
                    isSelected
                      ? 'border-accent bg-accent text-background shadow-md shadow-accent/20'
                      : 'border-line bg-surface text-muted hover:border-accent/50 hover:text-foreground'
                  }`}
                >
                  {category} <sup className="ml-0.5 text-[10px] opacity-75">{count}</sup>
                </button>
              );
            })}
          </div>

          <p className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted">
            <span>
              Menampilkan{' '}
              <strong className="font-semibold text-foreground">{filteredProjects.length}</strong>{' '}
              dokumentasi foto • Klik kartu untuk memperbesar.
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Referensi desain ditandai</span>
              <span className="inline-block rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
                Ilustrasi
              </span>
            </span>
          </p>
        </div>

        {/* Grid Foto SEJAJAR RAPI (tanpa offset naik-turun, responsif di zoom 120%) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProjects.map((item, idx) => {
            const isIllustration = item.kind === 'ilustrasi';
            return (
              <article
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-xl"
              >
                <button
                  type="button"
                  ref={(el) => {
                    if (el) {
                      triggerRefs.current.set(item.id, el);
                    } else {
                      triggerRefs.current.delete(item.id);
                    }
                  }}
                  onClick={() => openLightbox(idx, item.id)}
                  aria-label={`Lihat detail proyek ${item.productType} - ${item.roomType}`}
                  className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Image
                    src={item.thumbSrc}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35 opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                  {/* 2 Frosted Glass Pills di Kiri Atas (Truncate rapi supaya tidak pecah di zoom 120%) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5 overflow-hidden">
                    <span className="shrink-0 rounded-full border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                      {item.filterCategory}
                    </span>
                    {isIllustration ? (
                      <span className="shrink-0 rounded-full bg-navy/95 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm backdrop-blur-md">
                        Ilustrasi
                      </span>
                    ) : (
                      <span className="truncate rounded-full border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white uppercase backdrop-blur-md">
                        {item.roomType}
                      </span>
                    )}
                  </div>

                  {/* Lingkaran "Lihat" di Tengah saat Hover */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="grid size-14 scale-90 place-items-center rounded-full border border-white/35 bg-black/70 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      Detail
                    </span>
                  </div>
                </button>

                {/* Caption Sejajar Rapi di Bawah Gambar */}
                <div className=" flex flex-1 flex-col justify-between px-2 pt-4 pb-1">
                  <div>
                    <h4 className="line-clamp-1 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                      <button
                        type="button"
                        onClick={() => openLightbox(idx, item.id)}
                        className="cursor-pointer text-left"
                      >
                        {item.productType}
                      </button>
                    </h4>
                    <p className="mt-1 line-clamp-1 text-xs text-muted">
                      {item.roomType}
                      {item.location ? ` • ${item.location}` : ' • Batam'}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-xs">
                    <span className="text-muted">
                      {isIllustration ? 'Referensi Desain' : 'Proyek Terpasang'}
                    </span>
                    <button
                      type="button"
                      onClick={() => openLightbox(idx, item.id)}
                      className="cursor-pointer font-semibold text-accent hover:underline"
                    >
                      Lihat Detail ↗
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Tombol Tampilkan Semua Foto Proyek */}
        {activeFilter === 'Semua' && filteredProjects.length > INITIAL_PHOTO_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllPhotos((prev) => !prev)}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-accent/50 bg-surface px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-background"
            >
              {showAllPhotos
                ? 'Ringkas Tampilan Foto'
                : `Tampilkan Semua ${filteredProjects.length} Foto Proyek`}
            </button>
          </div>
        )}
      </section>

      {/* Bagian 2: Banner Arsitektural "INTERIOR BATAM" */}
      <div className="relative overflow-hidden py-4">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none text-center font-serif text-5xl leading-none font-bold tracking-tight text-foreground/[0.06] uppercase sm:text-8xl lg:text-[10rem]"
        >
          Interior Batam
        </p>
        <div className="relative -mt-4 mx-auto max-w-5xl overflow-hidden rounded-3xl border-4 border-surface bg-surface-2 shadow-2xl sm:-mt-10">
          <div className="relative aspect-[16/7] w-full sm:aspect-[21/7]">
            <Image
              src="/projects/gorden-minimalis-krem-ruang-tamu-modern-01.webp"
              alt="Panorama interior jendela dan gorden modern di Batam"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/75" />
            <div className="theme-dark absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-accent-strong uppercase sm:text-xs">
                • Survei &amp; Pengukuran Gratis se-Batam
              </p>
              <p className="mt-2 font-serif text-xl font-medium text-foreground sm:text-3xl lg:text-4xl">
                Proporsi Lipatan Simetris untuk Setiap Bukaan Jendela
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 3: 5 Video Dokumentasi Pemasangan (Geser Kanan-Kiri & Audio Asli) */}
      <VideoShowcaseCarousel />

      {/* Lightbox Modal Proyek Bergaya Sinematik "ARCHEVO" (Sesuai Gambar Referensi) */}
      {activeItem && lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-desc"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 transition-all duration-300 ease-out sm:p-5 lg:p-8 ${
            isLightboxVisible
              ? 'bg-black/85 opacity-100 backdrop-blur-md'
              : 'pointer-events-none bg-black/0 opacity-0 backdrop-blur-none'
          }`}
        >
          <div
            className={`theme-dark relative flex max-h-[94dvh] min-h-[540px] w-full max-w-6xl flex-col justify-between overflow-y-auto rounded-3xl border border-white/15 bg-[#12100d] text-[#f5efe6] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[650px] lg:overflow-hidden ${
              isLightboxVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-6 scale-95 opacity-0'
            }`}
          >
            {/* Background Foto Proyek Full-Bleed + Gradasi Gelap Kiri & Bawah */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <Image
                key={activeItem.src}
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="(min-width: 1024px) 1150px, 100vw"
                className="animate-in object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#100e0b] via-[#100e0b]/85 to-[#100e0b]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-transparent to-[#0d0b09]/75" />
            </div>

            {/* 1. Top Bar ala ARCEVO */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/12 px-5 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/brand/logo.webp"
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-full ring-1 ring-[#c8a98e]/50"
                />
                <span className="font-serif text-sm font-semibold tracking-[0.22em] text-white uppercase">
                  {siteConfig.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Proyek sebelumnya (Panah Kiri)"
                  className="grid size-9 cursor-pointer place-items-center rounded-lg border border-white/20 bg-black/50 text-white transition-colors hover:border-[#c8a98e] hover:text-[#c8a98e]"
                >
                  &#8592;
                </button>
                <span className="rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 font-mono text-xs text-[#c8a98e]">
                  {lightboxIndex + 1} / {filteredProjects.length}
                </span>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Proyek berikutnya (Panah Kanan)"
                  className="grid size-9 cursor-pointer place-items-center rounded-lg border border-white/20 bg-black/50 text-white transition-colors hover:border-[#c8a98e] hover:text-[#c8a98e]"
                >
                  &#8594;
                </button>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Tutup detail proyek (Escape)"
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-white/25 bg-black/55 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#c8a98e] hover:text-[#c8a98e]"
              >
                <span>Tutup (Esc)</span>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* 2. Konten Tengah Kiri ala ARCEVO + Pratinjau Foto Utuh di Kanan */}
            <div className="relative z-10 grid items-center gap-8 px-5 py-6 sm:px-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-[#c8a98e] uppercase">
                  {activeItem.filterCategory} &nbsp;•&nbsp; {activeItem.roomType} &nbsp;•&nbsp;{' '}
                  {activeItem.kind === 'ilustrasi' ? 'ILUSTRASI DESAIN' : 'PROYEK TERPASANG'}
                </p>

                <h3
                  id="lightbox-title"
                  className="mt-3 font-serif text-3xl leading-[1.06] font-medium text-white sm:text-5xl"
                >
                  {activeItem.productType}.
                  <span className="mt-1 block text-[#c8a98e]/90">{activeItem.roomType}.</span>
                </h3>

                <div className="mt-5 h-px w-12 bg-white/35" aria-hidden="true" />

                <p
                  id="lightbox-desc"
                  className="mt-5 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base"
                >
                  {activeItem.alt}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={buildWhatsAppLink(
                      `Halo ${siteConfig.name}, saya tertarik dengan model "${activeItem.productType}" untuk ${activeItem.roomType} seperti di portofolio (${activeItem.id}). Bisa minta jadwal survei gratis ke lokasi saya di Batam?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[#b89b82] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[#12100d] uppercase shadow-lg transition-all hover:bg-[#cbb099]"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>Pesan Model Serupa</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={showNext}
                    className="group inline-flex min-h-12 cursor-pointer items-center gap-3 text-xs font-semibold tracking-[0.18em] text-white/90 uppercase transition-colors hover:text-[#c8a98e]"
                  >
                    <span className="grid size-11 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-colors group-hover:border-[#c8a98e]">
                      &#8594;
                    </span>
                    <span>Proyek Berikutnya</span>
                  </button>
                </div>
              </div>

              {/* Kartu Pratinjau Foto Utuh (Tidak Terpotong) di Kanan */}
              <div className="flex justify-center lg:col-span-6 lg:justify-end">
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/70 p-2 shadow-2xl backdrop-blur-md">
                  <Image
                    key={`preview-${activeItem.src}`}
                    src={activeItem.src}
                    alt={activeItem.alt}
                    width={activeItem.width}
                    height={activeItem.height}
                    className="max-h-[42vh] w-auto rounded-xl object-contain sm:max-h-[48vh]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Bottom Bar 4 Kolom ala ARCEVO */}
            <div className="relative z-10 border-t border-white/12 bg-black/65 px-5 py-4 backdrop-blur-md sm:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/12">
                <div className="lg:pr-6">
                  <p className="font-serif text-xl font-medium text-white sm:text-2xl">
                    {activeItem.filterCategory}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                    KATEGORI PRODUK
                  </p>
                </div>
                <div className="lg:px-6">
                  <p className="font-serif text-xl font-medium text-white sm:text-2xl">
                    {activeItem.roomType}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                    AREA RUANGAN
                  </p>
                </div>
                <div className="lg:px-6">
                  <p className="font-serif text-xl font-medium text-white sm:text-2xl">
                    {activeItem.location ?? 'Batam'}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                    LOKASI KAWASAN
                  </p>
                </div>
                <div className="lg:pl-6">
                  <p className="font-serif text-xl font-medium text-[#c8a98e] sm:text-2xl">
                    {activeItem.kind === 'ilustrasi' ? 'Ilustrasi' : 'Survei Gratis'}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                    STATUS DOKUMENTASI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
