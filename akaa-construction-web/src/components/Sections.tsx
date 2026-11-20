// Section statis halaman utama (server component)
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon, CheckIcon, InstagramIcon, PinIcon, WhatsAppIcon } from './icons';
import { HeroSlides } from './HeroSlides';
import { Socials } from './Socials';
import { advantages } from '@/data/advantages';
import { faqs } from '@/data/faq';
import { processSteps } from '@/data/process';
import { imageAlt, projects } from '@/data/projects';
import { activePromos } from '@/data/promos';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage, serviceMessage } from '@/lib/whatsapp';

const btnPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-bold text-accent-ink transition hover:brightness-95';

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="reveal max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-4 leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

export function Hero() {
  const sn = projects.find((p) => p.slug === 'sn-house-rancamaya')!;
  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-night text-white"
    >
      {/* Latar: foto proyek AKAA bergantian tiap 5 detik */}
      <HeroSlides />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/85 via-night/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-night to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-40 sm:px-6 sm:pt-20">
        <p className="eyebrow animate-in !text-accent">AKAA Construction · {site.subtitle}</p>
        <h1
          className="animate-in mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-black break-words sm:text-6xl lg:text-7xl"
          style={{ '--delay': '120ms' } as React.CSSProperties}
        >
          Wujudkan rumah impian, dibangun dengan <span className="text-accent">sepenuh hati</span>
        </h1>
        <p
          className="animate-in mt-6 max-w-xl text-lg text-white/80"
          style={{ '--delay': '240ms' } as React.CSSProperties}
        >
          {site.tagline}. Jasa bangun rumah, renovasi, dan interior di {site.area}, dari desain
          sampai finishing.
        </p>
        <div
          className="animate-in mt-8 flex flex-wrap gap-3"
          style={{ '--delay': '360ms' } as React.CSSProperties}
        >
          <a href="/kontak#konsultasi" className={`${btnPrimary} rounded-full`}>
            Konsultasi Gratis <ArrowIcon className="size-5" />
          </a>
          <Link
            href="/proyek"
            className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 font-bold hover:border-white"
          >
            Lihat Proyek
          </Link>
        </div>
      </div>

      {/* Teks raksasa transparan di dasar */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-0 -z-10 font-display text-[34vw] leading-none font-black whitespace-nowrap text-white/[0.07] uppercase select-none"
      >
        AKAA
      </p>

      {/* Kartu proyek mengambang */}
      <a
        href={`/proyek#proyek-${sn.slug}`}
        className="animate-in absolute right-4 bottom-6 flex w-[min(20rem,calc(100%-2rem))] items-center gap-3 rounded-2xl border border-white/15 bg-night/70 p-3 backdrop-blur-md transition hover:border-accent sm:right-8 sm:bottom-10"
        style={{ '--delay': '520ms' } as React.CSSProperties}
      >
        <span className="relative size-20 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={sn.cover.thumb}
            alt={sn.cover.alt}
            fill
            sizes="80px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-[11px] font-bold tracking-widest text-accent uppercase">
            Sedang berjalan
          </span>
          <span className="block truncate font-bold">{sn.name}</span>
          <span className="block text-xs text-white/70">{sn.location}</span>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold">
            Lihat proyek <ArrowIcon className="size-3.5" />
          </span>
        </span>
      </a>
    </section>
  );
}

