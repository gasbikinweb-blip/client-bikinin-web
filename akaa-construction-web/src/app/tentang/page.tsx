import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumb, pageMetadata } from '@/lib/seo';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Posters } from '@/components/Posters';
import { Advantages, Process } from '@/components/Sections';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

const cover = (slug: string) => projects.find((p) => p.slug === slug)?.cover;
const headerImage = cover('sn-house-rancamaya');

export const metadata: Metadata = pageMetadata({
  title: 'Tentang AKAA Construction | Kontraktor Rumah Cibubur',
  description: `Profil AKAA Construction (${site.legalName}), jasa bangun rumah, renovasi, dan interior di ${site.area}.`,
  path: '/tentang',
  image: headerImage,
});

export default function TentangPage() {
  return (
    <>
      <JsonLd data={breadcrumb('Tentang', '/tentang')} />
      <PageHeader
        eyebrow="Tentang kami"
        title="AKAA Construction & Interior"
        text={`${site.tagline}.`}
        image={headerImage}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">Profil</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
            {site.legalName}
          </h2>
        </div>
        <div className="reveal space-y-4 text-lg leading-relaxed text-muted">
          {/* TODO: ganti dengan cerita & tahun berdiri asli dari pemilik */}
          <p>
            AKAA Construction melayani jasa bangun rumah, renovasi, dan interior di {site.area}:{' '}
            {site.areaDetail.join(', ')}.
          </p>
          <p>Kantor kami di {site.office}.</p>
        </div>
      </section>
      <Advantages />
      <Process />
      <Posters />
      <CtaBand />
    </>
  );
}
