import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ArrowIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllAreas } from '@/data/areas';
import { siteConfig } from '@/lib/config';

const title = 'Area Layanan Pemasangan Gorden di Seluruh Batam';
const description =
  'Survei & pemasangan gorden, vitrase, dan blinds gratis ke 12 kecamatan di Batam: Batam Kota, Lubuk Baja, Bengkong, Batu Ampar, Sekupang, Batu Aji, Sagulung, Sei Beduk, Nongsa, Galang, Bulang, dan Belakang Padang.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/area' },
  openGraph: { url: '/area', title: `${title} | ${siteConfig.name}`, description },
};

export default function AreasPage() {
  const areas = getAllAreas();

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: areas.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Jasa Gorden ${a.name}`,
      url: new URL(`/area/${a.slug}`, siteConfig.url).href,
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
        name: 'Area Layanan',
        item: new URL('/area', siteConfig.url).href,
      },
    ],
  };

  return (
    <section className="py-16 sm:py-20">
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Area Layanan' }]} />
        <div className="mt-8">
          <SectionHeading
            as="h1"
            eyebrow="Area Layanan"
            title="Survei &amp; Pemasangan Gorden di Seluruh Batam"
            description={description}
          />
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug}>
              <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-xl">
                <h2 className="font-serif text-2xl font-semibold">
                  {/* after:inset-0 membuat seluruh kartu bisa diklik */}
                  <Link
                    href={`/area/${a.slug}`}
                    className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
                  >
                    Kec. {a.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">{a.popular.join(' • ')}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Kelurahan: {a.villages.join(', ')}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-semibold text-accent">
                  Lihat layanan di {a.name} <ArrowIcon className="size-3.5" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
