// Pengelompokan produk per ruangan untuk section interaktif di beranda.
import { getCategory, getProductBySlug } from './products';

type RoomConfig = {
  id: string;
  name: string;
  tagline: string;
  products: readonly string[];
};

const roomConfigs: readonly RoomConfig[] = [
  {
    id: 'ruang-tamu',
    name: 'Ruang Tamu & Keluarga',
    tagline:
      'Sambut tamu dengan jatuhan gorden yang rapi, terang alami di siang hari, dan tetap menjaga privasi keluarga.',
    products: ['gorden-minimalis', 'gorden-custom', 'gorden-vitrase', 'wallpaper-vinyl'],
  },
  {
    id: 'kamar-tidur',
    name: 'Kamar Tidur',
    tagline:
      'Redam terik matahari Batam dan ciptakan suasana kamar yang teduh, sejuk, dan tenang untuk istirahat berkualitas.',
    products: ['gorden-blackout', 'gorden-custom', 'gorden-vitrase'],
  },
  {
    id: 'ruko-kantor-dapur',
    name: 'Ruko, Kantor, & Dapur',
    tagline:
      'Solusi tirai modern yang ringkas, tahan lembap, mudah dibersihkan, dan menampilkan kesan profesional.',
    products: ['horizontal-blinds', 'vertical-blinds', 'roller-blinds', 'rell-besi'],
  },
];

export type RoomItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: { src: string; alt: string };
  material: string;
  dimensions: string;
};

export type Room = {
  id: string;
  name: string;
  tagline: string;
  items: RoomItem[];
};

/** Data ringkas (serializable) untuk dikirim ke client component */
export function getRooms(): Room[] {
  return roomConfigs
    .map((room) => ({
      id: room.id,
      name: room.name,
      tagline: room.tagline,
      items: room.products.flatMap((slug) => {
        const p = getProductBySlug(slug);
        if (!p) return [];
        return [
          {
            slug: p.slug,
            name: p.name,
            category: getCategory(p.category).name,
            description: p.description,
            image: p.images[0],
            material: p.specs.material,
            dimensions: p.specs.dimensions,
          },
        ];
      }),
    }))
    .filter((room) => room.items.length > 0);
}
