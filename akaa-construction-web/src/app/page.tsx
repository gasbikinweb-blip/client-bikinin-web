import { JsonLd } from '@/components/JsonLd';
import { LegacyHashRedirect } from '@/components/LegacyHashRedirect';
import { CtaBand, FeaturedProjects } from '@/components/PageParts';
import { Advantages, Hero, PromoBanner, Services } from '@/components/Sections';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'GeneralContractor',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          telephone: `+${siteConfig.waNumber}`,
          image: new URL('/og.jpg', siteConfig.url).href,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Ruko Fresh Market, Jl. Boulevard Kota Wisata, Ciangsana',
            addressLocality: 'Gunung Putri, Kabupaten Bogor',
            postalCode: '16968',
            addressRegion: 'Jawa Barat',
            addressCountry: 'ID',
          },
          email: site.email,
          openingHours: 'Mo-Sa 08:00-17:00',
          areaServed: [...site.areaDetail, 'Tangerang'].map((name) => ({ '@type': 'City', name })),
          // Titik kantor (dari embed Google Maps di site.ts)
          geo: { '@type': 'GeoCoordinates', latitude: -6.3656, longitude: 106.9575 },
          hasMap: site.mapsUrl,
          logo: new URL('/brand/logo.png', siteConfig.url).href,
          sameAs: Object.values(site.social),
        }}
      />
      <LegacyHashRedirect />
      <Hero />
      <PromoBanner />
      <Services />
      <Advantages />
      <FeaturedProjects />
      <CtaBand />
    </>
  );
}
