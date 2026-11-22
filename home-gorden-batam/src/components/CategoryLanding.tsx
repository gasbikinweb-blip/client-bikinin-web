// Halaman kategori (Paket Pro): daftar produk kategori + foto pemasangan nyata yang sesuai.
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from './Breadcrumb';
import { ArrowIcon } from './icons';
import { JsonLd } from './JsonLd';
import { ProductLinkCard } from './ProductLinkCard';
import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';
import { type CategorySlug, getAllProducts, getCategory } from '@/data/products';
import { latestDate, type ProjectFilterCategory, projects } from '@/data/projects';
import { siteConfig } from '@/lib/config';

type Props = {
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  description: string;
  categories: readonly CategorySlug[];
  photoFilters: readonly ProjectFilterCategory[];
  waMessage: string;
};

export function CategoryLanding({
  path,
  crumb,
  eyebrow,
  title,
  description,
  categories,
  photoFilters,
  waMessage,
}: Props) {
  const all = getAllProducts();
  // Foto pemasangan asli (bukan ilustrasi) yang sesuai kategori, terbaru dulu
  const photos = projects
    .filter((p) => p.kind === 'proyek' && photoFilters.includes(p.filterCategory))
    .slice(0, 8);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: crumb, item: new URL(path, siteConfig.url).href },
    ],
  };
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: all
      .filter((p) => categories.includes(p.category))
      .map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: new URL(`/produk/${p.slug}`, siteConfig.url).href,
      })),
  };

  return (
    <section className="py-16 sm:py-20">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={listSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: crumb }]} />
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
          <WhatsAppButton message={waMessage} className="shrink-0">
            Survei &amp; Ukur Gratis
          </WhatsAppButton>
        </div>

        {categories.map((slug) => {
          const c = getCategory(slug);
          return (
            <section key={slug} aria-labelledby={`kategori-${slug}`} className="mt-16">
              <h2 id={`kategori-${slug}`} className="font-serif text-3xl font-semibold">
                {c.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">{c.description}</p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {all
                  .filter((p) => p.category === slug)
                  .map((p) => (
                    <li key={p.slug}>
                      <ProductLinkCard product={p} />
                    </li>
                  ))}
              </ul>
            </section>
          );
        })}

        {photos.length > 0 && (
          <section aria-labelledby="judul-hasil" className="mt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-accent-strong uppercase">
                  Hasil pemasangan
                </p>
                <h2 id="judul-hasil" className="mt-2 font-serif text-3xl font-semibold">
                  Foto asli dari pelanggan kami
                </h2>
              </div>
              <Link
                href="/galeri"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-accent"
              >
                Lihat galeri lengkap <ArrowIcon className="size-4" />
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {photos.map((p) => (
                <li key={p.id}>
                  <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={p.thumbSrc}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                      {p.addedAt === latestDate && (
                        <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#5c4011] uppercase shadow-sm">
                          Terbaru
                        </span>
                      )}
                    </div>
                    <figcaption className="px-3 py-2.5 text-sm">
                      <span className="block truncate font-semibold">{p.productType}</span>
                      <span className="block truncate text-xs text-muted">{p.roomType}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
}
