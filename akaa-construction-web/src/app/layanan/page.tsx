import type { Metadata } from 'next';
import { Catalog } from '@/components/Catalog';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { PromoBanner, Services } from '@/components/Sections';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Layanan Bangun Rumah, Renovasi & Interior | AKAA Construction',
  description: `Layanan dan katalog AKAA Construction: bangun rumah, renovasi, interior, dan material di ${site.area}.`,
  alternates: { canonical: '/layanan' },
};

const cover = (slug: string) => projects.find((p) => p.slug === slug)?.cover.src;

export default function LayananPage() {
  return (
    <>
      <PageHeader
        eyebrow="Layanan & katalog"
        title="Dari desain sampai finishing"
        text={`Pilih layanan atau paket yang Anda butuhkan, lalu konsultasikan gratis via WhatsApp.`}
        image={cover('renovasi-harvest-city')}
      />
      <PromoBanner />
      <Services />
      <Catalog />
      <CtaBand />
    </>
  );
}
