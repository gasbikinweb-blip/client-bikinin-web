// Halaman area layanan (/area/[slug]): proyek nyata di area itu, layanan, dan kantor.
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PinIcon, WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Breadcrumbs, ProjectGrid, SectionTitle } from '@/components/SeoParts';
import { areas, getArea, projectsInArea } from '@/data/areas';
import { servicePages } from '@/data/servicePages';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { breadcrumbList, pageMetadata } from '@/lib/seo';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => areas.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  const cover = projectsInArea(a)[0]?.cover;
  return pageMetadata({
    title: `Jasa Bangun Rumah & Renovasi ${a.name} | AKAA Construction`,
    description: `Kontraktor bangun rumah, renovasi, dan custom interior di ${a.name}. Free konsultasi & survei lokasi, RAB transparan. Kantor di Cibubur.`,
    path: `/area/${a.slug}`,
    image: cover,
  });
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const list = projectsInArea(a);
  const crumbs = [{ name: `Area ${a.name}`, path: `/area/${a.slug}` }];
  const message = `Halo ${siteConfig.name}, saya di ${a.name} dan ingin konsultasi bangun rumah / renovasi.`;

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHeader
        eyebrow={`Area layanan · ${a.name}`}
        title={`Jasa bangun rumah & renovasi ${a.name}`}
        text={a.intro}
        image={list[0]?.cover}
      />
      <Breadcrumbs crumbs={crumbs} />
      {a.slug === 'cibubur' && (
        <p className="mx-auto w-full max-w-7xl px-4 pt-10 text-lg leading-relaxed sm:px-6">
          Mau renovasi rumah? Lihat{' '}
          <Link href="/layanan/renovasi" className="font-semibold text-accent-text underline">
            jasa renovasi rumah Cibubur
          </Link>{' '}
          dari AKAA: tambah lantai, dapur, atap bocor, sampai fasad.
        </p>
      )}

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionTitle
          eyebrow="Portofolio"
          title={a.projectsTitle}
          text={`${list.length} proyek AKAA Construction${a.slug === 'cibubur' ? ' di sekitar Cibubur' : ` di ${a.name}`}.`}
        />
        <div className="mt-8">
          <ProjectGrid list={list} />
        </div>
      </section>

      <section className="border-y border-line bg-surface-2/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <SectionTitle eyebrow="Layanan" title={`Layanan kami di ${a.name}`} />
            <ul className="mt-8 grid gap-3">
              {servicePages.map((l) => {
                const s = services.find((x) => x.id === l.serviceId);
                if (!s) return null;
                return (
                  <li key={l.slug} className="reveal">
                    <Link
                      href={`/layanan/${l.slug}`}
                      className="block rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
                    >
                      <span className="font-display text-xl font-extrabold uppercase">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{s.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="reveal self-start rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold uppercase">Kantor kami</h2>
            <p className="mt-4 flex gap-3 leading-relaxed">
              <PinIcon className="mt-1 size-5 shrink-0 text-accent-text" />
              {site.office}
            </p>
            {site.hours && <p className="mt-3 text-muted">{site.hours}</p>}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-wa px-5 font-bold text-white hover:brightness-110"
              >
                <WhatsAppIcon className="size-5" /> Konsultasi Gratis
                <span className="sr-only"> (tab baru)</span>
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-line px-5 font-semibold hover:border-foreground"
              >
                Buka Google Maps<span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={`Siap bangun atau renovasi di ${a.name}?`} />
    </>
  );
}
