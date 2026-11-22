import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { ProjectGallery } from '@/components/ProjectGallery';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { latestProjects, projects } from '@/data/projects';
import { siteConfig } from '@/lib/config';

const title = 'Galeri Pemasangan Gorden & Blinds di Batam';
const description =
  'Foto dan video asli hasil pemasangan gorden, vitrase, blinds, dan wallpaper oleh Home Gorden Batam di rumah, apartemen, dan ruko di Batam.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/galeri' },
  openGraph: {
    url: '/galeri',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [{ url: '/projects/gorden-cokelat-tua-vitrase-ruang-tv-2611-01.webp' }],
  },
};

export default function GaleriPage() {
  const realPhotos = projects.filter((p) => p.kind === 'proyek');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Galeri Pemasangan',
        item: new URL('/galeri', siteConfig.url).href,
      },
    ],
  };
  // Galeri foto untuk Google Gambar (hanya foto pemasangan asli)
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: title,
    description,
    image: realPhotos.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: new URL(p.src, siteConfig.url).href,
      caption: p.alt,
    })),
  };

  return (
    <section className="py-16 sm:py-20">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={gallerySchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Galeri Pemasangan' }]} />
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            as="h1"
            eyebrow="Galeri Pemasangan"
            title="Hasil Pemasangan Asli di Batam"
            description={description}
          />
          <WhatsAppButton
            message={`Halo ${siteConfig.name}, saya lihat galeri pemasangan dan ingin model serupa. Boleh jadwal survei gratis?`}
            className="shrink-0"
          >
            Mau Model Seperti Ini
          </WhatsAppButton>
        </div>

        {latestProjects.length > 0 && (
          // Cukup label "Terbaru" (tanpa tanggal agar tidak terkesan basi); foto terbaru ada di urutan depan
          <p className="mt-8 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wider text-[#5c4011] uppercase shadow-sm">
            Terbaru
          </p>
        )}

        <div className="mt-12">
          <ProjectGallery />
        </div>
      </div>
    </section>
  );
}
