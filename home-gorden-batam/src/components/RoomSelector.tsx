'use client';

// Section interaktif ala "pilih karakter": pilih ruangan, lalu pilih jenis gordennya.
// Klik "Lihat Detail" langsung membuka modal detail produk tanpa pindah halaman.
import Image from 'next/image';
import { useState } from 'react';
import { getProductBySlug, type Product } from '@/data/products';
import type { Room } from '@/data/rooms';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from './icons';
import { ProductDetailModal } from './ProductDetailModal';

const pad = (n: number) => String(n).padStart(2, '0');

export function RoomSelector({ rooms }: { rooms: Room[] }) {
  const [roomIndex, setRoomIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const room = rooms[roomIndex] ?? rooms[0];
  if (!room) return null;
  const item = room.items[itemIndex] ?? room.items[0];
  if (!item) return null;
  const total = room.items.length;

  const chooseRoom = (i: number) => {
    setRoomIndex(i);
    setItemIndex(0);
  };
  const step = (delta: number) => setItemIndex((i) => (i + delta + total) % total);

  // Navigasi roster dengan tombol panah
  const onRosterKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (itemIndex + delta + total) % total;
    setItemIndex(next);
    e.currentTarget.querySelectorAll('button')[next]?.focus();
  };

  return (
    <div>
      {/* ---- Pilih ruangan ---- */}
      <div
        role="group"
        aria-label="Pilih ruangan"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0"
      >
        {rooms.map((r, i) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={i === roomIndex}
            onClick={() => chooseRoom(i)}
            className="group relative shrink-0 cursor-pointer overflow-hidden rounded-full border border-line px-5 py-2.5 text-sm transition-colors duration-300 hover:border-accent aria-pressed:border-accent aria-pressed:text-background"
          >
            <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-aria-pressed:scale-x-100" />
            <span className="relative">{r.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* ---- Panggung (gambar besar) ---- */}
        <div className="theme-dark relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2 shadow-2xl ring-1 ring-line lg:aspect-auto lg:min-h-[600px]">
          <Image
            key={`${room.id}-${item.slug}`}
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="animate-stage object-cover"
          />
          <span
            key={`flash-${room.id}-${item.slug}`}
            aria-hidden="true"
            className="animate-flash pointer-events-none absolute inset-0 bg-accent-strong mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

          <p
            key={`bg-${item.slug}`}
            aria-hidden="true"
            className="animate-slide-in pointer-events-none absolute top-6 left-6 max-w-[90%] font-serif text-6xl leading-[0.9] font-semibold text-foreground/15 uppercase sm:text-8xl"
          >
            {item.name}
          </p>

          <div className="absolute top-5 right-5 rounded-full bg-black/50 px-3 py-1 font-mono text-xs tracking-widest backdrop-blur">
            {pad(itemIndex + 1)} / {pad(total)}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div key={`info-${item.slug}`} aria-live="polite">
              <p className="animate-rise text-xs font-semibold tracking-[0.3em] text-accent-strong uppercase">
                {room.name} · {item.category}
              </p>
              <h3
                className="animate-rise mt-2 font-serif text-4xl leading-tight sm:text-5xl"
                style={{ '--delay': '80ms' } as React.CSSProperties}
              >
                {item.name}
              </h3>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Produk sebelumnya"
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-foreground/40 backdrop-blur transition hover:border-accent hover:bg-accent hover:text-background"
              >
                <ArrowIcon className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Produk berikutnya"
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-foreground/40 backdrop-blur transition hover:border-accent hover:bg-accent hover:text-background"
              >
                <ArrowIcon className="size-4" />
              </button>
              <div className="ml-2 flex flex-1 gap-1.5" aria-hidden="true">
                {room.items.map((it, i) => (
                  <span
                    key={it.slug}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i === itemIndex ? 'bg-accent' : 'bg-foreground/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---- Roster + detail ---- */}
        <div className="flex flex-col">
          <p
            key={`tag-${room.id}`}
            className="animate-rise font-serif text-2xl text-foreground/90 italic"
          >
            “{room.tagline}”
          </p>

          <p className="mt-6 text-xs font-semibold tracking-[0.3em] text-muted uppercase">
            Pilih jenis gorden / tirai
          </p>
          <ul
            key={`roster-${room.id}`}
            onKeyDown={onRosterKey}
            aria-label={`Rekomendasi gorden untuk ${room.name}`}
            className="mt-4 grid grid-cols-3 gap-3 pt-5 sm:grid-cols-4"
          >
            {room.items.map((it, i) => {
              const active = i === itemIndex;
              return (
                <li
                  key={it.slug}
                  className="animate-rise relative"
                  style={{ '--delay': `${i * 70}ms` } as React.CSSProperties}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="animate-bob absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-accent"
                    >
                      ▼
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setItemIndex(i)}
                    aria-pressed={active}
                    aria-label={`Pilih ${it.name}`}
                    tabIndex={active ? 0 : -1}
                    className={`theme-dark group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ${
                      active
                        ? 'scale-[1.04] shadow-[0_0_0_2px_var(--accent),0_0_32px_-4px_var(--accent)]'
                        : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0'
                    }`}
                  >
                    <Image
                      src={it.image.src}
                      alt=""
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-6 text-left text-[11px] leading-tight font-medium">
                      {it.name}
                    </span>
                    {active && (
                      <span className="absolute top-1.5 left-1.5 rounded bg-accent px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-background uppercase">
                        Dipilih
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div key={`detail-${item.slug}`} className="mt-8 border-t border-line pt-6">
            <p className="animate-rise leading-relaxed text-foreground/85">{item.description}</p>
            <dl
              className="animate-rise mt-5 grid gap-3 text-sm sm:grid-cols-2"
              style={{ '--delay': '80ms' } as React.CSSProperties}
            >
              <div className="rounded-xl bg-surface p-4">
                <dt className="text-xs tracking-widest text-muted uppercase">Bahan</dt>
                <dd className="mt-1">{item.material}</dd>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <dt className="text-xs tracking-widest text-muted uppercase">Ukuran</dt>
                <dd className="mt-1">{item.dimensions}</dd>
              </div>
            </dl>
            <div
              className="animate-rise mt-6 flex flex-col gap-3 sm:flex-row"
              style={{ '--delay': '160ms' } as React.CSSProperties}
            >
              <a
                href={buildWhatsAppLink(productMessage(item))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold whitespace-nowrap text-background transition hover:-translate-y-0.5 hover:bg-accent-strong"
              >
                <WhatsAppIcon className="size-5 shrink-0" />
                <span>Tanya via WhatsApp</span>
                <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  const found = getProductBySlug(item.slug);
                  if (found) setModalProduct(found);
                }}
                className="group inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-sm font-semibold whitespace-nowrap transition hover:border-accent hover:text-accent-strong"
              >
                <span>Lihat Detail</span>
                <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  );
}
