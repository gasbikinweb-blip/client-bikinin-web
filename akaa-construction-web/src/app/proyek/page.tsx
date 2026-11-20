import type { Metadata } from 'next';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Projects } from '@/components/Projects';
import { Reels } from '@/components/Reels';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Galeri Proyek & Progress | AKAA Construction',
  description: `Portofolio proyek AKAA Construction di ${site.area}: foto, video, dan update progress pembangunan.`,
  alternates: { canonical: '/proyek' },
};

const cover = (slug: string) => projects.find((p) => p.slug === slug)?.cover.src;

export default function ProyekPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title="Proyek & progress kami"
        text="Foto, video, dan update progress dari proyek yang sudah dan sedang kami kerjakan."
        image={cover('interior-apartemen')}
      />
      <Projects />
      <Reels />
      <CtaBand title="Mau rumah seperti ini?" />
    </>
  );
}
