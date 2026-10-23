import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductLinkCard } from '@/components/ProductLinkCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getAllProducts, getCategory, getProductBySlug } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { productMessage } from '@/lib/whatsapp';

type Props = { params: Promise<{ slug: string }> };

// Semua halaman produk dibuat saat build (static export)
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  const path = `/produk/${product.slug}`;
  const title = `${product.name} Batam`;
  return {
    title,
    description: product.shortSummary,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description: product.shortSummary,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
    twitter: { images: [product.images[0].src] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const url = new URL(`/produk/${product.slug}`, siteConfig.url).href;
  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  // Service (bukan Product): harga tergantung survei, jadi tidak ada offers/rating
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: product.name,
    serviceType: category.name,
    description: product.description,
    url,
    image: product.images.map((img) => new URL(img.src, siteConfig.url).href),
    areaServed: { '@type': 'City', name: 'Batam' },
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: `+${siteConfig.waNumber}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produk',
        item: new URL('/produk', siteConfig.url).href,
      },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  };

  const specs = [
    { label: 'Bahan', value: product.specs.material },
    { label: 'Ukuran', value: product.specs.dimensions },
    { label: 'Pilihan Warna', value: product.specs.colors.join(', ') },
    { label: 'Pemasangan', value: product.specs.installation },
    { label: 'Harga', value: formatPrice(product.price) },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Produk', href: '/produk' },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <ProductGallery images={product.images} />

            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
                {category.name}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                {product.name} <span className="text-accent">Batam</span>
              </h1>
              <p className="mt-4 text-lg text-foreground/90">{product.shortSummary}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

              <WhatsAppButton message={productMessage(product)} className="mt-8">
                Minta Survei &amp; Penawaran
              </WhatsAppButton>

              <h2 className="mt-12 font-serif text-2xl font-semibold">Keunggulan</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                {product.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <h2 className="mt-10 font-serif text-2xl font-semibold">Cocok untuk Ruangan</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.suitableRooms.map((room) => (
                  <li
                    key={room}
                    className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-muted"
                  >
                    {room}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-serif text-2xl font-semibold">Spesifikasi</h2>
              <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
                {specs.map((s) => (
                  <div key={s.label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">{s.label}</dt>
                    <dd className="text-muted sm:col-span-2">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="judul-terkait" className="border-t border-line bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="judul-terkait" className="font-serif text-3xl font-semibold">
              Produk {category.name} Lainnya
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductLinkCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
