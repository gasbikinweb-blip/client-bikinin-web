import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const stats = [
  {
    value: '100%',
    label: 'Survei & Ukur Gratis',
    desc: 'Tim kami datang langsung membawa buku sampel kain dan mengukur jendela ke seluruh area Batam tanpa biaya komitmen.',
  },
  {
    value: '9+',
    label: 'Lini Produk Interior',
    desc: 'Mulai dari gorden custom, vitrase, minimalis, blackout, vertical/horizontal/roller blinds, wallpaper vinyl, hingga rell besi.',
  },
  {
    value: '12+',
    label: 'Kawasan Layanan Batam',
    desc: 'Menjangkau Batam Centre, Nagoya, Baloi, Sukajadi, Botania, Tiban, Sekupang, Batu Aji, Bengkong, Nongsa, hingga Kabil.',
  },
] as const;

const quickLinks = [
  {
    title: 'Koleksi Gorden Custom & Vitrase',
    tag: 'Jahit Presisi Sesuai Ukuran',
    thumbs: [
      '/projects/thumbs/gorden-minimalis-krem-ruang-tamu-modern-01.webp',
      '/projects/thumbs/gorden-custom-emas-poni-klasik-01.webp',
      '/projects/thumbs/gorden-blackout-cokelat-tua-ruang-tamu-klasik-01.webp',
    ],
    href: '#katalog',
  },
  {
    title: 'Blinds Kantor, Wallpaper & Rell Besi',
    tag: 'Solusi Modern & Fungsional',
    thumbs: [
      '/projects/thumbs/horizontal-blinds-abu-dapur-01.webp',
      '/projects/thumbs/gorden-minimalis-abu-vitrase-pintu-besar-01.webp',
      '/projects/thumbs/rell-besi-tutup-endcup-katalog-02.webp',
    ],
    href: '#solusi-ruangan',
  },
] as const;

const pillars = [
  {
    title: 'Dijahit Presisi & Rapi',
    desc: 'Setiap helai gorden dipotong dan dijahit khusus mengikuti ukuran hasil survei lokasi. Lipatan gelombang, kelim tepi, dan jatuhan kain dihitung proporsional.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 fill-none stroke-current stroke-1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-6 6 6 6-6M5 7h14" />
      </svg>
    ),
  },
  {
    title: 'Pilihan Bahan & Warna Lengkap',
    desc: 'Cocokkan langsung tekstur kain blackout, dimout, vitrase siang, maupun bilah blinds dengan warna cat dinding dan sofa di ruangan Anda saat tim kami survei.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 fill-none stroke-current stroke-1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm0 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z"
        />
      </svg>
    ),
  },
  {
    title: 'Kenyamanan & Privasi Ruang',
    desc: 'Kami merancang tata cahaya jendela yang seimbang: menahan terik matahari Batam yang menyengat, menjaga privasi keluarga, dan mempercantik estetika ruang.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 fill-none stroke-current stroke-1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3 4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-8-6Zm0 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
        />
      </svg>
    ),
  },
] as const;

// 6 Segmen Properti dengan Ikon Arsitektur Minimalis (seperti bar ARCHITECT / INTERIOR / REAL ESTATE di referensi)
const propertySegments = [
  {
    code: 'HUNIAN',
    sub: 'RUMAH & PERUMAHAN',
    icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Zm6 10.5v-6h6v6" />,
  },
  {
    code: 'APARTEMEN',
    sub: 'HIGH-RISE UNIT',
    icon: (
      <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M3 21h18M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" />
    ),
  },
  {
    code: 'KANTOR',
    sub: 'RUKO & KOMERSIAL',
    icon: (
      <path d="M4 21V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15m0-11h3a2 2 0 0 1 2 2v9M2 21h20M8 8h3M8 12h3M8 16h3" />
    ),
  },
  {
    code: 'HOSPITALITY',
    sub: 'VILLA & HOTEL',
    icon: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a3 3 0 0 1 6 0v4M9 10h.01M15 10h.01" />,
  },
  {
    code: 'INTERIOR',
    sub: 'CUSTOM & STYLING',
    icon: <path d="M4 5h16M6 5v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5M9 5v14M15 5v14" />,
  },
  {
    code: 'PROYEK',
    sub: 'KONTRAKTOR & DEV',
    icon: <path d="M3 21h18M4 21V9l8-5 8 5v12M8 21v-8h8v8" />,
  },
] as const;

