// Format harga ke Rupiah; kalau kosong tampilkan ajakan survei & penawaran via WhatsApp
export function formatPrice(price?: number): string {
  if (price === undefined) return 'Harga sesuai ukuran (Survei Gratis)';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
}