export function PromoBanner() {
  const promo = activePromos()[0];
  if (!promo) return null;
  const end = new Date(`${promo.endDate}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <section id="promo" aria-labelledby="judul-promo" className="bg-accent text-accent-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase">Promo berlaku s.d. {end}</p>
          <h2 id="judul-promo" className="font-display text-3xl font-black uppercase">
            {promo.title}
          </h2>
          <p className="mt-1 text-sm">{promo.terms.join(' · ')}</p>
        </div>
        <a
          href="/kontak#konsultasi"
          className="inline-flex min-h-12 items-center rounded-md bg-night px-6 font-bold text-white"
        >
          Klaim promo
        </a>
      </div>
    </section>
  );
}

// Gaya tiap kartu layanan: gelap, aksen kuning dengan foto, atau foto penuh
const serviceLook: Record<string, { tone: 'dark' | 'accent' | 'photo'; img?: string }> = {
  'bangun-rumah': { tone: 'photo', img: '/images/proyek/sn-house-rancamaya/15.webp' },
  renovasi: { tone: 'dark' },
  interior: { tone: 'accent', img: '/images/proyek/interior-apartemen/01.webp' },
  taman: { tone: 'photo', img: '/images/proyek/gazebo-interior-cafe-jakarta/01.webp' },
  material: { tone: 'dark' },
};

export function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal grid items-start gap-6 lg:grid-cols-[1fr_2.4fr]">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
          Layanan <ArrowIcon className="size-3" />
        </span>
        <div>
          <h2 className="font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
            Satu tim untuk rumah impian Anda
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Bangun baru, renovasi, interior, taman, sampai suplai material untuk kawasan
            Jabodetabek.
          </p>
        </div>
      </div>
      <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {services.map((s, i) => {
          const look = serviceLook[s.id] ?? { tone: 'dark' as const };
          const wide = i >= 3;
          const card =
            look.tone === 'accent'
              ? 'bg-accent text-accent-ink'
              : look.tone === 'photo'
                ? 'bg-night text-white'
                : 'bg-night text-white';
          return (
            <li
              key={s.id}
              className={`reveal group relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-[28px] p-7 ${card} ${wide ? 'lg:col-span-3' : 'lg:col-span-2'}`}
            >
              {look.tone === 'photo' && look.img && (
                <>
                  <Image
                    src={look.img}
                    alt={imageAlt(look.img, `Contoh proyek ${s.name} AKAA Construction`)}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/20"
                  />
                </>
              )}
              {look.tone === 'accent' && look.img && (
                <div className="absolute right-0 bottom-0 -z-10 h-[46%] w-[72%] overflow-hidden rounded-tl-[28px]">
                  <Image
                    src={look.img}
                    alt={imageAlt(look.img, `Contoh proyek ${s.name} AKAA Construction`)}
                    fill
                    sizes="(min-width: 1024px) 25vw, 70vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <p className="text-xs font-bold tracking-widest opacity-70">
                {String(i + 1).padStart(2, '0')}.
              </p>
              <span
                aria-hidden="true"
                className={`mt-3 block h-px w-full ${look.tone === 'accent' ? 'bg-accent-ink/40' : 'bg-white/30'}`}
              />
              <div className={look.tone === 'accent' ? 'mt-6' : 'mt-auto pt-10'}>
                <h3 className="font-display text-3xl leading-tight font-extrabold">{s.name}</h3>
                <p
                  className={`mt-3 max-w-sm text-sm leading-relaxed ${look.tone === 'accent' ? 'text-accent-ink/80' : 'text-white/75'}`}
                >
                  {s.description}
                </p>
                <a
                  href={buildWhatsAppLink(serviceMessage(s.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4 after:absolute after:inset-0"
                >
                  Konsultasikan
                  <span className="sr-only"> layanan {s.name} via WhatsApp (tab baru)</span>
                </a>
              </div>
              {/* Takik sudut kanan bawah dengan tombol panah */}
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 grid size-[4.5rem] place-items-center rounded-tl-[26px] bg-background"
              >
                <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-ink transition group-hover:rotate-45">
                  <ArrowIcon className="size-5 -rotate-45" />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// Ikon garis untuk tiap keunggulan (urutan sama dengan data advantages)
const advIcons = [
  'M4 5h16v11H8l-4 4V5Zm4 5h8M8 13h5',
  'M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'M7 3h7l5 5v13H7V3Zm7 0v5h5M10 12h6M10 16h6',
  'M4 20V10m6 10V4m6 16v-7m4 7H3',
];

export function Advantages() {
  return (
    <section id="keunggulan" className="bg-surface-2/50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="reveal rounded-3xl bg-accent p-8 text-accent-ink shadow-xl sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">Kenapa AKAA</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] font-black uppercase sm:text-5xl">
            Bangun rumah tanpa perlu drama
          </h2>
          <p className="mt-4 leading-relaxed opacity-85">
            Semua dimulai dengan obrolan santai, lalu survei dan RAB yang jelas sebelum satu bata
            pun dipasang.
          </p>
          <a
            href="/kontak#konsultasi"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 font-bold text-night shadow hover:brightness-95"
          >
            Mulai Konsultasi <ArrowIcon className="size-5" />
          </a>
        </div>

        <div>
          <h3 className="reveal font-display text-3xl font-extrabold uppercase sm:text-4xl">
            Yang Anda dapatkan
          </h3>
          <ul data-stagger className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <li key={a.title} className="reveal flex gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-accent text-accent-text">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={advIcons[i]} />
                  </svg>
                </span>
                <div>
                  <h4 className="font-display text-lg font-extrabold uppercase">{a.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Ikon garis tiap langkah cara kerja (urutan sama dengan processSteps)
const stepIcons = [
  'M4 5h16v11H8l-4 4V5Zm4 5h8M8 13h5',
  'M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'M7 3h7l5 5v13H7V3Zm7 0v5h5M10 12h6M10 16h6',
  'm3 12 4-4 5 3 5-4 4 4M7 8v9m10-10v10M3 12v5h18v-5',
  'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6',
  'M4 11 12 4l8 7M6 9.5V20h12V9.5M9.5 15l2 2 3.5-4',
];

export function Process() {
  return (
    <section id="cara-kerja" className="relative overflow-hidden bg-night text-white">
      {/* Foto kanan (desktop): menempel ke tepi layar, teks tetap sejajar container/logo */}
      <div className="absolute inset-y-0 right-0 hidden w-[36%] lg:block">
        <Image
          src="/images/proyek/renovasi-rumah-office/01.webp"
          alt="Tukang AKAA mengerjakan dinding lantai atas proyek renovasi rumah"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night via-transparent to-transparent"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="lg:w-[60%]">
          <div className="reveal">
            <p className="eyebrow !text-accent">Cara Kerja</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
              Dari obrolan sampai serah terima
            </h2>
          </div>
          <ol data-stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <li key={s.title} className="reveal">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-9 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={stepIcons[i]} />
                </svg>
                <h3 className="mt-4 font-display text-lg font-extrabold uppercase">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}.</span> {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
          <a
            href="/kontak#konsultasi"
            className="reveal mt-12 inline-flex min-h-11 items-center gap-2 font-bold text-accent hover:underline"
          >
            Mulai dari langkah pertama <ArrowIcon className="size-4" />
          </a>
        </div>
      </div>
      {/* Foto bawah (HP/tablet) */}
      <div className="relative h-72 lg:hidden">
        <Image
          src="/images/proyek/renovasi-rumah-office/01.webp"
          alt="Tukang AKAA mengerjakan dinding lantai atas proyek renovasi rumah"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-transparent"
        />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-surface-2/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.6fr]">
        <Heading eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" />
        <div data-stagger className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="reveal group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-bold">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-2xl text-accent-text transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  const rows = [
    {
      href: buildWhatsAppLink(generalMessage),
      title: 'WhatsApp',
      sub: siteConfig.waDisplay,
      icon: <WhatsAppIcon className="size-5" />,
      external: true,
    },
    {
      href: `mailto:${site.email}`,
      title: 'Email',
      sub: site.email,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
      external: false,
    },
    {
      href: site.mapsUrl,
      title: 'Kantor',
      sub: 'Ruko Fresh Market, Kota Wisata Cibubur',
      icon: <PinIcon className="size-5" />,
      external: true,
    },
    {
      href: '/kontak#konsultasi',
      title: 'Jam operasional',
      sub: site.hours ?? 'Hubungi kami via WhatsApp',
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
      ),
      external: false,
    },
    {
      href: site.social.instagram,
      title: 'Instagram',
      sub: '@akaa.official21',
      icon: <InstagramIcon className="size-5" />,
      external: true,
    },
  ];

  return (
    <section id="kontak" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.35fr] [&>*]:min-w-0">
        {/* Kiri: daftar kontak */}
        <div className="reveal rounded-[28px] border border-line bg-surface p-5 sm:p-7">
          <p className="text-sm text-muted">Hubungi kami</p>
          <ul className="mt-4 divide-y divide-line">
            {rows.map((r) => (
              <li key={r.title}>
                <a
                  href={r.href}
                  {...(r.external ? ext : {})}
                  className="group flex min-h-16 items-center gap-4 py-3"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent-text transition group-hover:bg-accent group-hover:text-accent-ink">
                    {r.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{r.title}</span>
                    <span className="block truncate text-sm text-muted">{r.sub}</span>
                  </span>
                  <ArrowIcon className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-foreground" />
                  {r.external && <span className="sr-only"> (tab baru)</span>}
                </a>
              </li>
            ))}
          </ul>
          <Socials className="mt-5" />
        </div>

        {/* Kanan: kartu gelap dengan peta lokasi */}
        <div className="reveal flex flex-col overflow-hidden rounded-[28px] bg-night text-white">
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-3xl leading-tight font-extrabold sm:text-4xl">
              Mampir ke kantor kami, atau kami yang datang ke lokasi Anda
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{site.office}</p>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
              {['Free konsultasi', 'Free survei lokasi', `Melayani ${site.area}`].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <iframe
            src={site.mapsEmbed}
            title={`Peta lokasi kantor AKAA: ${site.office}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block h-64 w-full flex-1 border-0 sm:h-72"
          />
          <div className="flex flex-wrap gap-3 p-6 sm:p-8">
            <a
              href={buildWhatsAppLink(generalMessage)}
              {...ext}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-bold text-accent-ink hover:brightness-95"
            >
              <WhatsAppIcon className="size-5" /> Jadwalkan Survei
              <span className="sr-only"> (tab baru)</span>
            </a>
            <a
              href={site.mapsUrl}
              {...ext}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-bold hover:border-white"
            >
              <PinIcon className="size-5" /> Buka di Google Maps
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
