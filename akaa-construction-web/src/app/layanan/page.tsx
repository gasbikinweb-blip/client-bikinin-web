import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumb, pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Catalog } from '@/components/Catalog';
import { ArrowIcon } from '@/components/icons';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { PromoBanner, Services } from '@/components/Sections';
import { projects } from '@/data/projects';
import { servicePages } from '@/data/servicePages';
import { services } from '@/data/services';
import { site } from '@/data/site';

const cover = (slug: string) => projects.find((p) => p.slug === slug)?.cover;
const headerImage = cover('renovasi-harvest-city');

export const metadata: Metadata = pageMetadata({
  title: 'Layanan Bangun Rumah, Renovasi & Interior | AKAA Construction',
  description: `Layanan dan katalog AKAA Construction: bangun rumah, renovasi, interior, dan material di ${site.area}.`,
  path: '/layanan',
  image: headerImage,
});

export default function LayananPage() {
  return (
    <>
      <JsonLd data={breadcrumb('Layanan', '/layanan')} />
      <PageHeader
        eyebrow="Layanan & katalog"
        title="Dari desain sampai finishing"
        text={`Pilih layanan atau paket yang Anda butuhkan, lalu konsultasikan gratis via WhatsApp.`}
        image={headerImage}
      />
      <PromoBanner />
      <Services />
      {/* Link ke halaman detail tiap layanan */}
      <nav
        aria-label="Detail layanan"
        className="mx-auto -mt-10 w-full max-w-7xl px-4 pb-16 sm:px-6"
      >
        <ul className="flex flex-wrap gap-3">
          {servicePages.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/layanan/${l.slug}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 font-semibold hover:border-accent"
              >
                {services.find((s) => s.id === l.serviceId)?.name} <ArrowIcon className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Catalog />
      <CtaBand />
    </>
  );
}
