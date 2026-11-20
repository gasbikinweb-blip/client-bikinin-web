'use client';

// Pemutar video layar penuh (dialog native): bersuara, kontrol bawaan, navigasi sebelum/berikutnya,
// tombol panah keyboard, geser di HP, dan tombol layar penuh browser.
import { useEffect, useRef } from 'react';

export type LightboxItem = { src: string; poster: string; title: string; sub?: string };

type Props = {
  items: readonly LightboxItem[];
  index: number | null;
  onIndex: (i: number | null) => void;
};

export function VideoLightbox({ items, index, onIndex }: Props) {
  const dlg = useRef<HTMLDialogElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const touch = useRef<number | null>(null);
  const open = index !== null;
  const item = open ? items[index] : undefined;
  const n = items.length;

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? 'hidden' : '';
    // Bisukan video kartu lain agar tidak bertabrakan suara
    if (open) window.dispatchEvent(new CustomEvent('reel-sound', { detail: null }));
  }, [open]);

  useEffect(() => {
    const v = vid.current;
    if (v && open) {
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [index, open]);

  const go = (step: number) => index !== null && onIndex((index + step + n) % n);
  const close = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    onIndex(null);
  };
  const fullscreen = () => {
    const v = vid.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else (v as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen?.();
  };

  const btn =
    'grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25';

  return (
    <dialog
      ref={dlg}
      aria-label={item ? `Video: ${item.title}` : 'Video'}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/90"
    >
      {item && (
        <div
          className="relative flex h-full flex-col items-center justify-center gap-4 px-4 py-16"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            const s = touch.current;
            const end = e.changedTouches[0]?.clientX;
            if (s !== null && end !== undefined && Math.abs(end - s) > 60) go(end < s ? 1 : -1);
            touch.current = null;
          }}
        >
          <video
            key={item.src}
            ref={vid}
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            loop
            className="max-h-[78dvh] w-auto max-w-full rounded-2xl bg-black shadow-2xl"
          />
          <div className="text-center">
            <p className="text-lg font-bold">{item.title}</p>
            {item.sub && <p className="text-sm text-white/70">{item.sub}</p>}
            <p className="mt-1 text-xs text-white/50">
              {index! + 1} / {n}
            </p>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button type="button" onClick={fullscreen} aria-label="Layar penuh" className={btn}>
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
              </svg>
            </button>
            <button type="button" onClick={close} aria-label="Tutup video" className={btn}>
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          {n > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Video sebelumnya"
                className={`${btn} absolute top-1/2 left-3 -translate-y-1/2 sm:left-8`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Video berikutnya"
                className={`${btn} absolute top-1/2 right-3 -translate-y-1/2 sm:right-8`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
