import { SectionHeading } from './SectionHeading';

const steps = [
  {
    no: '01',
    title: 'Chat via WhatsApp',
    text: 'Hubungi kami lewat WhatsApp untuk menyampaikan jenis ruangan, perkiraan jumlah jendela/pintu, dan jadwal kunjungan yang Anda inginkan.',
  },
  {
    no: '02',
    title: 'Survei Gratis & Pengukuran',
    text: 'Tim kami datang langsung ke lokasi Anda di seluruh area Batam untuk mengukur jendela secara akurat sekaligus membawakan sampel bahan.',
  },
  {
    no: '03',
    title: 'Pilih Bahan & Penawaran',
    text: 'Pilih kain gorden, vitrase, blinds, atau wallpaper yang paling cocok dengan interior dan anggaran Anda. Kami susunkan penawaran yang jelas.',
  },
  {
    no: '04',
    title: 'Produksi & Pemasangan Rapi',
    text: 'Setelah pesanan disepakati, gorden dijahit presisi sesuai ukuran lalu dipasang dengan rapi dan bersih di lokasi Anda.',
  },
];

export function OrderSteps() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="judul-cara-pesan"
      className="scroll-mt-20 border-y border-line bg-surface py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            id="judul-cara-pesan"
            eyebrow="Cara Kerja"
            title="4 Langkah Mudah Pasang Gorden di Batam"
            description="Tanpa ribet mengukur sendiri. Semua konsultasi dan jadwal survei gratis dilayani langsung melalui WhatsApp."
          />
          <a
            href="#hitung-survei"
            className="reveal inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
          >
            Jadwalkan Survei Gratis
          </a>
        </div>
        <ol data-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.no}
              className="reveal reveal-zoom relative rounded-2xl border border-line bg-background p-7 transition-colors duration-300 hover:border-accent"
            >
              <span
                aria-hidden="true"
                className="block font-serif text-5xl leading-none text-accent"
              >
                {s.no}
              </span>
              <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
