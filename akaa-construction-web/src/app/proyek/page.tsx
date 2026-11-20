import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumb, pageMetadata } from '@/lib/seo';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Projects } from '@/components/Projects';
import { Reels } from '@/components/Reels';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

const cover = (slug: string) => projects.find((p) => p.slug === slug)?.cover;
const headerImage = cover('interior-apartemen');

export const metadata: Metadata = pageMetadata({
  title: 'Galeri Proyek & Progress | AKAA Construction',
  description: `Portofolio proyek AKAA Construction di ${site.area}: foto, video, dan update progress pembangunan.`,
  path: '/proyek',
  image: headerImage,
});

export default function ProyekPage() {
  return (
    <>
      <JsonLd data={breadcrumb('Proyek', '/proyek')} />
      <PageHeader
        eyebrow="Galeri"
        title="Proyek & progress kami"
        text="Foto, video, dan update progress dari proyek yang sudah dan sedang kami kerjakan."
        image={headerImage}
      />
      <Projects />
      <Reels />
      <CtaBand title="Mau rumah seperti ini?" />
    </>
  );
}
