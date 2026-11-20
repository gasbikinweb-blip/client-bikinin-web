// Bagian bersama halaman proyek, layanan, dan area (server component)
import Image from 'next/image';
import Link from 'next/link';
import { statusLabel, workTypeLabel } from '@/data/projects';
import type { Project } from '@/data/types';
import type { Crumb } from '@/lib/seo';

/** Breadcrumb yang terlihat (pasangan dari JSON-LD BreadcrumbList) */
export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  const all = [{ name: 'Beranda', path: '/' }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-surface-2/40">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 px-4 py-3 text-sm sm:px-6">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.path}
                    className="inline-flex min-h-11 items-center text-muted hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-muted">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Grid kartu proyek yang mengarah ke halaman /proyek/[slug] */
export function ProjectGrid({ list }: { list: readonly Project[] }) {
  return (
    <ul data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <li key={p.slug} className="reveal">
          <Link
            href={`/proyek/${p.slug}`}
            className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface-2/40 transition hover:border-accent"
          >
            <span className="relative block aspect-[4/3] overflow-hidden">
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </span>
            <span className="block p-5">
              <span className="text-xs font-bold tracking-widest text-accent-text uppercase">
                {workTypeLabel[p.workType]} · {p.year} · {statusLabel[p.status]}
              </span>
              <span className="mt-1 block font-display text-xl font-extrabold uppercase">
                {p.name}
              </span>
              {p.location && <span className="mt-1 block text-sm text-muted">{p.location}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Judul section halaman SEO */
export function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="reveal max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl leading-[1.05] font-extrabold uppercase sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 leading-relaxed text-muted">{text}</p>}
    </div>
  );
}