export function AboutSection() {
  const waSurveyUrl = buildWhatsAppLink(generalMessage);

  return (
    <section id="tentang" aria-labelledby="judul-tentang-editorial" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ---------- BAGIAN 1: Editorial Header + Two-Tone Gold + Inline Pill Image ---------- */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              <span>Tentang {siteConfig.name}</span>
            </p>
            <h2
              id="judul-tentang-editorial"
              className="mt-3 font-serif text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Interior <span className="text-accent">Gorden Elegan</span>
              <br />
              <span className="inline-flex flex-wrap items-center gap-3 sm:gap-4">
                <span>untuk Hunian Impian</span>
                <span className="relative inline-block h-11 w-24 overflow-hidden rounded-full border-2 border-accent/50 bg-surface-2 align-middle shadow-md sm:h-14 sm:w-32">
                  <Image
                    src="/projects/thumbs/gorden-minimalis-krem-ruang-tamu-modern-01.webp"
                    alt=""
                    fill
                    sizes="130px"
                    className="object-cover"
                  />
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Hadirkan keanggunan fungsional dan tata cahaya yang seimbang di setiap sudut ruangan.
              Di <strong className="font-semibold text-foreground">{siteConfig.name}</strong> (
              <em>{siteConfig.legalOrLogoName}</em>), kami mewujudkan jendela impian Anda di seluruh
              Batam dengan pengukuran presisi.
            </p>
          </div>
        </div>

        {/* ---------- BAGIAN 2: Bento Asymmetric Showcase (Tanpa Ikon Orang) ---------- */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Kiri: Kartu Gambar Besar dengan Cutout Badge Sudut Kiri Atas & Cutout Button Kanan Bawah */}
          <div className="reveal relative min-h-[380px] overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-lg sm:min-h-[460px] lg:col-span-7">
            <Image
              src="/projects/gorden-minimalis-krem-ruang-tamu-modern-01.webp"
              alt="Pemasangan gorden minimalis plafon tinggi yang rapi oleh Gorden Interior Batam"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

            {/* Cutout Card Kiri Atas: TANPA avatar/ikon orang */}
            <div className="absolute top-0 left-0 z-10 max-w-[265px] rounded-br-3xl border-r border-b border-line bg-background/95 p-4 backdrop-blur-md sm:p-5">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-5 rounded-full border border-black/20 bg-[#12100d] shadow-sm" />
                <span className="-ml-2 size-5 rounded-full border border-black/15 bg-[#c59b57] shadow-sm" />
                <span className="-ml-2 size-5 rounded-full border border-black/15 bg-[#f5efe6] shadow-sm" />
                <span className="-ml-2 size-5 rounded-full border border-black/15 bg-[#1d324c] shadow-sm" />
                <span className="ml-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-accent uppercase">
                  Custom Fit
                </span>
              </div>
              <p className="mt-2.5 text-xs font-semibold text-foreground sm:text-sm">
                Gratis Bawa Sampel Bahan
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                <span className="text-accent" aria-hidden="true">
                  ★★★★★
                </span>
                <span>Survei &amp; ukur di lokasi Batam</span>
              </p>
            </div>

            {/* Cutout Pill CTA Kanan Bawah */}
            <div className="absolute right-0 bottom-0 z-10 rounded-tl-3xl border-t border-l border-line bg-background/95 p-3 backdrop-blur-md sm:p-4">
              <a
                href={waSurveyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition-all hover:bg-accent sm:text-sm"
              >
                <span>Survei Gratis</span>
                <span className="grid size-6 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Kanan: Gambar Lebar di Atas + 2 Baris Koleksi Interaktif di Bawah */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="reveal relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-md">
              <Image
                src="/projects/gorden-blackout-abu-sofa-ruang-tamu-01.webp"
                alt="Kombinasi gorden blackout dan vitrase di ruang keluarga modern"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="theme-dark absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full bg-black/60 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  Workshop: Batam Centre
                </span>
                <span className="text-xs font-semibold tracking-wider text-accent-strong uppercase">
                  Jahitan Presisi
                </span>
              </div>
            </div>

            {/* 2 Item List dengan Mini Product Thumbnails & Tombol Panah Bulat */}
            <div className="divide-y divide-line border-y border-line">
              {quickLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent sm:text-2xl">
                      {item.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center -space-x-2">
                        {item.thumbs.map((src) => (
                          <span
                            key={src}
                            className="relative inline-block size-6 overflow-hidden rounded-full border border-background bg-surface-2 shadow-sm"
                          >
                            <Image src={src} alt="" fill sizes="28px" className="object-cover" />
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted">{item.tag}</span>
                    </div>
                  </div>

                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-accent">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- BAGIAN 3: Bar Statistik Lebar (3 Kolom) ---------- */}
      <div className="mt-16 border-y border-line bg-surface py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 text-center sm:px-6 md:grid-cols-3">
          {stats.map((st) => (
            <div key={st.label} className="reveal mx-auto max-w-xs">
              <p className="font-serif text-5xl font-semibold tracking-tight text-accent sm:text-6xl">
                {st.value}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">{st.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- BAGIAN 4: "Lebih dari sekadar gorden..." + Overlapping Image ---------- */}
      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              <span>Filosofi Pengerjaan Kami</span>
            </p>
            <h3 className="mt-3 font-serif text-3xl leading-[1.12] font-semibold sm:text-5xl">
              Lebih dari sekadar penutup jendela —{' '}
              <span className="text-accent">ciptakan ruang yang Anda cintai.</span>
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              Di <strong className="font-semibold text-foreground">{siteConfig.name}</strong>, kami
              percaya setiap jendela menentukan kenyamanan suhu, privasi, dan karakter sebuah
              ruangan. Karena itu kami tidak sekadar menjual kain gorden, melainkan mendampingi Anda
              mulai dari pengukuran di lokasi, pemilihan tekstur bahan, hingga instalasi akhir yang
              bersih dan kokoh.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Alamat Workshop: <strong className="text-foreground">{siteConfig.address}</strong>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#katalog"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-xs font-semibold text-background transition-all hover:bg-accent sm:text-sm"
              >
                <span>Jelajahi Katalog</span>
                <span className="grid size-6 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href={waSurveyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent sm:text-sm"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>

          <div className="relative pb-8 lg:col-span-6 lg:pr-8">
            <div className="reveal relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-xl">
              <Image
                src="/projects/gorden-custom-abu-vitrase-void-tinggi-01.webp"
                alt="Jatuhan gelombang gorden minimalis yang simetris di jendela tinggi"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="reveal absolute right-0 -bottom-2 w-48 overflow-hidden rounded-2xl border-4 border-background bg-surface shadow-2xl sm:w-64">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/projects/gorden-custom-krem-ruang-tamu-mewah-01.webp"
                  alt="Detail pemasangan gorden custom krem dan vitrase ruang tamu oleh Gorden Interior Batam"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-2 left-2.5 rounded-full bg-black/55 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
                  Detail Gelombang Rapi
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- BAGIAN 5: 3 Pilar Nilai ---------- */}
        <div className="mt-20 grid gap-8 border-t border-line pt-14 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="reveal flex flex-col items-center text-center">
              <div className="grid size-12 place-items-center rounded-full bg-foreground text-background shadow-md">
                {pillar.icon}
              </div>
              <h4 className="mt-5 font-serif text-2xl font-semibold text-foreground">
                {pillar.title}
              </h4>
              <p className="mt-2.5 max-w-sm text-xs leading-relaxed text-muted sm:text-sm">
                {pillar.desc}
              </p>
            </article>
          ))}
        </div>

        {/* ---------- BAGIAN 6: Badge Segmen Properti (Persis Bar ARCHITECT / INTERIOR di Referensi) ---------- */}
        <div className="mt-20">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-line" />
            <p className="text-center text-xs font-semibold tracking-wider text-muted">
              Melayani Berbagai Jenis <span className="text-accent">Properti di Batam</span>
            </p>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {propertySegments.map((seg) => (
              <div
                key={seg.code}
                className="flex items-center justify-center gap-3 rounded-2xl border border-line bg-surface/60 px-4 py-3.5 transition-colors hover:border-accent/50"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-7 shrink-0 fill-none stroke-accent stroke-1.5"
                >
                  {seg.icon}
                </svg>
                <div className="text-left">
                  <p className="text-[11px] font-bold tracking-widest text-foreground uppercase">
                    {seg.code}
                  </p>
                  <p className="text-[9px] tracking-wider text-muted uppercase">{seg.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
