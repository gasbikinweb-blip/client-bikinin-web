'use client';

// Tombol ganti mode terang/gelap. Default adalah 'light' (Warm Luxury Cream).
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      // penyimpanan diblokir
    }
    const root = document.documentElement;
    if (saved === 'light' || saved === 'dark') {
      root.dataset.theme = saved;
    } else if (!root.dataset.theme) {
      root.dataset.theme = 'light';
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sinkronisasi sekali dengan DOM
    setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.dataset.theme = next;
    window.setTimeout(() => root.classList.remove('theme-transition'), 550);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // penyimpanan diblokir: tema tetap berganti untuk sesi ini
    }
    setTheme(next);
  };

  const isLight = theme === 'light';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Ganti ke mode gelap' : 'Ganti ke mode terang'}
      title={isLight ? 'Mode gelap' : 'Mode terang'}
      className="relative grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border border-line text-foreground transition-colors hover:border-accent hover:text-accent-strong"
    >
      {/* Matahari */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className={`absolute size-5 transition-all duration-500 ${isLight ? 'translate-y-8 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          strokeLinecap="round"
        />
      </svg>
      {/* Bulan */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className={`absolute size-5 transition-all duration-500 ${isLight ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-8 -rotate-90 opacity-0'}`}
      >
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
