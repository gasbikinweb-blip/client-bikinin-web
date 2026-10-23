'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCategory, type Product } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  product: Product | null;
  onClose: () => void;
};

/**
 * Modal detail produk bergaya sinematik "ARCHEVO" (sesuai gambar referensi):
 * - Full-bleed background foto produk dengan vignette gelap di sisi kiri & bawah
 * - Top bar di dalam modal: Logo Brand, switch tab foto (01, 02, 03), dan tombol Tutup
 * - Konten di sisi kiri: Eyebrow kategori, Judul Serif besar 2 warna (Putih + Champagne Gold),
 *   deskripsi, serta tombol utama "MINTA SURVEI GRATIS ↗" + tombol "LIHAT VIDEO"
 * - Bottom bar 4 kolom spesifikasi dengan ikon arsitektural minimalis & pembatas vertikal
 */
export function ProductDetailModal({ product, onClose }: Props) {
  const [renderedProduct, setRenderedProduct] = useState<Product | null>(product);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  if (product && product !== renderedProduct) {
    setRenderedProduct(product);
    setImageIndex(0);
  }

  const handleRequestClose = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(() => {
      setRenderedProduct(null);
      onClose();
    }, 280);
  }, [onClose]);

  useEffect(() => {
    if (!product) return;
    const imageCount = product.images.length;

    const rafId = window.requestAnimationFrame(() => {
      setIsVisible(true);
      closeButtonRef.current?.focus();
    });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleRequestClose();
        return;
      }
      if (e.key === 'ArrowRight' && imageCount > 1) {
        e.preventDefault();
        setImageIndex((prev) => (prev + 1) % imageCount);
        return;
      }
      if (e.key === 'ArrowLeft' && imageCount > 1) {
        e.preventDefault();
        setImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
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
      window.cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, handleRequestClose]);

  const activeProduct = product ?? renderedProduct;
  if (!activeProduct) return null;

  const category = getCategory(activeProduct.category);
  const currentImg = activeProduct.images[imageIndex] ?? activeProduct.images[0];

  const waOrderUrl = buildWhatsAppLink(
    productMessage({
      slug: activeProduct.slug,
      name: activeProduct.name,
      material: activeProduct.specs.material,
      dimensions: activeProduct.specs.dimensions,
      colors: activeProduct.specs.colors,
      suitableRooms: activeProduct.suitableRooms,
    }),
  );

  const waSampleUrl = buildWhatsAppLink(
    `Halo ${siteConfig.name}, saya ingin lihat sampel bahan dan konsultasi untuk ${activeProduct.name} di Batam.`,
  );

  // 4 Kolom Statistik / Spesifikasi Bawah ala ARCEVO (120+ / 15+ / 80+ / 12)
  const bottomStats = [
    {
      value: 'Custom',
      label: 'UKURAN & MODEL',
      sub: activeProduct.specs.dimensions,
      icon: <path d="M4 20h16M6 20V8l6-4 6 4v12M9 20v-6h6v6" />,
    },
    {
      value: `${activeProduct.specs.colors.length}+`,
      label: 'PILIHAN NUANSA WARNA',
      sub: activeProduct.specs.colors.slice(0, 3).join(', '),
      icon: (
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2Z" />
      ),
    },
    {
      value: `${activeProduct.suitableRooms.length} Area`,
      label: 'REKOMENDASI RUANGAN',
      sub: activeProduct.suitableRooms.slice(0, 2).join(' • '),
      icon: <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Zm6 12v-6h6v6" />,
    },
    {
      value: 'Gratis',
      label: 'SURVEI & UKUR BATAM',
      sub: formatPrice(activeProduct.price),
      icon: (
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      ),
    },
  ];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleRequestClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 transition-all duration-300 ease-out sm:p-5 lg:p-8 ${
        isVisible
          ? 'bg-black/80 opacity-100 backdrop-blur-md'
          : 'pointer-events-none bg-black/0 opacity-0 backdrop-blur-none'
      }`}
    >
      {/* Kartu Sinematik Gelap Full-Bleed */}
      <div
        className={`theme-dark relative flex max-h-[94dvh] min-h-[540px] w-full max-w-6xl flex-col justify-between overflow-y-auto rounded-3xl border border-white/15 bg-[#12100d] text-[#f5efe6] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[660px] lg:overflow-hidden ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-95 opacity-0'
        }`}
      >
        {/* Background Image Full-Bleed di Kanan + Gradasi Gelap Sinematik di Kiri & Bawah */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            key={currentImg.src}
            src={currentImg.src}
            alt={currentImg.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1150px, 100vw"
            className="animate-in object-cover object-center lg:object-right"
          />
          {/* Gradasi kiri ke kanan diperhalus agar foto gorden terlihat terang & jelas, namun teks kiri tetap terbaca */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#110f0c]/85 via-[#110f0c]/45 to-transparent" />
          {/* Gradasi tipis di bagian atas & bawah hanya untuk area header dan bar spesifikasi */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/80 via-transparent to-[#0e0c0a]/35" />
        </div>

        {/* ---------- 1. TOP BAR MODAL (Gaya ARCEVO Header) ---------- */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo.webp"
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-full ring-1 ring-[#d4a359]/50"
            />
            <span className="font-serif text-sm font-semibold tracking-[0.22em] text-white uppercase">
              {siteConfig.name}
            </span>
          </div>

          {/* Navigasi Foto (Prev / Counter / Next) di Tengah Atas */}
          {activeProduct.images.length > 1 && (
            <div
              role="group"
              aria-label="Navigasi foto produk"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 p-1 backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() =>
                  setImageIndex(
                    (prev) =>
                      (prev - 1 + activeProduct.images.length) % activeProduct.images.length,
                  )
                }
                aria-label="Foto sebelumnya"
                className="grid size-7 cursor-pointer place-items-center rounded-full text-xs text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                ←
              </button>
              <span className="px-2.5 text-[11px] font-semibold tracking-wider text-[#c8a98e] uppercase">
                Foto {String(imageIndex + 1).padStart(2, '0')} /{' '}
                {String(activeProduct.images.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setImageIndex((prev) => (prev + 1) % activeProduct.images.length)}
                aria-label="Foto berikutnya"
                className="grid size-7 cursor-pointer place-items-center rounded-full text-xs text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                →
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm transition-colors hover:border-[#c8a98e] hover:bg-[#c8a98e] hover:text-[#12100d] sm:inline-flex"
            >
              <span>SURVEI GRATIS</span>
              <span aria-hidden="true">↗</span>
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleRequestClose}
              aria-label="Tutup detail produk (Escape)"
              className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-white/25 bg-black/55 px-3.5 py-2 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:border-[#c8a98e] hover:text-[#c8a98e]"
            >
              <span>Tutup</span>
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        {/* ---------- 2. KONTEN UTAMA KIRI (Gaya ARCEVO Hero Content) ---------- */}
        <div className="relative z-10 grid items-end gap-8 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:py-10">
          <div className="lg:col-span-7">
            {/* Eyebrow dengan titik pemisah */}
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#c8a98e] uppercase">
              {category.name} &nbsp;•&nbsp; CUSTOM INTERIOR &nbsp;•&nbsp; BATAM
            </p>

            {/* Judul Serif Besar 2 Baris (Putih + Taupe/Champagne) */}
            <h2
              id="modal-product-title"
              className="mt-3 font-serif text-4xl leading-[1.04] font-medium tracking-tight text-white sm:text-6xl"
            >
              {activeProduct.name}.
              <span className="mt-1 block text-[#c8a98e]/90">Rapi &amp; Berkelas.</span>
            </h2>

            {/* Garis tipis pendek di bawah judul (persis ARCEVO) */}
            <div className="mt-5 h-px w-12 bg-white/35" aria-hidden="true" />

            {/* Deskripsi */}
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {activeProduct.description}
            </p>

            {/* Poin Keunggulan & Bahan */}
            <div className="mt-5 flex flex-wrap gap-2">
              {activeProduct.benefits.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs text-white/90 backdrop-blur-sm"
                >
                  <span className="text-[#c8a98e]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{b}</span>
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/65">
              <strong className="text-[#c8a98e]">Pilihan Bahan:</strong>{' '}
              {activeProduct.specs.material}
            </p>

            {/* Tombol CTA (Kotak Taupe "MINTA PENAWARAN ↗" + Tombol Bulat Play "TANYA BAHAN") */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-lg bg-[#b89b82] px-6 py-3 text-xs font-semibold tracking-[0.16em] whitespace-nowrap text-[#12100d] uppercase shadow-lg transition-all hover:bg-[#cbb099]"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                <span>Minta Penawaran</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={waSampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 shrink-0 items-center gap-3 text-xs font-semibold tracking-[0.18em] whitespace-nowrap text-white/90 uppercase transition-colors hover:text-[#c8a98e]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-colors group-hover:border-[#c8a98e] group-hover:bg-[#c8a98e]/20">
                  ▶
                </span>
                <span>Tanya Sampel Bahan</span>
              </a>
            </div>
          </div>

          {/* Kanan Bawah: Thumbnail Pratinjau Gambar Produk agar pengunjung bisa ganti sudut foto */}
          <div className="flex min-w-0 flex-col items-start gap-2.5 lg:col-span-5 lg:items-end">
            <p className="text-[11px] font-medium tracking-wider text-white/85 uppercase drop-shadow-sm">
              Pilih Contoh Pemasangan ({imageIndex + 1}/{activeProduct.images.length})
            </p>
            <div className="flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-black/50 p-2.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeProduct.images.map((img, i) => {
                const active = i === imageIndex;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Lihat foto ${i + 1} ${activeProduct.name}`}
                    className={`relative h-16 w-14 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-all sm:h-20 sm:w-16 ${
                      active
                        ? 'scale-105 opacity-100 ring-2 ring-[#c8a98e]'
                        : 'opacity-60 hover:opacity-95'
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- 3. BOTTOM STATS BAR 4 KOLOM (Persis Bawah ARCEVO) ---------- */}
        <div className="relative z-10 border-t border-white/12 bg-black/60 px-5 py-5 backdrop-blur-md sm:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/12">
            {bottomStats.map((st, idx) => (
              <div
                key={st.label}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? 'lg:pl-6' : ''
                } ${idx < bottomStats.length - 1 ? 'lg:pr-6' : ''}`}
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-[#c8a98e]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-5 fill-none stroke-current stroke-1.5"
                  >
                    {st.icon}
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-2xl leading-none font-medium text-white sm:text-3xl">
                    {st.value}
                  </p>
                  <p className="mt-1 truncate text-[10px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                    {st.label}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-[#c8a98e]">{st.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
