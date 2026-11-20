'use client';

// Link lama dari versi satu halaman (mis. /#proyek-sn-house yang sudah dibagikan admin)
// dialihkan ke halaman barunya.
import { useEffect } from 'react';

const targets: [prefix: string, page: string][] = [
  ['#proyek', '/proyek'],
  ['#video', '/proyek'],
  ['#pesan-', '/kontak'],
  ['#konsultasi', '/kontak'],
  ['#kontak', '/kontak'],
  ['#faq', '/kontak'],
  ['#layanan', '/layanan'],
  ['#katalog', '/layanan'],
  ['#keunggulan', '/tentang'],
  ['#cara-kerja', '/tentang'],
  ['#brosur', '/tentang'],
];

export function LegacyHashRedirect() {
  useEffect(() => {
    const h = window.location.hash;
    const hit = targets.find(([prefix]) => h.startsWith(prefix));
    if (hit) window.location.replace(hit[1] + h);
  }, []);
  return null;
}
