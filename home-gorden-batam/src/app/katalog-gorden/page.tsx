import type { Metadata } from 'next';
import { CategoryLanding } from '@/components/CategoryLanding';
import { siteConfig } from '@/lib/config';

const title = 'Katalog Gorden & Vitrase Batam';
const description =
  'Gorden custom, vitrase, gorden minimalis, dan blackout dengan foto pemasangan asli di Batam. Survei & pengukuran gratis ke seluruh area Batam.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/katalog-gorden' },
  openGraph: {
    url: '/katalog-gorden',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [{ url: '/projects/gorden-cokelat-vitrase-pintu-kaca-2611-01.webp' }],
  },
};

export default function KatalogGordenPage() {
  return (
    <CategoryLanding
      path="/katalog-gorden"
      crumb="Katalog Gorden"
      eyebrow="Katalog Gorden"
      title="Gorden &amp; Vitrase untuk Rumah di Batam"
      description={description}
      categories={['gorden-vitrase']}
      photoFilters={['Gorden', 'Vitrase']}
      waMessage={`Halo ${siteConfig.name}, saya mau tanya katalog gorden & vitrase dan jadwal survei gratis.`}
    />
  );
}
