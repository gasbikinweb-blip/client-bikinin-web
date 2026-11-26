'use client';

// Navigasi sticky: link aktif mengikuti halaman yang sedang dibuka, menu HP berupa panel.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from '@/data/site';

export function Header() {
  const [open, setOpen] = useState(false);
  // Tanpa garis miring di akhir agar /proyek/ dan /proyek sama
  const path = usePathname().replace(/\/$/, '') || '/';
  const active = navLinks.find((l) => l.href === path)?.href ?? '';

  // Menu HP tertutup dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 items-center"
          aria-label="AKAA Construction, ke beranda"
        >
          <Logo />
        </Link>
        <nav aria-label="Menu utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active === l.href ? 'page' : undefined}
                  className="relative flex min-h-11 items-center px-3 text-sm font-semibold text-muted hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-2 aria-[current=page]:after:h-[3px] aria-[current=page]:after:bg-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/kontak#konsultasi"
            className="hidden min-h-11 items-center rounded-md bg-accent px-5 text-sm font-bold text-accent-ink hover:brightness-95 sm:inline-flex"
          >
            Konsultasi Gratis
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-hp"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-md border border-line md:hidden"
          >
            <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav
        id="menu-hp"
        aria-label="Menu HP"
        hidden={!open}
        className="border-t border-line bg-background md:hidden"
      >
        <ul className="px-4 py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href ? 'page' : undefined}
                className="flex min-h-12 items-center justify-between border-b border-line font-display text-xl font-bold uppercase aria-[current=page]:text-accent-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="py-3">
            <a
              href="/kontak#konsultasi"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-md bg-accent font-bold text-accent-ink"
            >
              Konsultasi Gratis
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
