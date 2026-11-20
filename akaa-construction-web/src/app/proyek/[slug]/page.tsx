// Halaman detail proyek (/proyek/[slug]): satu halaman per proyek agar foto & cerita proyek terindeks Google.
// Popup di /proyek tetap ada; halaman ini versi lengkap yang bisa dibagikan dan dicari.
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand, PageHeader } from '@/components/PageParts';
import { Breadcrumbs, ProjectGrid, SectionTitle } from '@/components/SeoParts';
import { projects, statusLabel, workTypeLabel } from '@/data/projects';
import { breadcrumbList, pageMetadata } from '@/lib/seo';
import { buildWhatsAppLink, projectMessage } from '@/lib/whatsapp';

type Props = { params: Promise<{ slug: string }> };

// Semua halaman dibuat saat build (static export); slug lain → 404
export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

const find = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  // Lokasi tanpa bagian yang sudah ada di nama proyek (mis. "Harvest City")
  const place = p.location
    ?.split(', ')
    .filter((part) => !p.name.includes(part))
    .join(', ');
  const where = place ? `, ${place}` : '';
  return pageMetadata({
    title: `${p.name}${where} | AKAA Construction`,
    description: `${workTypeLabel[p.workType]} ${p.year}${where}: ${p.scope ?? p.name}. Lihat foto${p.progress?.length ? ' dan progress' : ''} proyek AKAA Construction.`,
    path: `/proyek/${p.slug}`,
    image: p.cover,
  });
}

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default async function ProjectPage({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();

  const crumbs = [
    { name: 'Proyek', path: '/proyek' },
    { name: p.name, path: `/proyek/${p.slug}` },
  ];
  // Galeri: cover + foto proyek, tanpa duplikat
  const gallery = [p.cover, ...p.images].filter(
    (img, i, all) => all.findIndex((x) => x.src === img.src) === i,
  );
  const related = projects
    .filter((x) => x.slug !== p.slug && x.workType === p.workType)
    .slice(0, 3);
  const info = [
    ['Jenis pekerjaan', workTypeLabel[p.workType]],
    ['Lokasi', p.location ?? 'Jabodetabek'],
    ['Tahun', String(p.year)],
    ['Status', statusLabel[p.status]],
  ] as const;

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHeader
        eyebrow={`${workTypeLabel[p.workType]} · ${p.year}`}
        title={p.name}
        text={p.scope}
        image={p.cover}
      />
      <Breadcrumbs crumbs={crumbs} />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_22rem] lg:py-20">
        {/* Galeri */}
        <div>
          <SectionTitle eyebrow="Galeri" title="Foto proyek" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {gallery.map((img, i) => (
              <li key={img.src} className={`reveal ${i === 0 ? 'sm:col-span-2' : ''}`}>
                <figure>
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-surface-2 ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        i === 0
                          ? '(min-width: 1024px) 60vw, 100vw'
                          : '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'
                      }
                      className="object-cover"
                    />
                    {img.kind === 'render' && (
                      <span className="absolute top-3 left-3 rounded bg-night/80 px-2 py-1 text-xs font-bold text-white">
                        Desain 3D
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-2 text-sm text-muted">{img.alt}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {/* Info proyek */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line bg-surface-2/40 p-6">
            <h2 className="font-display text-xl font-extrabold uppercase">Info proyek</h2>
            <dl className="mt-4 divide-y divide-line text-sm">
              {info.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={buildWhatsAppLink(projectMessage(p.name, p.slug))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-wa px-5 font-bold text-white hover:brightness-110"
            >
              <WhatsAppIcon className="size-5" /> Konsultasikan Proyek Serupa
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </aside>
      </section>

      {p.progress && p.progress.length > 0 && (
        <section className="border-y border-line bg-surface-2/50">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
            <SectionTitle
              eyebrow="Progress"
              title="Timeline pengerjaan"
              text={`${p.progress.length} update progress dari ${longDate(p.progress[0]!.date)} sampai ${longDate(p.progress[p.progress.length - 1]!.date)}.`}
            />
            <ol className="mt-10 border-l-2 border-line">
              {p.progress.map((u, idx) => (
                <li key={`${u.date}-${idx}`} className="reveal relative pb-10 pl-6 last:pb-0">
                  <span className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-surface bg-accent" />
                  <p className="text-xs font-bold tracking-widest text-muted uppercase">
                    <time dateTime={u.date}>{longDate(u.date)}</time>
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{u.stage}</h3>
                  {u.note && <p className="mt-1 text-muted">{u.note}</p>}
                  {u.images && (
                    <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {u.images.map((x) => (
                        <li
                          key={x.src}
                          className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-2"
                        >
                          <Image
                            src={x.thumb}
                            alt={x.alt}
                            fill
                            sizes="(min-width: 640px) 240px, 45vw"
                            className="object-cover"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionTitle
            eyebrow="Proyek lain"
            title={`Proyek ${workTypeLabel[p.workType].toLowerCase()} lainnya`}
          />
          <div className="mt-8">
            <ProjectGrid list={related} />
          </div>
        </section>
      )}

      <CtaBand title="Mau proyek seperti ini?" />
    </>
  );
}
