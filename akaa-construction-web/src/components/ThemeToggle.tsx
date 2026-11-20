'use client';

// Ganti mode terang/gelap. Ikon mengikuti atribut data-theme lewat varian `dark:` (tanpa state).
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('akaa-theme', next);
    } catch {
      // penyimpanan diblokir: tema tetap berganti untuk sesi ini
    }
  };
  const svg = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    'aria-hidden': true,
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti mode gelap atau terang"
      title="Mode gelap / terang"
      className="grid size-11 shrink-0 place-items-center rounded-md border border-line hover:border-foreground"
    >
      <svg {...svg} className="size-5 dark:hidden">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
      </svg>
      <svg {...svg} className="hidden size-5 dark:block">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
