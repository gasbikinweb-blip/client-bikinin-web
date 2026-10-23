'use client';

import { navLinks } from './nav-links';
import { useActiveSection } from './use-active-section';

export function DesktopNav() {
  const activeHref = useActiveSection();

  return (
    <nav aria-label="Navigasi utama" className="hidden xl:block">
      <ul className="flex items-center gap-3 text-xs font-medium tracking-wide 2xl:gap-5 2xl:text-sm">
        {navLinks.map((l) => {
          const isActive = activeHref === l.href;
          return (
            <li key={l.href} className="shrink-0">
              <a
                href={`/${l.href}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 whitespace-nowrap transition-all duration-300 after:absolute after:right-3 after:bottom-0.5 after:left-3 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform after:duration-300 ${
                  isActive
                    ? 'bg-accent/15 font-semibold text-accent-strong after:scale-x-100'
                    : 'text-foreground/80 after:scale-x-0 hover:text-foreground hover:after:scale-x-100'
                }`}
              >
                {isActive && (
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                )}
                <span>{l.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
