'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type NavHref, navLinks } from './nav-links';

/**
 * Menu aktif untuk navigasi multi halaman:
 * - Halaman /katalog-gorden, /galeri, dst. → menu halaman itu aktif.
 * - Di beranda: "Beranda" aktif, berganti ke "Kontak" saat section #kontak sudah terlihat.
 */
export function useActiveSection(): NavHref | null {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const isHome = pathname === '/';
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const update = () => {
      const el = document.getElementById('kontak');
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      setAtContact(
        isAtBottom || (!!el && el.getBoundingClientRect().top <= window.innerHeight * 0.3),
      );
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome]);

  if (isHome) return atContact ? '/#kontak' : '/';
  return navLinks.find((l) => l.href === pathname)?.href ?? null;
}
