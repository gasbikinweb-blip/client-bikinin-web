'use client';

// Galeri detail produk: gambar utama + thumbnail yang bisa dipilih
import Image from 'next/image';
import { useState } from 'react';
import type { ProductImage } from '@/data/products';

type Props = { images: readonly ProductImage[] };

export function ProductGallery({ images }: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  if (!current) return null;

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-in object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3" aria-label="Pilih gambar">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Tampilkan gambar ${i + 1}: ${img.alt}`}
                aria-current={i === index}
                className="relative block aspect-[4/5] w-full overflow-hidden rounded-lg opacity-60 ring-accent transition duration-300 hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2"
              >
                <Image src={img.src} alt="" fill sizes="20vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
