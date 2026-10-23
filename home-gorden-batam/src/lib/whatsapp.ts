import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin meminta jadwal survei gratis dan konsultasi pemasangan gorden di Batam.`;

/** Data minimal produk untuk pesan WhatsApp */
export type ProductInquiry = {
  slug: string;
  name: string;
  material?: string;
  dimensions?: string;
  colors?: readonly string[];
  suitableRooms?: readonly string[];
};

/** URL absolut katalog di landing page */
export const productUrl = (slug: string) => `${new URL('/', siteConfig.url).href}#katalog-${slug}`;

/**
 * Pesan otomatis berisi nama produk + detail spesifikasi.
 */
export function productMessage(p: ProductInquiry): string {
  const lines = [
    `Halo ${siteConfig.name}, saya ingin minta survei gratis dan penawaran untuk produk berikut:`,
    '',
    `• Jenis Produk : ${p.name}`,
    p.material && `• Pilihan Bahan: ${p.material}`,
    p.dimensions && `• Ukuran       : ${p.dimensions}`,
    p.colors?.length && `• Nuansa Warna : ${p.colors.join(', ')}`,
    p.suitableRooms?.length && `• Ruangan      : ${p.suitableRooms.join(', ')}`,
    '',
    'Mohon info jadwal survei gratis ke lokasi saya di Batam. Terima kasih.',
  ];
  return lines.filter((line): line is string => typeof line === 'string').join('\n');
}
