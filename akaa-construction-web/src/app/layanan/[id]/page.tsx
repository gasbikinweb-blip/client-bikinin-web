// Halaman per layanan (/layanan/[id]): hanya layanan yang punya proyek nyata.
// Isi diambil dari data layanan, proyek, dan FAQ yang sudah ada (tanpa klaim baru).
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Process } from '@/components/Sections';
import { Breadcrumbs, ProjectGrid, SectionTitle } from '@/components/SeoParts';
import { faqs } from '@/data/faq';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { servicePages as pages } from '@/data/servicePages';
import { breadcrumbList, pageMetadata } from '@/lib/seo';
import { buildWhatsAppLink, serviceMessage } from '@/lib/whatsapp';

// FAQ umum yang relevan untuk semua layanan (survei, RAB, progress, durasi)
const pageFaqs = [faqs[0], faqs[2], faqs[4], faqs[5]];

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => pages.map((p) => ({ id: p.slug }));

function load(slug: string) {
  const page = pages.find((p) => p.slug === slug);
  const service = page && services.find((s) => s.id === page.serviceId);
  if (!page || !service) return null;
  const list = projects.filter((p) => p.workType === page.workType);
  return { page, service, list };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = load((await params).id);
  if (!d) return {};
  return pageMetadata({
    title: `${d.page.keyword} Cibubur & ${site.area} | AKAA Construction`,
    description: `${d.service.description} Free konsultasi & survei lokasi, RAB transparan.`,
    path: `/layanan/${d.page.slug}`,
    image: d.list[0]?.cover,
  });
}

export default async function ServicePage({ params }: Props) {
  const d = load((await params).id);
  if (!d) notFound();
  const { page, service, list } = d;
  const crumbs = [
    { name: 'Layanan', path: '/layanan' },
    { name: service.name, path: `/layanan/${page.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHeader
        eyebrow={`Layanan · ${site.area}`}
        title={`${page.keyword} di ${site.area}`}
        text={service.description}
        image={list[0]?.cover}
      />
      <Breadcrumbs crumbs={crumbs} />

      <section className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
        <SectionTitle
          eyebrow={service.name}
          title="Yang kami kerjakan"
          text={`AKAA Construction melayani ${service.name.toLowerCase()} untuk ${site.areaDetail.join(', ')}, dengan konsultasi dan survei lokasi gratis serta RAB yang jelas sebelum pekerjaan dimulai.`}
        />
        <div className="reveal rounded-3xl border border-line bg-surface-2/40 p-6 sm:p-8">
          <ul className="space-y-4">
            {service.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3 text-lg font-semibold">
                <CheckIcon className="mt-1 size-5 shrink-0 text-accent-text" />
                {pt}
              </li>
            ))}
          </ul>
          <a
            href={buildWhatsAppLink(serviceMessage(service.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-wa px-5 font-bold text-white hover:brightness-110"
          >
            <WhatsAppIcon className="size-5" /> Konsultasi {service.name}
            <span className="sr-only"> (tab baru)</span>
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionTitle
            eyebrow="Portofolio"
            title={`Proyek ${service.name.toLowerCase()}`}
            text={`${list.length} proyek ${service.name.toLowerCase()} yang sudah dan sedang kami kerjakan.`}
          />
          <div className="mt-8">
            <ProjectGrid list={list} />
          </div>
        </div>
      </section>

      <Process />

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionTitle eyebrow="FAQ" title="Pertanyaan umum" />
        <div className="mt-8 divide-y divide-line border-y border-line">
          {pageFaqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-xl text-accent-text transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
