import type { Metadata } from 'next';
import { CategoryLanding } from '@/components/CategoryLanding';
import { siteConfig } from '@/lib/config';

const title = 'Blinds & Wallpaper Batam';
const description =
  'Vertical, horizontal, dan roller blinds, wallpaper vinyl, serta rell besi & aksesori gorden. Pengukuran dan pemasangan ke seluruh area Batam.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blinds-wallpaper' },
  openGraph: {
    url: '/blinds-wallpaper',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [{ url: '/projects/roller-blinds-abu-jendela-2611-01.webp' }],
  },
};

export default function BlindsWallpaperPage() {
  return (
    <CategoryLanding
      path="/blinds-wallpaper"
      crumb="Blinds & Wallpaper"
      eyebrow="Blinds &amp; Wallpaper"
      title="Tirai Blinds &amp; Wallpaper di Batam"
      description={description}
      categories={['blinds', 'wallpaper-aksesoris']}
      photoFilters={['Blinds', 'Wallpaper']}
      waMessage={`Halo ${siteConfig.name}, saya mau tanya blinds / wallpaper dan jadwal survei gratis.`}
    />
  );
}
