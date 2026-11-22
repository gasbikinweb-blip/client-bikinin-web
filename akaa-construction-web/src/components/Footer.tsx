import Link from 'next/link';
import { Logo } from './Logo';
import { Socials } from './Socials';
import { areas } from '@/data/areas';
import { servicePages } from '@/data/servicePages';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">
            {site.subtitle}. Jasa bangun rumah, renovasi, dan interior di {site.area}.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white">Kantor</p>
          <p className="mt-2">{site.office}</p>
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center hover:text-accent"
          >
            WA {siteConfig.waDisplay}
            <span className="sr-only"> (tab baru)</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex min-h-11 items-center break-all hover:text-accent"
          >
            {site.email}
          </a>
        </div>
        <nav aria-label="Layanan" className="text-sm">
          <p className="font-bold text-white">Layanan</p>
          <ul className="mt-1">
            {servicePages.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/layanan/${l.slug}`}
                  className="inline-flex min-h-11 items-center hover:text-accent"
                >
                  {services.find((s) => s.id === l.serviceId)?.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Area layanan" className="text-sm">
          <p className="font-bold text-white">Area layanan</p>
          <ul className="mt-1">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/area/${a.slug}`}
                  className="inline-flex min-h-11 items-center hover:text-accent"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="font-bold text-white">Ikuti kami</p>
          <Socials className="mt-3" />
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} AKAA Construction · {site.legalName}
      </p>
    </footer>
  );
}
