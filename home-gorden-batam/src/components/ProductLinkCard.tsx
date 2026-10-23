import Image from 'next/image';
import Link from 'next/link';
import { getCategory, type Product } from '@/data/products';
import { ArrowIcon } from './icons';

// Kartu produk berupa link ke halaman detail /produk/[slug] (tanpa JS, ramah SEO)
export function ProductLinkCard({
  product,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: {
  product: Product;
  sizes?: string;
}) {
  const cover = product.images[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="theme-dark absolute top-3 left-3 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
          {getCategory(product.category).name}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="font-serif text-2xl leading-snug font-semibold">
          {/* after:inset-0 membuat seluruh kartu bisa diklik lewat satu link */}
          <Link
            href={`/produk/${product.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.shortSummary}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-accent">
          Lihat detail <ArrowIcon className="size-3.5" />
        </span>
      </div>
    </article>
  );
}
