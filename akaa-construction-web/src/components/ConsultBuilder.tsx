'use client';

// Pembuat pesan WhatsApp: tab Konsultasi & Survei, dan tab Pesan Material.
// Tanpa <form> submit dan tanpa penyimpanan data. Link #pesan-[id] membuka tab material.
import { useEffect, useState } from 'react';
import { MonthPicker, Select } from './FormControls';
import { WhatsAppIcon } from './icons';
import { LocationTools } from './LocationTools';
import { catalog } from '@/data/media';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const jobs = [
  'Bangun Rumah Baru',
  'Renovasi Rumah',
  'Custom Interior',
  'Taman & Landscape',
  'Supply Material',
] as const;
// TODO: rentang budget dari pemilik
const budgets = [
  'Belum tahu',
  '< Rp100 juta',
  'Rp100–300 juta',
  'Rp300–600 juta',
  '> Rp600 juta',
] as const;

// Buang karakter kontrol agar pesan rapi
const clean = (s: string) =>
  Array.from(s)
    .map((c) => (c.charCodeAt(0) < 32 ? ' ' : c))
    .join('')
    .trim();

type Mode = 'konsultasi' | 'material';
const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
const monthLabel = (v: string) => {
  const [y, m] = v.split('-');
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });
};

const field =
  'mt-2 min-h-12 w-full rounded-md border border-line bg-surface px-4 text-base outline-none focus:border-foreground';
const label = 'block text-sm font-bold';

