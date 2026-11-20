'use client';

// Bantu isi lokasi proyek: cari di Google Maps (tab baru) atau bagikan titik GPS perangkat.
// Koordinat hanya masuk ke pesan WhatsApp, tidak dikirim/disimpan di mana pun.
import { useState } from 'react';
import { PinIcon } from './icons';

const mapsSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q.trim() || 'Cibubur')}`;

export function LocationTools({
  query,
  pin,
  onPin,
}: {
  query: string;
  pin: string | null;
  onPin: (link: string | null) => void;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const share = () => {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onPin(
          `https://maps.google.com/?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`,
        );
        setStatus('idle');
      },
      () => setStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const btn =
    'inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-accent disabled:opacity-60';

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        <a href={mapsSearch(query)} target="_blank" rel="noopener noreferrer" className={btn}>
          <PinIcon className="size-4 text-accent-text" /> Cari di Google Maps
          <span className="sr-only"> (tab baru)</span>
        </a>
        <button type="button" onClick={share} disabled={status === 'loading'} className={btn}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 text-accent-text"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          {status === 'loading' ? 'Mencari lokasi…' : 'Bagikan lokasi saya'}
        </button>
      </div>
      <div aria-live="polite" className="text-sm">
        {pin && (
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border-l-4 border-accent bg-surface-2 px-3 py-2">
            <span>Titik lokasi ikut dikirim ke WhatsApp.</span>
            <a
              href={pin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Cek di peta<span className="sr-only"> (tab baru)</span>
            </a>
            <button type="button" onClick={() => onPin(null)} className="text-muted underline">
              Hapus
            </button>
          </p>
        )}
        {status === 'error' && (
          <p className="mt-2 font-semibold text-[#b42318] dark:text-[#ff8a80]">
            Lokasi tidak bisa diambil. Izinkan akses lokasi di browser, atau tulis alamatnya saja.
          </p>
        )}
      </div>
    </div>
  );
}
