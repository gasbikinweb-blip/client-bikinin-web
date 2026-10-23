import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { ProductLinkCard } from '@/components/ProductLinkCard';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllProducts, getCategories } from '@/data/products';
import { siteConfig } from '@/lib/config';

const title = 'Katalog Gorden, Vitrase, Blinds & Wallpaper Batam';
const description =
  'Katalog lengkap gorden custom, vitrase, blackout, vertical/horizontal/roller blinds, wallpaper, dan rell besi. Survei & pengukuran gratis se-Batam.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/produk' },
  openGraph: { url: '/produk', title: `${title} | ${siteConfig.name}`, description },
};

export default function ProductsPage() {
  const products = getAllProducts();

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: new URL(`/produk/${p.slug}`, siteConfig.url).href,
    })),
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
    ],
  };

  return (
    <section className="py-16 sm:py-20">
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Produk' }]} />
        <div className="mt-8">
          <SectionHeading
            as="h1"
            eyebrow="Katalog Produk &amp; Layanan"
            title="Gorden, Vitrase, Blinds &amp; Wallpaper di Batam"
            description={description}
          />
        </div>

        {getCategories().map((c) => (
          <section key={c.slug} aria-labelledby={`kategori-${c.slug}`} className="mt-16">
            <h2 id={`kategori-${c.slug}`} className="font-serif text-3xl font-semibold">
              {c.name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{c.description}</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((p) => p.category === c.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <ProductLinkCard product={p} />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
