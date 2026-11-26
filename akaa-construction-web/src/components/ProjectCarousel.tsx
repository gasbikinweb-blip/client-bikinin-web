'use client';

// Karusel kartu proyek (gaya "shop by category"): kartu potret dengan teks di atas foto,
// geser dengan panah kiri/kanan atau swipe. Klik membuka modal di halaman Proyek.
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowIcon } from './icons';

export type CarouselItem = {
  slug: string;
  name: string;
  meta: string;
  photos: number;
  cover: { src: string; alt: string };
};

function NavButton({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? 'Proyek sebelumnya' : 'Proyek berikutnya'}
      className={`absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-accent-text shadow-lg transition hover:bg-accent hover:text-accent-ink md:grid ${
        dir < 0 ? '-left-6' : '-right-6'
      }`}
    >
      <ArrowIcon className={`size-5 ${dir < 0 ? 'rotate-180' : ''}`} />
    </button>
  );
}

export function ProjectCarousel({ items }: { items: CarouselItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="relative mt-10">
      <NavButton dir={-1} onClick={() => scroll(-1)} />
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <li key={p.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-60px)/4)]">
            <a
              href={`/proyek#proyek-${p.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-surface-2"
            >
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 78vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 block p-5 text-white">
                <span className="block font-display text-2xl leading-tight font-extrabold uppercase">
                  {p.name}
                </span>
                <span className="mt-1 block text-sm text-white/80">
                  {p.meta} · {p.photos} foto
                </span>
                <span className="mt-4 grid size-10 place-items-center rounded-full bg-white text-night transition group-hover:bg-accent group-hover:text-accent-ink">
                  <ArrowIcon className="size-5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <NavButton dir={1} onClick={() => scroll(1)} />
    </div>
  );
}
