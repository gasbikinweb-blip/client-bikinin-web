'use client';

// Portofolio: filter, kartu, dan modal detail proyek (deep link /#proyek-[slug]).
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowIcon, CloseIcon, LinkIcon, WhatsAppIcon } from './icons';
import { projects, projectSlugs, statusLabel, workTypeLabel } from '@/data/projects';
import type { Project, ProjectImage, WorkType } from '@/data/types';
import { buildWhatsAppLink, projectMessage, projectUrl } from '@/lib/whatsapp';

const PREFIX = '#proyek-';
const types = (Object.keys(workTypeLabel) as WorkType[]).filter((t) =>
  projects.some((p) => p.workType === t),
);
// Tahun yang punya proyek saja (tahun kosong tidak ditampilkan agar tidak terkesan vakum)
const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => a - b);
const countByYear = (y: number) => projects.filter((p) => p.year === y).length;
const firstYear = years[0];
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

function slugFromHash() {
  const h = window.location.hash;
  if (!h.startsWith(PREFIX)) return null;
  const slug = h.slice(PREFIX.length);
  return projectSlugs.has(slug) ? slug : null; // whitelist
}

function Chip({
  on,
  onClick,
  disabled = false,
  children,
}: {
  on: boolean;
  onClick: () => void;
  /** Nonaktif bila memilihnya membuat hasil kosong */
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      disabled={disabled && !on}
      className="min-h-11 rounded-md border border-line px-4 text-sm font-semibold hover:border-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-bold ${
        status === 'berjalan' ? 'bg-accent text-accent-ink' : 'bg-night/80 text-white'
      }`}
    >
      {status === 'berjalan' && (
        <span className="size-1.5 animate-pulse rounded-full bg-accent-ink" />
      )}
      {statusLabel[status]}
    </span>
  );
}

export function Projects() {
  const [type, setType] = useState<WorkType | 'semua'>('semua');
  const [status, setStatus] = useState<Project['status'] | 'semua'>('semua');
  const [year, setYear] = useState<number | 'semua'>('semua');
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  // Buka modal dari URL (langsung atau tombol Back/Forward)
  useEffect(() => {
    const sync = () => setOpenSlug(slugFromHash());
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = (slug: string, el: HTMLElement) => {
    trigger.current = el;
    history.pushState(null, '', `${PREFIX}${slug}`);
    setOpenSlug(slug);
  };

  const close = useCallback(() => {
    if (slugFromHash()) history.back();
    else setOpenSlug(null);
    setOpenSlug(null);
    trigger.current?.focus();
  }, []);

  type F = {
    type: WorkType | 'semua';
    status: Project['status'] | 'semua';
    year: number | 'semua';
  };
  const match = (f: F) =>
    projects.filter(
      (p) =>
        (f.type === 'semua' || p.workType === f.type) &&
        (f.status === 'semua' || p.status === f.status) &&
        (f.year === 'semua' || p.year === f.year),
    );
  const cur: F = { type, status, year };
  const list = match(cur);
  // Jumlah hasil bila satu filter diganti (untuk menonaktifkan pilihan yang kosong)
  const countIf = (patch: Partial<F>) => match({ ...cur, ...patch }).length;
  const reset = () => {
    setType('semua');
    setStatus('semua');
    setYear('semua');
  };
  const project = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="proyek" className="border-y border-line bg-surface-2/50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Proyek</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
              Bukti kerja di lapangan
            </h2>
            <p className="mt-4 text-muted">
              Dokumentasi asli proyek AKAA, termasuk progress proyek yang sedang berjalan.
            </p>
          </div>
          {firstYear && (
            <dl className="flex gap-6 rounded-2xl border border-line bg-surface px-5 py-4">
              <div>
                <dt className="text-xs text-muted">Dipercaya sejak</dt>
                <dd className="font-display text-3xl font-black text-accent-text">{firstYear}</dd>
              </div>
              <div className="border-l border-line pl-6">
                <dt className="text-xs text-muted">Proyek terdokumentasi</dt>
                <dd className="font-display text-3xl font-black">{projects.length}</dd>
              </div>
            </dl>
          )}
        </div>

        {/* Filter tahun: gaya garis waktu */}
        <div className="mt-10" role="group" aria-label="Filter tahun proyek">
          <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Tahun proyek</p>
          <ol className="relative mt-3 flex gap-2 overflow-x-auto pb-1">
            <li>
              <Chip on={year === 'semua'} onClick={() => setYear('semua')}>
                Semua tahun
              </Chip>
            </li>
            {years.map((y) => (
              <li key={y}>
                <Chip
                  on={year === y}
                  disabled={countIf({ year: y }) === 0}
                  onClick={() => setYear(year === y ? 'semua' : y)}
                >
                  {y}{' '}
                  <span className="ml-1 rounded bg-current/10 px-1.5 text-xs">
                    {countByYear(y)}
                  </span>
                  <span className="sr-only"> proyek</span>
                </Chip>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter jenis pekerjaan">
          <Chip on={type === 'semua'} onClick={() => setType('semua')}>
            Semua
          </Chip>
          {types.map((t) => (
            <Chip
              key={t}
              on={type === t}
              disabled={countIf({ type: t }) === 0}
              onClick={() => setType(t)}
            >
              {workTypeLabel[t]}
            </Chip>
          ))}
          <span className="mx-1 w-px self-stretch bg-line" aria-hidden="true" />
          {(['berjalan', 'selesai'] as const).map((s) => (
            <Chip
              key={s}
              on={status === s}
              disabled={countIf({ status: s }) === 0}
              onClick={() => setStatus(status === s ? 'semua' : s)}
            >
              {statusLabel[s]}
            </Chip>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {list.length} proyek ditampilkan
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li
              key={p.slug}
              className="animate-in group relative overflow-hidden rounded-lg border border-line bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <Image
                  src={p.cover.thumb}
                  alt={p.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3">
                  <StatusBadge status={p.status} />
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold tracking-widest text-accent-text uppercase">
                  {workTypeLabel[p.workType]} · {p.year}
                </p>
                <h3 className="mt-2 font-display text-xl leading-tight font-extrabold uppercase">
                  <button
                    type="button"
                    onClick={(e) => open(p.slug, e.currentTarget)}
                    className="text-left after:absolute after:inset-0"
                  >
                    {p.name}
                  </button>
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {p.location ?? 'Jabodetabek'}
                  {p.progress && ` · ${p.progress.length} update progress`}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p className="mt-8 text-muted">
            Belum ada proyek untuk filter ini.{' '}
            <button type="button" onClick={reset} className="font-bold text-accent-text underline">
              Tampilkan semua proyek
            </button>
          </p>
        )}
      </div>
      <ProjectModal project={project} onClose={close} />
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = project !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-modal="true"
      aria-labelledby="judul-proyek"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="project-modal"
    >
      {project && <Detail key={project.slug} project={project} onClose={onClose} />}
    </dialog>
  );
}

function Detail({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const touch = useRef<number | null>(null);
  const n = p.images.length;
  const go = (step: number) => setI((v) => (v + step + n) % n);
  const showImage = (img: ProjectImage) => {
    const idx = p.images.findIndex((x) => x.src === img.src);
    if (idx >= 0) setI(idx);
    document.getElementById('galeri-proyek')?.scrollIntoView({ behavior: 'smooth' });
  };

  const copy = async () => {
    const url = projectUrl(p.slug);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Cadangan untuk browser tanpa Clipboard API
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const img = p.images[i]!;
  return (
    <div
      className="max-h-[inherit] overflow-y-auto"
      onKeyDown={(e) => {
        if (n < 2) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
        <p className="text-xs font-bold tracking-widest text-accent-text uppercase">
          {workTypeLabel[p.workType]} · {p.year}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail proyek"
          className="grid size-11 place-items-center rounded-md border border-line hover:border-foreground"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* Galeri: kartu foto penuh + overlay judul, kontrol bulat & bar progres */}
        <div id="galeri-proyek" className="min-w-0 bg-surface-2/60 p-3 sm:p-5">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-night shadow-xl sm:aspect-[4/3.4]"
            onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              const start = touch.current;
              const end = e.changedTouches[0]?.clientX;
              if (start !== null && end !== undefined && Math.abs(end - start) > 40)
                go(end < start ? 1 : -1);
              touch.current = null;
            }}
          >
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="animate-in object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent"
            />
            {img.kind === 'render' && (
              <span className="absolute top-4 left-4 rounded bg-white px-2 py-1 text-xs font-bold text-night">
                Render Desain
              </span>
            )}
            {n > 1 && (
              <span className="absolute top-4 right-4 rounded-md bg-night/80 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-white">
                {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                {workTypeLabel[p.workType]} · {p.year}
              </p>
              <p className="mt-2 font-display text-2xl leading-tight font-black uppercase sm:text-3xl">
                {p.name}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-white/75">{img.alt}</p>
              {n > 1 && (
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto sebelumnya"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-white/40 hover:border-white hover:bg-white/10"
                  >
                    <ArrowIcon dir="left" className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Foto berikutnya"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-white/40 hover:border-white hover:bg-white/10"
                  >
                    <ArrowIcon className="size-5" />
                  </button>
                  <div className="ml-2 flex flex-1 gap-1.5" aria-hidden="true">
                    {p.images.map((x, idx) => (
                      <span
                        key={x.src}
                        className={`h-1 flex-1 rounded-full transition-colors ${idx === i ? 'bg-accent' : 'bg-white/25'}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {n > 1 && (
            <>
              <p className="mt-5 text-xs font-bold tracking-[0.2em] text-muted uppercase">
                Pilih foto
              </p>
              <ul className="mt-3 flex gap-3 overflow-x-auto px-1 pt-1 pb-2">
                {p.images.map((x, idx) => (
                  <li key={x.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setI(idx)}
                      aria-label={`Lihat foto ${idx + 1}`}
                      aria-current={idx === i}
                      className="relative block h-24 w-20 overflow-hidden rounded-xl opacity-60 ring-2 ring-transparent transition hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-accent sm:h-28 sm:w-24"
                    >
                      <Image src={x.thumb} alt="" fill sizes="96px" className="object-cover" />
                      {idx === i && (
                        <span className="absolute top-1.5 left-1.5 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-ink uppercase">
                          Dipilih
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={p.status} />
          </div>
          <h2
            id="judul-proyek"
            className="mt-3 font-display text-3xl leading-tight font-black uppercase"
          >
            {p.name}
          </h2>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted">Lokasi</dt>
              <dd className="font-semibold">{p.location ?? 'Jabodetabek'}</dd>
            </div>
            <div>
              <dt className="text-muted">Jenis pekerjaan</dt>
              <dd className="font-semibold">{workTypeLabel[p.workType]}</dd>
            </div>
          </dl>
          {p.scope && <p className="mt-4 leading-relaxed text-muted">{p.scope}</p>}

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={buildWhatsAppLink(projectMessage(p.name, p.slug))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-wa px-5 font-bold text-white hover:brightness-110"
            >
              <WhatsAppIcon className="size-5" /> Konsultasikan Proyek Serupa
              <span className="sr-only"> (tab baru)</span>
            </a>
            <Link
              href={`/proyek/${p.slug}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-line px-4 font-semibold hover:border-foreground"
            >
              Halaman proyek <ArrowIcon className="size-4" />
            </Link>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-line px-4 font-semibold hover:border-foreground"
            >
              <LinkIcon className="size-5" /> {copied ? 'Link disalin' : 'Salin Link'}
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied ? 'Link proyek disalin' : ''}
          </p>

          {p.progress && p.progress.length > 0 && (
            <section aria-labelledby="judul-progress" className="mt-8">
              <h3 id="judul-progress" className="font-display text-xl font-extrabold uppercase">
                Timeline progress
              </h3>
              <ol className="mt-4 border-l-2 border-line">
                {p.progress.map((u, idx) => (
                  <li key={`${u.date}-${idx}`} className="relative pb-5 pl-5 last:pb-0">
                    <span className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-surface bg-accent" />
                    <p className="text-xs font-bold text-muted">{longDate(u.date)}</p>
                    <p className="font-semibold">{u.stage}</p>
                    {u.note && <p className="text-sm text-muted">{u.note}</p>}
                    {u.images && (
                      <ul className="mt-2 flex gap-2">
                        {u.images.map((x) => (
                          <li key={x.src}>
                            <button
                              type="button"
                              onClick={() => showImage(x)}
                              aria-label={`Perbesar foto: ${x.alt}`}
                              className="relative block size-16 overflow-hidden rounded"
                            >
                              <Image
                                src={x.thumb}
                                alt=""
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
