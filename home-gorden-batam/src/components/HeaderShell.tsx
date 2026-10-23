'use client';

// Navbar transparan di atas, lalu muncul latar blur saat halaman di-scroll
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  // Di beranda, navbar transparan berada di atas video gelap: paksa teks terang di mode apa pun
  const overHero = usePathname() === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={`${overHero ? 'theme-dark' : ''} group/header sticky top-0 z-30 border-b border-transparent transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-background/85 data-[scrolled=true]:shadow-[0_10px_40px_-10px_rgb(0_0_0/0.35)] data-[scrolled=true]:backdrop-blur-md`}
    >
      {children}
    </header>
  );
}
