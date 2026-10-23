'use client';

// Filter kategori + modal detail produk: hanya memproses data lokal di browser, instan tanpa pindah halaman
import { useState } from 'react';
import type { Category, CategorySlug, Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

type Props = {
  products: readonly Product[];
  categories: readonly Category[];
};

type Filter = CategorySlug | 'semua';

export function ProductCatalog({ products, categories }: Props) {
  const [active, setActive] = useState<Filter>('semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const visible = active === 'semua' ? products : products.filter((p) => p.category === active);
  const options: { value: Filter; label: string; count: number }[] = [
    { value: 'semua', label: 'Semua', count: products.length },
    ...categories.map((c) => ({
      value: c.slug,
      label: c.name,
      count: products.filter((p) => p.category === c.slug).length,
    })),
  ];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori produk"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={active === o.value}
            onClick={() => setActive(o.value)}
            className="shrink-0 cursor-pointer rounded-full border border-line px-5 py-2 text-sm transition-colors duration-300 hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background"
          >
            {o.label} <sup className="text-[10px] opacity-70">{o.count}</sup>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} produk
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} onSelect={(prod) => setSelectedProduct(prod)} />
          </li>
        ))}
      </ul>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
