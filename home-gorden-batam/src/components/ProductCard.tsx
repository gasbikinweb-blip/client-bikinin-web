import Image from 'next/image';
import { getCategory, type Product } from '@/data/products';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from './icons';

type Props = {
  product: Product;
  sizes?: string;
  onSelect?: (product: Product) => void;
};

export function ProductCard({
  product,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  onSelect,
}: Props) {
  const cover = product.images[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-xl">
      {/* Rasio 4:5 tetap supaya semua kartu sejajar rata di semua ukuran layar & zoom 120% */}
      <button
        type="button"
        onClick={() => onSelect?.(product)}
        aria-label={`Lihat detail ${product.name}`}
        className="relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl bg-surface-2 text-left"
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="theme-dark absolute top-3 left-3 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
          {getCategory(product.category).name}
        </span>

        {/* Lingkaran "Detail" di Tengah saat Hover */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="grid size-14 scale-90 place-items-center rounded-full border border-white/35 bg-black/70 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            Detail
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="line-clamp-1 font-serif text-2xl leading-snug font-semibold">
          <button
            type="button"
            onClick={() => onSelect?.(product)}
            className="cursor-pointer text-left transition-colors hover:text-accent"
          >
            {product.name}
          </button>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
          {product.shortSummary}
        </p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {product.suitableRooms.slice(0, 3).map((room) => (
            <span
              key={room}
              className="truncate rounded-md border border-line bg-background/70 px-2.5 py-1 text-[11px] text-muted"
            >
              {room}
            </span>
          ))}
        </div>

        {/* Tombol bawah menggunakan flex-wrap supaya tidak terpotong di zoom 120% */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <a
            href={buildWhatsAppLink(productMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold whitespace-nowrap text-background transition-colors hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-3.5 shrink-0" />
            <span>Minta Penawaran</span>
            <span className="sr-only"> {product.name} via WhatsApp (membuka tab baru)</span>
          </a>
          <button
            type="button"
            onClick={() => onSelect?.(product)}
            aria-label={`Lihat detail ${product.name}`}
            className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-1 rounded-full border border-line bg-background/60 px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            <span>Detail</span>
            <ArrowIcon className="size-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </article>
  );
}
