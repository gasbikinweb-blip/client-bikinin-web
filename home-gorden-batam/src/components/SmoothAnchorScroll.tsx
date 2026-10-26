'use client';

// Gulir halus ke tombol tautan "#..." di halaman yang sama (mis. Minta Survei Gratis → #hitung-survei).
// Gambar lazy & animasi reveal bisa menggeser tinggi halaman selama gulir, jadi posisi dikoreksi
// sekali lagi setelah gulir selesai agar tidak kelewatan. Reduced motion: lompat langsung tanpa animasi.
import { useEffect } from 'react';

export function SmoothAnchorScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
      target.scrollIntoView({ behavior });
      history.replaceState(null, '', `#${id}`);
      if (reduce) return;

      // Koreksi posisi setelah gulir berhenti (scrollend; fallback timer untuk browser lama)
      let timer = 0;
      const correct = () => {
        window.removeEventListener('scrollend', correct);
        window.clearTimeout(timer);
        const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        if (Math.abs(target.getBoundingClientRect().top - offset) > 4) {
          target.scrollIntoView({ behavior });
        }
      };
      window.addEventListener('scrollend', correct, { once: true });
      timer = window.setTimeout(correct, 2500);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
