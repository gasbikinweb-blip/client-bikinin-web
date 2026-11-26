import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { faqs } from '@/data/faq';
import { breadcrumb, pageMetadata } from '@/lib/seo';
import { ConsultBuilder } from '@/components/ConsultBuilder';
import { PageHeader } from '@/components/PageParts';
import { Contact, Faq } from '@/components/Sections';
import { site } from '@/data/site';
import { projects } from '@/data/projects';

const headerImage = projects.find((p) => p.slug === 'gazebo-interior-cafe-jakarta')?.cover;

export const metadata: Metadata = pageMetadata({
  title: 'Kontak & Konsultasi Gratis | AKAA Construction',
  description: `Konsultasi gratis via WhatsApp, alamat kantor, dan peta lokasi AKAA Construction di ${site.area}.`,
  path: '/kontak',
});

// FAQ tampil sebagai rich result di Google (isi sama persis dengan section FAQ)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function KontakPage() {
  return (
    <>
      <JsonLd data={breadcrumb('Kontak', '/kontak')} />
      <JsonLd data={faqSchema} />
      <PageHeader
        eyebrow="Kontak"
        title="Konsultasi gratis"
        text="Isi kebutuhan Anda, pesan WhatsApp tersusun otomatis. Atau datang langsung ke kantor kami."
        image={headerImage}
      />
      <ConsultBuilder />
      <Contact />
      <Faq />
    </>
  );
}
