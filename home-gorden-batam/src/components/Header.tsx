import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { DesktopNav } from './DesktopNav';
import { HeaderShell } from './HeaderShell';
import { WhatsAppIcon } from './icons';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Image
            src="/brand/logo.webp"
            alt={`Logo ${siteConfig.name}`}
            width={42}
            height={42}
            priority
            className="size-9 shrink-0 rounded-full ring-1 ring-accent/40 sm:size-10"
          />
          <div className="whitespace-nowrap">
            <span className="block font-serif text-lg leading-none font-semibold sm:text-xl xl:text-2xl">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 hidden text-[9px] tracking-[0.16em] text-accent uppercase sm:block">
              Survei Gratis se-Batam
            </span>
          </div>
        </Link>

        {/* Tampil di layar xl ke atas dengan indikator aktif otomatis saat scroll */}
        <DesktopNav />

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold whitespace-nowrap text-background transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span>Minta Survei Gratis</span>
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
