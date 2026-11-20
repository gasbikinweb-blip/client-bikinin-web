import type { Metadata } from 'next';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Posters } from '@/components/Posters';
import { Advantages, Process } from '@/components/Sections';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Tentang AKAA Construction | Kontraktor Rumah Cibubur',
  description: `Profil AKAA Construction (${site.legalName}), jasa bangun rumah, renovasi, dan interior di ${site.area}.`,
  alternates: { canonical: '/tentang' },
};

const cover = (slug: string) => projects.find((p) => p.slug === slug)?.cover.src;

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang kami"
        title="AKAA Construction & Interior"
        text={`${site.tagline}.`}
        image={cover('sn-house-rancamaya')}
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