export function ConsultBuilder() {
  const [name, setName] = useState('');
  const [job, setJob] = useState<(typeof jobs)[number] | ''>('');
  const [location, setLocation] = useState('');
  const [pin, setPin] = useState<string | null>(null);
  const [land, setLand] = useState('');
  const [building, setBuilding] = useState('');
  const [budget, setBudget] = useState('');
  const [start, setStart] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>('konsultasi');
  const [matId, setMatId] = useState('');
  const [qty, setQty] = useState('');

  // Tombol katalog/brosur: #pesan-[id] -> buka tab material dengan item terpilih
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      if (!h.startsWith('#pesan-')) return;
      const id = h.slice('#pesan-'.length);
      if (catalog.some((c) => c.id === id)) {
        setMode('material');
        setMatId(id);
        setQty('');
        setErrors([]);
      }
      history.replaceState(null, '', '#konsultasi');
      document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth' });
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const mat = catalog.find((c) => c.id === matId);
  const isMat = mode === 'material';

  const num = (v: string) => (v.trim() === '' ? null : Number(v));
  const lines: [string, string][] = [];
  const qtyN = num(qty);
  const estimate = isMat && mat?.price && qtyN && qtyN > 0 ? mat.price.amount * qtyN : undefined;
  if (isMat) {
    if (mat) lines.push(['Pesan', mat.name]);
    if (mat?.order.unit && qtyN)
      lines.push(['Jumlah', `${qtyN.toLocaleString('id-ID')} ${mat.order.unit}`]);
    if (estimate) lines.push(['Estimasi', `${rupiah(estimate)} (belum ongkir)`]);
    if (clean(location)) lines.push(['Lokasi kirim', clean(location)]);
    if (pin) lines.push(['Titik lokasi', pin]);
    if (start) lines.push(['Dibutuhkan', monthLabel(start)]);
    if (clean(notes))
      lines.push([mat && !mat.order.unit ? 'Detail pekerjaan' : 'Catatan', clean(notes)]);
  } else {
    if (job) lines.push(['Jenis pekerjaan', job]);
    if (clean(location)) lines.push(['Lokasi proyek', clean(location)]);
    if (pin) lines.push(['Titik lokasi', pin]);
    if (num(land)) lines.push(['Luas tanah', `${num(land)} m²`]);
    if (num(building)) lines.push(['Luas bangunan', `${num(building)} m²`]);
    if (budget) lines.push(['Kisaran budget', budget]);
    if (start) lines.push(['Rencana mulai', monthLabel(start)]);
    if (clean(notes)) lines.push(['Catatan', clean(notes)]);
  }
  const who = clean(name) ? `saya ${clean(name)}, ` : 'saya ';
  const greeting = isMat
    ? `Halo ${siteConfig.name}, ${who}ingin pesan material/jasa.`
    : `Halo ${siteConfig.name}, ${who}ingin konsultasi & survei gratis.`;
  const closing = isMat
    ? 'Mohon info ketersediaan, total harga, dan ongkir ke lokasi saya ya. Terima kasih.'
    : 'Mohon info jadwal survei dan langkah selanjutnya ya. Terima kasih.';
  const message = [greeting, '', ...lines.map(([k, v]) => `${k}: ${v}`), '', closing].join('\n');

  const send = () => {
    const errs: string[] = [];
    if (isMat) {
      if (!mat) errs.push('Pilih material atau jasa.');
      if (mat?.order.unit && (!qtyN || !Number.isFinite(qtyN) || qtyN <= 0 || qtyN > 10000000))
        errs.push('Isi jumlah dengan angka positif.');
      if (mat && !mat.order.unit && clean(notes).length < 5)
        errs.push('Ceritakan singkat pekerjaannya.');
      if (clean(location).length < 3 && !pin) errs.push('Isi lokasi pengiriman (kota/kecamatan).');
      setErrors(errs);
      if (errs.length) return;
      window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
      return;
    }
    if (!job || !jobs.includes(job)) errs.push('Pilih jenis pekerjaan.');
    if (clean(location).length < 3 && !pin) errs.push('Isi lokasi proyek (kota/kecamatan).');
    for (const [v, n] of [
      [land, 'Luas tanah'],
      [building, 'Luas bangunan'],
    ] as const) {
      const x = num(v);
      if (x !== null && (!Number.isFinite(x) || x <= 0 || x > 100000))
        errs.push(`${n} harus angka positif.`);
    }
    setErrors(errs);
    if (errs.length) return;
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="konsultasi" className="relative border-t border-line bg-surface-2 text-foreground">
      <div className="blueprint absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.3fr]">
        {/* HP: judul -> form -> pratinjau; desktop: judul + pratinjau di kiri (sticky) */}
        <div className="contents lg:sticky lg:top-24 lg:block lg:self-start">
          <div className="reveal">
            <p className="eyebrow !text-accent-text">Konsultasi &amp; Survei</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
              Ceritakan rencana Anda
            </h2>
            <p className="mt-4 text-muted">
              Isi singkat rencana Anda, pesan WhatsApp akan tersusun otomatis. Data tidak disimpan
              di website.
            </p>
          </div>
          <div className="order-last overflow-hidden lg:order-none lg:mt-8 rounded-2xl border border-line bg-surface text-foreground shadow-2xl">
            <p className="flex items-center gap-2 bg-[#075e54] px-4 py-3 text-sm font-bold text-white">
              <WhatsAppIcon className="size-4" /> Pratinjau pesan WhatsApp
            </p>
            <div className="bg-[#ece5dd] p-3 sm:p-4">
              <div
                aria-live="polite"
                className="ml-auto max-w-[95%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm leading-relaxed break-words text-[#111b21] shadow-sm"
              >
                <p>{greeting}</p>
                <ul className="mt-2 space-y-1">
                  {lines.map(([k, v]) => (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">{closing}</p>
              </div>
            </div>
            <div className="p-4">
              {isMat && mat && (
                <p className="mb-3 text-sm">
                  <span className="font-bold">Estimasi: </span>
                  {estimate
                    ? `${rupiah(estimate)} (belum termasuk ongkir)`
                    : mat.price
                      ? 'Isi jumlah untuk melihat estimasi'
                      : 'Harga dikonfirmasi admin'}
                </p>
              )}
              {errors.length > 0 && (
                <ul
                  role="alert"
                  className="mb-3 list-inside list-disc text-sm font-semibold text-[#b42318] dark:text-[#ff8a80]"
                >
                  {errors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={send}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1f7a46] font-bold text-white hover:brightness-110"
              >
                <WhatsAppIcon className="size-5" />{' '}
                {isMat ? 'Kirim Pesanan via WhatsApp' : 'Kirim via WhatsApp'}
              </button>
              <p className="mt-2 text-center text-xs text-muted">Data tidak disimpan di website.</p>
            </div>
          </div>
        </div>

        <div className="reveal grid gap-5 rounded-lg bg-background p-5 text-foreground sm:grid-cols-2 sm:p-8">
          <div
            role="tablist"
            aria-label="Jenis permintaan"
            className="grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1 sm:col-span-2"
          >
            {(
              [
                ['konsultasi', 'Konsultasi & Survei'],
                ['material', 'Pesan Material'],
              ] as const
            ).map(([m, l]) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setErrors([]);
                }}
                className="min-h-11 rounded-full px-3 text-sm font-bold text-muted transition aria-selected:bg-accent aria-selected:text-accent-ink aria-selected:shadow"
              >
                {l}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="k-nama" className={label}>
              Nama panggilan
            </label>
            <input
              id="k-nama"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              autoComplete="given-name"
            />
          </div>
          {isMat ? (
            <div>
              <label htmlFor="k-material" className={label}>
                Material / jasa *
              </label>
              <Select
                id="k-material"
                value={mat?.name ?? ''}
                onChange={(v) => {
                  setMatId(catalog.find((c) => c.name === v)?.id ?? '');
                  setQty('');
                }}
                options={catalog.map((c) => c.name)}
                placeholder="Pilih material"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="k-jenis" className={label}>
                Jenis pekerjaan *
              </label>
              <Select
                id="k-jenis"
                value={job}
                onChange={(v) => setJob(v as typeof job)}
                options={jobs}
                placeholder="Pilih pekerjaan"
              />
            </div>
          )}
          {isMat && mat?.order.unit && (
            <div className="sm:col-span-2">
              <label htmlFor="k-qty" className={label}>
                {mat.order.qtyLabel} *
              </label>
              <input
                id="k-qty"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder={mat.order.placeholder}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className={field}
              />
              {mat.price && (
                <p className="mt-1.5 text-xs text-muted">
                  Harga {rupiah(mat.price.amount)}/{mat.price.unit}. Estimasi muncul di pratinjau.
                </p>
              )}
            </div>
          )}
          <div className="sm:col-span-2">
            <label htmlFor="k-lokasi" className={label}>
              {isMat ? 'Lokasi pengiriman (kota/kecamatan)' : 'Lokasi proyek (kota/kecamatan)'} *
            </label>
            <input
              id="k-lokasi"
              maxLength={80}
              placeholder="mis. Cibubur, Kab. Bogor"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={field}
            />
            <LocationTools query={location} pin={pin} onPin={setPin} />
          </div>
          {!isMat && (
            <>
              <div>
                <label htmlFor="k-tanah" className={label}>
                  Luas tanah (m²)
                </label>
                <input
                  id="k-tanah"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={land}
                  onChange={(e) => setLand(e.target.value)}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="k-bangunan" className={label}>
                  Luas bangunan (m²)
                </label>
                <input
                  id="k-bangunan"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="k-budget" className={label}>
                  Kisaran budget
                </label>
                <Select
                  id="k-budget"
                  value={budget}
                  onChange={setBudget}
                  options={budgets}
                  placeholder="Pilih (opsional)"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="k-mulai" className={label}>
              {isMat ? 'Dibutuhkan bulan' : 'Rencana mulai'}
            </label>
            <MonthPicker id="k-mulai" value={start} onChange={setStart} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="k-catatan" className={label}>
              {isMat && mat && !mat.order.unit
                ? 'Detail pekerjaan *'
                : isMat
                  ? 'Catatan (spesifikasi, akses truk, dll.)'
                  : 'Catatan & link referensi'}
            </label>
            <textarea
              id="k-catatan"
              rows={3}
              maxLength={300}
              placeholder={
                isMat && mat && !mat.order.unit
                  ? mat.order.placeholder
                  : isMat
                    ? 'mis. jalan bisa dilewati truk, minta kirim pagi'
                    : 'mis. ingin rumah 2 lantai, 3 kamar. Boleh tempel link Google Drive/Pinterest.'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${field} resize-y py-3`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
