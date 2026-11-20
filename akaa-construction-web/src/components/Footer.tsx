import { Logo } from './Logo';
import { Socials } from './Socials';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
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
        </div>
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
