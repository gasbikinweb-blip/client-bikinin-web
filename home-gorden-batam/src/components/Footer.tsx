import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  const featuredProducts = getAllProducts().slice(0, 6);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.webp"
              alt={`Logo ${siteConfig.name}`}
              width={44}
              height={44}
              className="rounded-full ring-1 ring-accent/40"
            />
            <div>
              <p className="font-serif text-2xl leading-none">{siteConfig.name}</p>
              <p className="mt-1 text-xs text-accent">{siteConfig.legalOrLogoName}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{siteConfig.tagline}.</p>
          <p className="mt-3 text-xs text-muted">
            Gratis survei, pengukuran, dan konsultasi bahan ke seluruh area Batam.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl">Navigasi Halaman</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={`/${l.href}`} className="transition-colors hover:text-accent-strong">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Produk &amp; Layanan</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {featuredProducts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/produk/${p.slug}`}
                  className="transition-colors hover:text-accent-strong"
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/produk" className="font-medium text-accent hover:text-accent-strong">
                Lihat Semua Katalog →
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition-colors hover:text-accent-strong">
                Pertanyaan Umum (FAQ)
              </Link>
            </li>
            <li>
              <Link href="/area" className="transition-colors hover:text-accent-strong">
                Area Layanan se-Batam
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Kontak &amp; Alamat</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="font-medium text-foreground transition-colors hover:text-accent-strong"
              >
                WhatsApp: {siteConfig.waDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                {...external}
                className="transition-colors hover:text-accent-strong"
              >
                Instagram: @{siteConfig.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.threads}
                {...external}
                className="transition-colors hover:text-accent-strong"
              >
                Threads: @{siteConfig.threadsHandle}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.facebook}
                {...external}
                className="transition-colors hover:text-accent-strong"
              >
                Facebook: {siteConfig.facebookName}
              </a>
            </li>
            <li className="pt-1 leading-relaxed">{siteConfig.address}</li>
            <li>
              <a
                href={siteConfig.mapsUrl}
                {...external}
                className="text-xs text-accent underline underline-offset-4 hover:text-accent-strong"
              >
                Buka Lokasi di Google Maps ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} ({siteConfig.legalOrLogoName}). Seluruh
            area Batam.
          </p>
          <p>Semua survei, penawaran, dan pemesanan dilayani langsung melalui WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
