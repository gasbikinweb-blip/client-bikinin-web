import type { Metadata } from 'next';
import { ConsultBuilder } from '@/components/ConsultBuilder';
import { PageHeader } from '@/components/PageParts';
import { Contact, Faq } from '@/components/Sections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Kontak & Konsultasi Gratis | AKAA Construction',
  description: `Konsultasi gratis via WhatsApp, alamat kantor, dan peta lokasi AKAA Construction di ${site.area}.`,
  alternates: { canonical: '/kontak' },
};

export default function KontakPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Konsultasi gratis"
        text="Isi kebutuhan Anda, pesan WhatsApp tersusun otomatis. Atau datang langsung ke kantor kami."
      />
      <ConsultBuilder />
      <Contact />
      <Faq />
    </>
  );
}
