'use client';

import { useState } from 'react';
import { getAllProducts } from '@/data/products';
import { batamAreas } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ROOM_OPTIONS = [
  'Ruang Tamu',
  'Ruang Keluarga',
  'Kamar Tidur Utama',
  'Kamar Anak',
  'Pintu & Jendela Besar (Void)',
  'Ruko / Ruang Kantor',
  'Apartemen / Villa / Hotel',
  'Seluruh Rumah (Full Set)',
] as const;

type RoomOption = (typeof ROOM_OPTIONS)[number];
type AreaOption = (typeof batamAreas)[number];

const PRODUCT_LIST = getAllProducts();
const PRODUCT_NAMES = PRODUCT_LIST.map((p) => p.name);

/**
 * Membersihkan input teks bebas dari karakter kontrol dan membatasi panjang maksimal.
 */
function sanitizeText(raw: string, maxLength: number): string {
  return raw
    .replace(/[\u0000-\u001F\u007F<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

interface WhatsAppBuilderProps {
  title?: string;
  subtitle?: string;
}

/**
 * Komponen pembuat pesan WhatsApp interaktif + fitur Share Lokasi (Sharelock) Calon Customer.
 * PENTING: Bukan elemen <form> yang mengirim data ke server, tidak ada penyimpanan,
 * dan tidak ada pengiriman data ke pihak mana pun selain membuka tautan WhatsApp resmi.
 */
export function WhatsAppBuilder({
  title = 'Susun Pesan Survei Gratis ke WhatsApp',
  subtitle = 'Pilih jenis produk, ruangan, jumlah titik jendela/pintu, dan kawasan Anda di Batam. Anda juga bisa melampirkan titik lokasi (Sharelock) agar tim survei kami lebih mudah menuju lokasi.',
}: WhatsAppBuilderProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>(
    PRODUCT_NAMES[0] ?? 'Gorden Custom',
  );
  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(ROOM_OPTIONS[0]);
  const [windowCountRaw, setWindowCountRaw] = useState<string>('2');
  const [widthEstimateRaw, setWidthEstimateRaw] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<AreaOption>(batamAreas[0]);
  const [areaDetailRaw, setAreaDetailRaw] = useState<string>('');
  const [sharelocRaw, setSharelocRaw] = useState<string>('');
  const [locLoading, setLocLoading] = useState<boolean>(false);
  const [locStatus, setLocStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Validasi whitelist dan nilai angka positif
  const safeProduct = PRODUCT_NAMES.includes(selectedProduct)
    ? selectedProduct
    : (PRODUCT_NAMES[0] ?? 'Gorden Custom');

  const safeRoom = (ROOM_OPTIONS as readonly string[]).includes(selectedRoom)
    ? selectedRoom
    : ROOM_OPTIONS[0];

  const safeArea = (batamAreas as readonly string[]).includes(selectedArea)
    ? selectedArea
    : batamAreas[0];

  const parsedCount = Number.parseInt(windowCountRaw, 10);
  const isValidCount = Number.isInteger(parsedCount) && parsedCount >= 1 && parsedCount <= 100;
  const safeCount = isValidCount ? parsedCount : 1;

  const safeWidthEstimate = sanitizeText(widthEstimateRaw, 40);
  const safeAreaDetail = sanitizeText(areaDetailRaw, 60);
  const safeShareloc = sanitizeText(sharelocRaw, 160);

  const locationLabel = safeAreaDetail ? `${safeArea} (${safeAreaDetail})` : safeArea;

  const quantityLabel = safeWidthEstimate
    ? `${safeCount} jendela/pintu (perkiraan ukuran: ${safeWidthEstimate})`
    : `${safeCount} jendela/pintu`;

  const sharelocSegment = safeShareloc ? ` Titik Sharelock: ${safeShareloc}` : '';

  const compiledMessage = `Halo ${siteConfig.name}, saya ingin minta survei gratis dan penawaran ${safeProduct} untuk ${safeRoom}, jumlah ${quantityLabel}, lokasi ${locationLabel}.${sharelocSegment}`;

  // Ambil koordinat GPS dari perangkat calon customer (hanya di browser lokal)
  function handleDetectLocation() {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setLocStatus(
        'Browser Anda tidak mendukung deteksi lokasi otomatis. Silakan tempel link Google Maps secara manual.',
      );
      return;
    }

    setLocLoading(true);
    setLocStatus('Mendeteksi titik koordinat lokasi Anda...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const mapsPinUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        setSharelocRaw(mapsPinUrl);
        setLocLoading(false);
        setLocStatus('Titik Sharelock berhasil dilampirkan ke pesan WhatsApp!');
      },
      (err) => {
        setLocLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocStatus(
            'Izin lokasi ditolak di browser. Anda tetap bisa menempel link Google Maps di kolom Sharelock.',
          );
        } else {
          setLocStatus(
            'Gagal mengambil titik GPS otomatis. Silakan ketik/tempel link Google Maps Anda.',
          );
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  function handleOpenWhatsApp() {
    if (!isValidCount) {
      setErrorMsg('Masukkan jumlah jendela/pintu berupa angka positif (1 sampai 100).');
      return;
    }
    setErrorMsg(null);
    const url = buildWhatsAppLink(compiledMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-xl sm:p-8 lg:p-10">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3.5 py-1 text-xs font-medium tracking-widest text-accent uppercase">
          Pembuat Pesan Cepat
        </span>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
      </div>

      {/* Kontainer input tanpa elemen <form> karena tidak ada submit ke server */}
      <div
        role="group"
        aria-label="Pengaturan pesan survei gratis WhatsApp"
        className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* 1. Pilih Jenis Produk */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="wa-builder-product"
            className="text-xs font-semibold tracking-wider text-muted uppercase"
          >
            1. Jenis Produk
          </label>
          <select
            id="wa-builder-product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="min-h-11 w-full max-w-full min-w-0 truncate rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-accent focus:outline-none"
          >
            {PRODUCT_LIST.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Pilih Ruangan */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="wa-builder-room"
            className="text-xs font-semibold tracking-wider text-muted uppercase"
          >
            2. Jenis Ruangan
          </label>
          <select
            id="wa-builder-room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value as RoomOption)}
            className="min-h-11 w-full max-w-full min-w-0 truncate rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-accent focus:outline-none"
          >
            {ROOM_OPTIONS.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Jumlah Jendela / Pintu */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="wa-builder-count"
            className="text-xs font-semibold tracking-wider text-muted uppercase"
          >
            3. Jumlah Jendela / Pintu
          </label>
          <input
            id="wa-builder-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={100}
            value={windowCountRaw}
            onChange={(e) => {
              setWindowCountRaw(e.target.value.slice(0, 3));
              if (errorMsg) setErrorMsg(null);
            }}
            aria-invalid={!isValidCount}
            aria-describedby={!isValidCount ? 'wa-builder-count-error' : undefined}
            className="min-h-11 w-full max-w-full min-w-0 rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-accent focus:outline-none"
          />
          {!isValidCount && (
            <p id="wa-builder-count-error" className="text-xs text-accent">
              Masukkan angka antara 1 sampai 100 titik.
            </p>
          )}
        </div>

        {/* 4. Perkiraan Ukuran (Opsional) */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="wa-builder-width"
            className="text-xs font-semibold tracking-wider text-muted uppercase"
          >
            4. Perkiraan Lebar/Tinggi (Opsional)
          </label>
          <input
            id="wa-builder-width"
            type="text"
            maxLength={40}
            placeholder="Contoh: lebar 2m x tinggi 2.5m"
            value={widthEstimateRaw}
            onChange={(e) => setWidthEstimateRaw(e.target.value.slice(0, 40))}
            className="min-h-11 w-full max-w-full min-w-0 rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none"
          />
        </div>

        {/* 5. Kecamatan / Kawasan di Batam */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="wa-builder-area"
            className="text-xs font-semibold tracking-wider text-muted uppercase"
          >
            5. Kecamatan / Kawasan di Batam
          </label>
          <select
            id="wa-builder-area"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value as AreaOption)}
            className="min-h-11 w-full max-w-full min-w-0 truncate rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-accent focus:outline-none"
          >
            {batamAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Nama Perumahan / Gedung (Opsional) */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="wa-builder-area-detail"
            className="text-xs font-semibold tracking-wider text-muted uppercase"
          >
            6. Nama Perumahan / Ruko (Opsional)
          </label>
          <input
            id="wa-builder-area-detail"
            type="text"
            maxLength={60}
            placeholder="Contoh: Legenda Malaka / Ruko Nagoya"
            value={areaDetailRaw}
            onChange={(e) => setAreaDetailRaw(e.target.value.slice(0, 60))}
            className="min-h-11 w-full max-w-full min-w-0 rounded-xl border border-line bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none"
          />
        </div>

        {/* 7. Sharelock / Titik Lokasi Google Maps Calon Customer (Opsional) */}
        <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <label
              htmlFor="wa-builder-shareloc"
              className="text-xs font-semibold tracking-wider text-muted uppercase"
            >
              7. Sharelock / Titik Lokasi Survei (Opsional)
            </label>
            <span className="text-[11px] text-muted">
              Klik tombol GPS otomatis atau tempel link Google Maps lokasi Anda
            </span>
          </div>

          <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <input
                id="wa-builder-shareloc"
                type="url"
                maxLength={160}
                placeholder="Tempel link Google Maps atau klik tombol GPS"
                value={sharelocRaw}
                onChange={(e) => {
                  setSharelocRaw(e.target.value.slice(0, 160));
                  if (locStatus) setLocStatus(null);
                }}
                className="min-h-11 w-full max-w-full min-w-0 rounded-xl border border-line bg-background px-3.5 py-2.5 pr-9 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none"
              />
              {sharelocRaw && (
                <button
                  type="button"
                  onClick={() => {
                    setSharelocRaw('');
                    setLocStatus(null);
                  }}
                  aria-label="Hapus link Sharelock"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-full p-1 text-xs text-muted hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={locLoading}
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent/50 bg-accent/15 px-4 py-2.5 text-center text-xs font-semibold text-foreground transition-all hover:border-accent hover:bg-accent hover:text-background disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:shrink-0 sm:whitespace-nowrap sm:text-sm"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={`size-4 shrink-0 fill-none stroke-current stroke-2 ${locLoading ? 'animate-spin' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z"
                />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>
                {locLoading ? 'Mendeteksi GPS...' : 'Ambil Titik Lokasi Saya (Sharelock)'}
              </span>
            </button>
          </div>

          {locStatus && (
            <p className="text-xs font-medium text-accent" aria-live="polite">
              {locStatus}
            </p>
          )}
        </div>
      </div>

      {/* Pratinjau Pesan Otomatis */}
      <div className="mt-6 rounded-2xl border border-accent/25 bg-background/80 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase">
            Pratinjau Pesan Otomatis
          </span>
          <span className="text-xs text-muted">Tidak ada data yang disimpan di server</span>
        </div>
        <p className="mt-2 font-sans text-sm leading-relaxed break-words text-foreground sm:text-base">
          &ldquo;{compiledMessage}&rdquo;
        </p>
      </div>

      {errorMsg && (
        <p role="alert" className="mt-3 text-sm font-medium text-accent">
          {errorMsg}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs leading-relaxed text-muted">
          Klik tombol di samping untuk membuka aplikasi WhatsApp dengan pesan &amp; titik Sharelock
          di atas. Survei &amp; pengukuran gratis ke seluruh area Batam.
        </p>
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-accent px-5 py-3.5 text-center text-sm font-semibold text-background shadow-lg shadow-accent/20 transition-all hover:bg-accent-strong sm:w-auto sm:shrink-0 sm:px-7 sm:whitespace-nowrap"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current">
            <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.86 11.86 0 0 0 5.75 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.43-8.44ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.28c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          </svg>
          <span>Minta Survei Gratis via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
