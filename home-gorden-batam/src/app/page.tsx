import Image from 'next/image';
import Link from 'next/link';
import { AboutSection } from '@/components/AboutSection';
import { ArrowIcon, PlusIcon, WhatsAppIcon } from '@/components/icons';
import { OrderSteps } from '@/components/OrderSteps';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ProjectGallery } from '@/components/ProjectGallery';
import { QuoteCarousel } from '@/components/QuoteCarousel';
import { RoomSelector } from '@/components/RoomSelector';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppBuilder } from '@/components/WhatsAppBuilder';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { faqs } from '@/data/faq';
import { getAllProducts, getCategories } from '@/data/products';
import { quotes } from '@/data/quotes';
import { getRooms } from '@/data/rooms';
import { getAllAreas } from '@/data/areas';
import { siteConfig } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function HomePage() {
  const allProducts = getAllProducts();
  const categories = getCategories();

  return (
    <>
      {/* ---------- 1. Hero dengan Background Video ---------- */}
      {/* theme-dark: teks tetap terang di atas video hasil pemasangan di mode apa pun */}
      <section
        id="beranda"
        className="theme-dark relative isolate -mt-16 flex min-h-[96svh] items-center overflow-hidden sm:-mt-20"
      >
        {/* Poster fallback statis & bagi pengguna dengan penghemat gerak (motion-reduce) */}
        <Image
          src="/videos/video-pemasangan-gorden-01-poster.webp"
          alt="Hasil pemasangan gorden minimalis dan vitrase oleh Gorden Interior Batam"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Video latar ringan berjalan mulus tanpa lag */}
        <video
          className="absolute inset-0 -z-20 size-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/video-pemasangan-gorden-01-poster.webp"
          aria-hidden="true"
        >
          <source src="/videos/video-pemasangan-gorden-01.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/60 to-page" />

        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 text-center sm:px-6">
          <p
            className="animate-in inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/50 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-accent-strong uppercase backdrop-blur-sm"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            {siteConfig.tagline}
          </p>
          <h1
            className="animate-in mx-auto mt-6 max-w-4xl font-serif text-4xl leading-[1.08] font-medium sm:text-6xl lg:text-7xl"
            style={{ '--delay': '250ms' } as React.CSSProperties}
          >
            Gorden Rapi dan Elegan untuk Hunian &amp; Ruang Kerja Anda di Batam
          </h1>
          <p
            className="animate-in mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg"
            style={{ '--delay': '450ms' } as React.CSSProperties}
          >
            Mulai dari gorden custom, vitrase siang, blackout penahan panas, tirai blinds kantor,
            hingga wallpaper vinyl. Tim kami datang membawa sampel bahan dan mengukur jendela ke
            lokasi Anda di seluruh area Batam—gratis tanpa biaya survei.
          </p>
          <div
            className="animate-in mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
            style={{ '--delay': '650ms' } as React.CSSProperties}
          >
            {/* Gulir halus ke pembuat pesan survei, bukan langsung membuka WhatsApp */}
            <a
              href="#hitung-survei"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
              <span>Minta Survei Gratis</span>
            </a>
            <a
              href="#katalog"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/30 bg-black/40 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-strong hover:text-accent-strong"
            >
              Lihat Katalog Produk
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 2. Tentang Kami & Keunggulan (Gaya Editorial Kreatif Sesuai Referensi) ---------- */}
      <AboutSection />

      {/* ---------- 3. Katalog Produk Lengkap + Modal Detail ---------- */}
      <section
        id="katalog"
        aria-labelledby="judul-produk"
        className="scroll-mt-20 border-t border-line py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-produk"
            eyebrow="Katalog Produk &amp; Layanan"
            title="Pilihan Gorden, Blinds, Wallpaper &amp; Rell Besi"
            description="Klik tombol Detail atau foto produk untuk membuka rincian spesifikasi lengkap, rekomendasi ruangan, dan penawaran WhatsApp langsung di layar Anda."
            align="center"
          />

          <div className="mt-12">
            <ProductCatalog products={allProducts} categories={categories} />
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/produk"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
            >
              Buka halaman katalog lengkap <ArrowIcon className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- 4. Inspirasi Solusi per Ruangan (Interactive RoomSelector) ---------- */}
      <section
        id="solusi-ruangan"
        aria-labelledby="judul-ruang"
        className="relative scroll-mt-20 overflow-hidden bg-surface py-24"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-ruang"
            eyebrow="Solusi Per Ruangan"
            title="Rekomendasi Gorden untuk Setiap Sudut Ruangan"
            description="Pilih jenis ruangan di bawah ini untuk melihat rekomendasi paduan kain gorden, vitrase, atau blinds yang paling tepat."
            align="center"
          />
          <div className="reveal reveal-blur mt-12">
            <RoomSelector rooms={getRooms()} />
          </div>
        </div>
      </section>

      {/* ---------- 5. Portofolio Hasil Pemasangan & 5 Video ---------- */}
      <section id="portofolio" aria-labelledby="judul-portofolio" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-portofolio"
            eyebrow="Dokumentasi Proyek Nyata"
            title="Portofolio Foto &amp; Video Hasil Pemasangan di Batam"
            description="Kerapian jahitan, jatuhan gelombang kain yang simetris, dan pemasangan rell yang kokoh di berbagai perumahan, apartemen, dan ruang kerja."
            align="center"
          />

          <div className="mt-14">
            <ProjectGallery />
          </div>
        </div>
      </section>

      {/* ---------- 6. Cara Kerja dalam 4 Langkah ---------- */}
      <OrderSteps />

      {/* ---------- Kutipan Prinsip Interior ---------- */}
      <section
        aria-label="Prinsip tata cahaya dan interior jendela"
        className="relative isolate overflow-hidden bg-surface py-24"
      >
        <div className="reveal reveal-blur px-4 pt-6 sm:px-6">
          <QuoteCarousel quotes={quotes} />
        </div>
      </section>

      {/* ---------- 7. FAQ Aksesibel ---------- */}
      <section id="faq" aria-labelledby="judul-faq" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            id="judul-faq"
            eyebrow="Pertanyaan Umum"
            title="Hal yang Sering Ditanyakan Seputar Pemesanan &amp; Survei"
          />
          <div data-stagger className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <details key={f.id} className="reveal reveal-left group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium transition-colors group-open:text-accent-strong [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong"
          >
            Lihat semua pertanyaan <ArrowIcon className="size-4" />
          </Link>
        </div>
      </section>

      {/* ---------- 9. Kontak, Alamat, & Pembuat Pesan WhatsApp ---------- */}
      <section
        id="kontak"
        aria-labelledby="judul-kontak"
        className="scroll-mt-20 border-t border-line bg-surface py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-kontak"
            eyebrow="Kontak &amp; Lokasi"
            title="Jadwalkan Survei &amp; Pengukuran Gratis di Batam"
            description="Semua pertanyaan, pengiriman sampel bahan ke lokasi, dan penawaran harga dilayani langsung lewat WhatsApp resmi kami."
            align="center"
          />

          {/* 3 Kartu Info Kontak */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* 1. Kartu WhatsApp Resmi */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-background p-7 shadow-sm">
              <div>
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  Respons Cepat
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium">WhatsApp Resmi</h3>
                <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-foreground">
                  {siteConfig.waDisplay}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Hubungi kami untuk tanya pilihan kain, kirim ukuran perkiraan, atau atur jadwal
                  kunjungan tim ukur ke tempat Anda di seluruh wilayah Batam.
                </p>

                <div className="mt-5 rounded-2xl border border-line bg-surface p-4">
                  <p className="text-[11px] font-semibold tracking-wider text-accent uppercase">
                    Area Layanan Survei Gratis:
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-muted">
                    {getAllAreas().map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/area/${a.slug}`}
                          className="underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
                        >
                          {a.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <WhatsAppButton className="w-full">Chat via WhatsApp</WhatsAppButton>
              </div>
            </div>

            {/* 2. Kartu Alamat Workshop + Embedded Google Maps Iframe */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-background p-7 shadow-sm">
              <div>
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  Lokasi Workshop
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium">Alamat Kami</h3>
                <address className="mt-2 text-sm leading-relaxed text-foreground/90 not-italic">
                  {siteConfig.address}
                </address>

                {/* Pratinjau Peta Interaktif (Iframe Google Maps) */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-inner">
                  <iframe
                    title={`Peta Lokasi ${siteConfig.name} di Batam Centre`}
                    src={siteConfig.mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-44 w-full border-0"
                  />
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={siteConfig.mapsUrl}
                  {...external}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Buka Lokasi di Google Maps &rarr;
                </a>
              </div>
            </div>

            {/* 3. Kartu Jam Operasional (Rapi & Terstruktur) + Media Sosial */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-background p-7 shadow-sm">
              <div>
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  Jadwal Layanan
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium">Jam Operasional</h3>

                {/* Daftar Jadwal Rapi Tanpa Tabrakan Teks */}
                <dl className="mt-4 space-y-3">
                  {siteConfig.hours.map((h) => (
                    <div
                      key={h.day}
                      className="rounded-2xl border border-line bg-surface px-4 py-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <dt className="text-xs font-semibold tracking-wide text-foreground uppercase">
                          {h.day}
                        </dt>
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-accent uppercase">
                          {h.note}
                        </span>
                      </div>
                      <dd className="mt-1.5 font-serif text-lg font-semibold text-foreground">
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[11px] font-semibold tracking-wider text-muted uppercase">
                  Media Sosial Resmi:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2 text-xs font-semibold">
                  <a
                    href={siteConfig.instagram}
                    {...external}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>IG: @{siteConfig.instagramHandle}</span>
                  </a>
                  <a
                    href={siteConfig.threads}
                    {...external}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>Threads: @{siteConfig.threadsHandle}</span>
                  </a>
                  <a
                    href={siteConfig.facebook}
                    {...external}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>FB: {siteConfig.facebookName}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pembuat Pesan WhatsApp Otomatis */}
          {/* scroll-mt: jarak dari navbar sticky saat tombol survei menggulir ke sini */}
          <div id="hitung-survei" className="mt-12 scroll-mt-24 sm:scroll-mt-28">
            <WhatsAppBuilder />
          </div>
        </div>
      </section>
    </>
  );
}
