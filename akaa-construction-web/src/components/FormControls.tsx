'use client';

// Dropdown & pemilih bulan bertema (pengganti <select> dan <input type="month"> bawaan browser)
import { useEffect, useId, useRef, useState } from 'react';

const trigger =
  'mt-2 flex min-h-12 w-full items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 text-left text-base outline-none hover:border-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 aria-expanded:border-accent aria-expanded:ring-2 aria-expanded:ring-accent/40';
const panel =
  'animate-in absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-md border border-line bg-surface shadow-2xl';

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-5 shrink-0 text-accent-text transition ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Tutup saat klik di luar komponen
function useOutside(ref: React.RefObject<HTMLElement | null>, close: () => void, on: boolean) {
  useEffect(() => {
    if (!on) return;
    const h = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('pointerdown', h);
    return () => document.removeEventListener('pointerdown', h);
  }, [ref, close, on]);
}

export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const all = ['', ...options];
  const [close] = useState(() => () => setOpen(false));
  useOutside(box, close, open);

  const show = () => {
    setActive(Math.max(0, all.indexOf(value)));
    setOpen(true);
  };
  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
    btn.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Tab') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(all.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(all[active]!);
    }
  };

  return (
    <div ref={box} className="relative">
      <button
        ref={btn}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? close() : show())}
        onKeyDown={onKey}
        className={trigger}
      >
        <span className={value ? '' : 'text-muted'}>{value || placeholder}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <ul id={listId} role="listbox" aria-labelledby={id} className={`${panel} py-1.5`}>
          {all.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o || 'kosong'}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(o)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 border-l-4 px-4 text-base ${
                  i === active ? 'border-accent bg-surface-2' : 'border-transparent'
                } ${o ? '' : 'text-muted'} ${selected ? 'font-bold' : ''}`}
              >
                {o || placeholder}
                {selected && o && (
                  <svg viewBox="0 0 24 24" className="size-4 text-accent-text" aria-hidden="true">
                    <path
                      d="m5 12 5 5 9-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

// Nilai berformat "YYYY-MM" (sama seperti input type="month")
export function MonthPicker({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const now = new Date();
  const minY = now.getFullYear();
  const minM = now.getMonth();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(minY);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [close] = useState(() => () => setOpen(false));
  useOutside(box, close, open);

  const [vy = 0, vm = 0] = value ? value.split('-').map(Number) : [];
  const text = value
    ? new Date(vy, vm - 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : 'Pilih bulan (opsional)';

  const done = (v: string) => {
    onChange(v);
    setOpen(false);
    btn.current?.focus();
  };

  return (
    <div
      ref={box}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.preventDefault();
          setOpen(false);
          btn.current?.focus();
        }
      }}
    >
      <button
        ref={btn}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          if (!open) setYear(vy || minY);
          setOpen(!open);
        }}
        className={trigger}
      >
        <span className={value ? '' : 'text-muted'}>{text}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5 shrink-0 text-accent-text"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div role="dialog" aria-label="Pilih bulan mulai" className={`${panel} p-3`}>
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Tahun sebelumnya"
              disabled={year <= minY}
              onClick={() => setYear(year - 1)}
              className="grid size-10 place-items-center rounded-md text-xl hover:bg-surface-2 disabled:opacity-30"
            >
              ‹
            </button>
            <p className="font-display text-lg font-extrabold" aria-live="polite">
              {year}
            </p>
            <button
              type="button"
              aria-label="Tahun berikutnya"
              disabled={year >= minY + 3}
              onClick={() => setYear(year + 1)}
              className="grid size-10 place-items-center rounded-md text-xl hover:bg-surface-2 disabled:opacity-30"
            >
              ›
            </button>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {months.map((m, i) => {
              const past = year === minY && i < minM;
              const on = vy === year && vm === i + 1;
              return (
                <button
                  key={m}
                  type="button"
                  disabled={past}
                  aria-pressed={on}
                  onClick={() => done(`${year}-${String(i + 1).padStart(2, '0')}`)}
                  className="min-h-11 rounded-md text-sm font-semibold hover:bg-surface-2 disabled:opacity-30 disabled:hover:bg-transparent aria-pressed:bg-accent aria-pressed:text-accent-ink"
                >
                  {m}
                </button>
              );
            })}
          </div>
          {value && (
            <button
              type="button"
              onClick={() => done('')}
              className="mt-2 min-h-10 w-full rounded-md text-sm text-muted hover:bg-surface-2"
            >
              Hapus pilihan
            </button>
          )}
        </div>
      )}
    </div>
  );
}
