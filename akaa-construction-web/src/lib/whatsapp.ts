import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin konsultasi untuk bangun rumah / renovasi.`;

export const serviceMessage = (service: string) =>
  `Halo ${siteConfig.name}, saya ingin konsultasi layanan ${service}. Boleh dibantu informasinya?`;

/** Link halaman proyek (/proyek/[slug]); dipakai di pesan WA dan tombol "Salin Link" */
export const projectUrl = (slug: string) => new URL(`/proyek/${slug}`, siteConfig.url).href;

export const projectMessage = (name: string, slug: string) =>
  `Halo ${siteConfig.name}, saya tertarik dengan proyek serupa "${name}". Boleh konsultasi?\n\n${projectUrl(slug)}`;
