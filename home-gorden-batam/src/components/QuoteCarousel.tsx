'use client';

// Kutipan yang berganti otomatis. Berhenti saat disentuh/di-hover/difokus,
// dan tidak berputar otomatis bila pengunjung memilih reduced motion.
import { useEffect, useState } from 'react';
import type { Quote } from '@/data/quotes';

const INTERVAL = 7000;

export function QuoteCarousel({ quotes }: { quotes: readonly Quote[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- cek preferensi sekali saat mount
    setAutoplay(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!autoplay || paused || quotes.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % quotes.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [autoplay, paused, index, quotes.length]);

  const quote = quotes[index] ?? quotes[0];
  if (!quote) return null;
  const running = autoplay && !paused;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative mx-auto max-w-4xl text-center"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 font-serif text-[220px] leading-none text-accent/20 select-none"
      >
        “
      </span>

      {/* aria-live off saat berputar otomatis agar pembaca layar tidak terus diinterupsi */}
      <figure key={index} aria-live={running ? 'off' : 'polite'} className="relative">
        <blockquote className="animate-quote font-serif text-3xl leading-snug italic sm:text-5xl sm:leading-tight">
          “{quote.text}”
        </blockquote>
        <figcaption
          className="animate-rise mt-8"
          style={{ '--delay': '250ms' } as React.CSSProperties}
        >
          <span className="mx-auto mb-4 block h-px w-12 bg-accent" />
          <span className="block text-sm font-semibold tracking-[0.25em] text-accent uppercase">
            — {quote.author}
          </span>
          <span className="mt-1 block text-sm text-muted">{quote.role}</span>
        </figcaption>
      </figure>

      <div className="mt-10 flex justify-center gap-3" role="group" aria-label="Pilih kutipan">
        {quotes.map((q, i) => (
          <button
            key={q.author}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Kutipan ${i + 1}: ${q.author}`}
            aria-current={i === index}
            className="relative h-1.5 w-10 overflow-hidden rounded-full bg-foreground/20"
          >
            {i === index && (
              <span
                key={`${index}-${running}`}
                className={`absolute inset-y-0 left-0 rounded-full bg-accent ${running ? 'animate-progress' : 'w-full'}`}
                style={{ '--duration': `${INTERVAL}ms` } as React.CSSProperties}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
