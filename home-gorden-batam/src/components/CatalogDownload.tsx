import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';

/**
 * Komponen bagian unduh katalog PDF lokal dari folder /public.
 * File fisik tersedia di /public/katalog-home-gorden-batam.pdf
 * // TODO: ganti file placeholder PDF dengan file katalog desain lengkap jika sudah tersedia dari pemilik usaha.
 */
export function CatalogDownload() {
  const catalogWaLink = buildWhatsAppLink(
    `Halo ${siteConfig.name}, boleh kirimkan katalog sampel bahan gorden dan blinds terbaru via WhatsApp?`,
  );

  return (
    <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-surface via-surface to-accent/10 p-6 shadow-lg sm:p-8 lg:p-10">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-xs font-semibold tracking-widest text-accent uppercase">
            Katalog Ringkas (PDF)
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
            Unduh Ringkasan Katalog Produk {siteConfig.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            Simpan panduan ringkas jenis gorden custom, vitrase, blackout, blinds, wallpaper vinyl,
            dan rell besi kami dalam format PDF. Untuk melihat tekstur dan warna kain secara akurat,
            tim kami akan membawakan buku sampel asli saat survei gratis ke lokasi Anda.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <a
            href="/katalog-home-gorden-batam.pdf"
            download="Katalog-Home-Gorden-Batam.pdf"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold whitespace-nowrap text-background shadow-md transition-colors hover:bg-accent-strong"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0-4-4m4 4 4-4M4 20h16"
              />
            </svg>
            <span>Unduh Katalog PDF</span>
          </a>
          <a
            href={catalogWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-line bg-background/70 px-6 py-3 text-sm font-semibold whitespace-nowrap text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <span>Minta Sampel Fisik via WA</span>
          </a>
        </div>
      </div>
    </div>
  );
}
