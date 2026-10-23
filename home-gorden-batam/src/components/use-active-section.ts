'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type NavHref, navLinks } from './nav-links';

/**
 * Scroll-spy ringan untuk halaman single-page:
 * Melacak section mana yang sedang berada di area baca layar (viewport),
 * lalu mengembalikan href aktif (misalnya '#katalog' atau '#portofolio').
 */
export function useActiveSection(): NavHref | null {
  const [activeHref, setActiveHref] = useState<NavHref>('#beranda');
  // Di halaman selain beranda (mis. /produk, /faq) tidak ada section yang aktif
  const isHome = usePathname() === '/';

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navLinks.map((link) => link.href.slice(1));

    const updateActiveSection = () => {
      // Titik deteksi sedikit di bawah tinggi navbar sticky (~30% dari atas layar)
      const triggerLine = window.innerHeight * 0.3;

      // Jika sudah scroll sampai mentok paling bawah halaman, aktifkan section terakhir (#kontak)
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (isAtBottom) {
        setActiveHref('#kontak');
        return;
      }

      let current: NavHref = '#beranda';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Jika batas atas section sudah melewati garis trigger, jadikan kandidat aktif
        if (rect.top <= triggerLine) {
          current = `#${id}` as NavHref;
        }
      }

      setActiveHref(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [isHome]);

  return isHome ? activeHref : null;
}
