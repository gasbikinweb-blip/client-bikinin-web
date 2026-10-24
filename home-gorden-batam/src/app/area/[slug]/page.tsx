import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { ProductLinkCard } from '@/components/ProductLinkCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { areaHeadline, getAllAreas, getAreaBySlug } from '@/data/areas';
import { getProductBySlug, type Product } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { areaMessage } from '@/lib/whatsapp';

type Props = { params: Promise<{ slug: string }> };

// Semua halaman area dibuat saat build (static export)
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getAreaBySlug((await params).slug);
  if (!area) return {};
  const path = `/area/${area.slug}`;
  const title = `Jasa Gorden ${areaHeadline(area)}`;
  const description = `Survei gratis & pemasangan gorden custom, vitrase, blackout, dan blinds di Kecamatan ${area.name}, Batam: ${area.villages.join(', ')}.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${title} | ${siteConfig.name}`, description },
  };
}

export default async function AreaPage({ params }: Props) {
  const area = getAreaBySlug((await params).slug);
  if (!area) notFound();

  const url = new URL(`/area/${area.slug}`, siteConfig.url).href;
  const products = area.recommendedProducts
    .map(getProductBySlug)
    .filter((p): p is Product => p !== undefined);
  const otherAreas = getAllAreas().filter((a) => a.slug !== area.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Jasa Pemasangan Gorden ${area.name}`,
    serviceType: 'Pembuatan & pemasangan gorden, vitrase, dan blinds',
    description: area.intro,
    url,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `Kecamatan ${area.name}, Batam`,
      containedInPlace: { '@type': 'City', name: 'Batam' },
    },
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
        name: 'Area Layanan',
        item: new URL('/area', siteConfig.url).href,
      },
      { '@type': 'ListItem', position: 3, name: area.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Area Layanan', href: '/area' },
              { label: area.name },
            ]}
          />

          <p className="mt-8 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
            Kecamatan {area.name}, Batam
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
            Jasa Gorden Custom &amp; Blinds di{' '}
            <span className="text-accent">{areaHeadline(area)}</span>
          </h1>
          <p className="mt-6 leading-relaxed text-foreground/90">{area.intro}</p>

          <WhatsAppButton message={areaMessage(area.name)} className="mt-8">
            Minta Survei Gratis di {area.name}
          </WhatsAppButton>

          <h2 className="mt-14 font-serif text-2xl font-semibold">
            Kelurahan &amp; Kawasan yang Kami Layani
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...new Set([...area.villages, ...area.popular])].map((v) => (
              <li
                key={v}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-muted"
              >
                {v}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-serif text-2xl font-semibold">Cara Pemesanan di {area.name}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
            <li>Hubungi kami lewat WhatsApp dan sebutkan alamat Anda di {area.name}.</li>
            <li>
              {area.island
                ? 'Tim kami menjadwalkan survei sesuai jadwal penyeberangan ke pulau Anda.'
                : 'Tim kami datang untuk survei, mengukur jendela, dan membawa sampel bahan.'}
            </li>
            <li>Anda memilih bahan & model, lalu kami kirimkan penawaran harga.</li>
            <li>Gorden dijahit dan dipasang rapi di lokasi Anda.</li>
          </ol>
        </div>
      </section>

      {products.length > 0 && (
        <section
          aria-labelledby="judul-rekomendasi"
          className="border-t border-line bg-surface py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="judul-rekomendasi" className="font-serif text-3xl font-semibold">
              Produk Favorit di {area.name}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <ProductLinkCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="judul-area-lain" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="judul-area-lain" className="font-serif text-2xl font-semibold">
            Area Layanan Lainnya di Batam
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {otherAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/area/${a.slug}`}
                  className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent-strong"
                >
                  Gorden {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
