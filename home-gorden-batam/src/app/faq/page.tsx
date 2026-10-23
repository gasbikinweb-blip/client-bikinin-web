import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PlusIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { faqs } from '@/data/faq';
import { siteConfig } from '@/lib/config';

const title = 'FAQ Pemasangan Gorden & Blinds di Batam';
const description =
  'Jawaban seputar survei gratis, lama pengerjaan, pengukuran, pilihan bahan, dan pemasangan gorden, vitrase, serta blinds di Batam.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/faq' },
  openGraph: { url: '/faq', title: `${title} | ${siteConfig.name}`, description },
};

// Rich result FAQ di Google; isi wajib sama dengan teks yang tampil di halaman
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'FAQ',
      item: new URL('/faq', siteConfig.url).href,
    },
  ],
};

export default function FaqPage() {
  return (
    <section className="py-16 sm:py-20">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'FAQ' }]} />
        <div className="mt-8">
          <SectionHeading
            as="h1"
            eyebrow="Pertanyaan Umum"
            title="Pertanyaan Seputar Survei, Pemesanan &amp; Pemasangan Gorden"
            description={description}
          />
        </div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <details key={f.id} id={f.id} className="group scroll-mt-24 py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium transition-colors group-open:text-accent-strong [&::-webkit-details-marker]:hidden">
                <h2>{f.question}</h2>
                <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <WhatsAppButton>Tanya Langsung via WhatsApp</WhatsAppButton>
          <Link
            href="/produk"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent-strong"
          >
            Lihat Katalog Produk
          </Link>
        </div>
      </div>
    </section>
  );
}
