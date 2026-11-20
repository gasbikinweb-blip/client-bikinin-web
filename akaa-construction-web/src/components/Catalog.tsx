// Katalog material & jasa pendukung (mengikuti katalog WhatsApp Business AKAA)
import Image from 'next/image';
import { ArrowIcon, CheckIcon } from './icons';
import { catalog } from '@/data/media';

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h2l2.4 11h10.2L20 7H6.2M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}

const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

export function Catalog() {
  const [main, ...rest] = catalog;
  return (
    <section id="katalog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal max-w-2xl">
        <p className="eyebrow">Katalog material</p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
          Butuh material? Ada di AKAA
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          Selain jasa bangun &amp; renovasi, AKAA juga menyuplai material dan jasa pendukung untuk
          proyek Anda di Jabodetabek.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Produk unggulan dengan harga resmi */}
        {main && (
          <article className="reveal relative flex flex-col overflow-hidden rounded-3xl bg-night text-white shadow-xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={main.image.src}
                alt={main.image.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink uppercase">
                Terlaris
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{main.tag}</p>
              <h3 className="mt-2 font-display text-3xl font-black uppercase">{main.name}</h3>
              {main.price && (
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black text-accent">
                    {rupiah(main.price.amount)}
                  </span>
                  <span className="text-white/70">/{main.price.unit}</span>
                </p>
              )}
              {main.price?.note && <p className="text-xs text-white/50">{main.price.note}</p>}
              <p className="mt-4 text-sm leading-relaxed text-white/75">{main.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                {main.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5"
                  >
                    <CheckIcon className="size-4 text-accent" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <a
                  href={`/kontak#pesan-${main.id}`}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-bold text-accent-ink hover:brightness-95"
                >
                  <CartIcon /> Pesan &amp; Hitung Estimasi
                </a>
              </div>
            </div>
          </article>
        )}

        <ul data-stagger className="grid gap-4">
          {rest.map((c) => (
            <li
              key={c.id}
              className="reveal flex gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-3"
            >
              <div className="relative w-28 shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:w-36">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                <p className="text-[11px] font-bold tracking-[0.2em] text-accent-text uppercase">
                  {c.tag}
                </p>
                <h3 className="mt-1 font-display text-lg leading-tight font-extrabold uppercase">
                  {c.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{c.text}</p>
                <a
                  href={`/kontak#pesan-${c.id}`}
                  className="mt-auto inline-flex min-h-10 items-center gap-1.5 pt-2 text-sm font-bold text-accent-text hover:underline"
                >
                  Pesan / tanya harga <ArrowIcon className="size-4" />
                  <span className="sr-only"> {c.name}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
