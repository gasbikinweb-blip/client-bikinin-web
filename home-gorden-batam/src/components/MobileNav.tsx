'use client';

// Menu HP & Tablet / Zoom 120%: muncul di bawah breakpoint xl
import { useState } from 'react';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { navLinks } from './nav-links';
import { useActiveSection } from './use-active-section';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const activeHref = useActiveSection();

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 cursor-pointer place-items-center rounded-full border border-line"
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
          />
        </span>
      </button>
      <nav
        id="menu-hp"
        aria-label="Menu utama"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-background text-foreground shadow-2xl"
      >
        <ul className="flex flex-col px-4 py-4">
          {navLinks.map((l) => {
            const isActive = activeHref === l.href;
            return (
              <li key={l.href}>
                <a
                  href={`/${l.href}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-line py-3.5 font-serif text-2xl transition-colors last:border-0 hover:text-accent ${
                    isActive ? 'font-semibold text-accent-strong' : 'text-foreground'
                  }`}
                >
                  <span>{l.label}</span>
                  {isActive && (
                    <span className="rounded-full bg-accent/15 px-3 py-1 font-sans text-[11px] font-semibold tracking-wider text-accent uppercase">
                      Aktif
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-line p-4">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background"
          >
            <WhatsAppIcon className="size-4" />
            Minta Survei Gratis via WhatsApp
          </a>
        </div>
      </nav>
    </div>
  );
}
