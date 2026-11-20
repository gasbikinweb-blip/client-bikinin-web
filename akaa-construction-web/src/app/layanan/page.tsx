import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumb, pageMetadata } from '@/lib/seo';
import { Catalog } from '@/components/Catalog';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { PromoBanner, Services } from '@/components/Sections';
import { projects } from '@/data/projects';
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
      <Catalog />
      <CtaBand />
    </>
  );
}
