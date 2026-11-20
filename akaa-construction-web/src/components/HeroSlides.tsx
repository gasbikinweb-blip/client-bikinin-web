'use client';

// Latar hero: foto proyek AKAA bergantian tiap 5 detik (crossfade + zoom pelan).
// Bila pengguna memilih "kurangi animasi", hanya foto pertama yang tampil.
import Image from 'next/image';
import { useEffect, useState } from 'react';

const slides = [
  '/images/proyek/gazebo-interior-cafe-jakarta/01.webp',
  '/images/proyek/kitchen-set-canopy-yoga-jakarta/01.webp',
  '/images/proyek/interior-apartemen/01.webp',
  '/images/proyek/washpaint-epoxy-bekasi/01.webp',
  '/images/proyek/granit-black-galaxy-bekasi/01.webp',
];

export function HeroSlides() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20">
      {slides.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={idx === 0}
          sizes="100vw"
          className={`object-cover brightness-[.8] transition-[opacity,transform] duration-[1500ms] ease-out ${
            idx === i ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
