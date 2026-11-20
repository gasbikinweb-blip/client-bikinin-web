// Ikon SVG sederhana (garis), semua dekoratif kecuali diberi label oleh pemakai
type P = { className?: string };

const line = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

export const InstagramIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const ThreadsIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="M16.5 11.2c-.4-2.6-2-3.9-4.5-3.9-2.6 0-4.4 1.8-4.4 4.7s1.8 4.8 4.6 4.8c2.2 0 4-1.3 4-3.4 0-2-1.6-3-3.6-3-1.8 0-3 .9-3 2.2 0 1.2 1 1.9 2.3 1.9 2.3 0 3.3-2 2.9-5" />
    <path d="M19.5 7.5C18 4.8 15.4 3 12 3 6.8 3 3.5 6.8 3.5 12S6.8 21 12 21c3.6 0 6.3-1.7 7.6-4.6" />
  </svg>
);

export const TikTokIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.3 2.6 2.2 4.6 5 4.8" />
  </svg>
);

export const FacebookIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="M14.5 21v-7.5H17l.5-3h-3V8.7c0-.9.4-1.5 1.6-1.5h1.5V4.6c-.3 0-1.2-.1-2.3-.1-2.4 0-3.8 1.4-3.8 4V10.5H9v3h2.5V21" />
  </svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowIcon = ({ className, dir = 'right' }: P & { dir?: 'left' | 'right' }) => (
  <svg {...line} className={className}>
    <path d={dir === 'right' ? 'M5 12h14m-6-6 6 6-6 6' : 'M19 12H5m6-6-6 6 6 6'} />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const LinkIcon = ({ className }: P) => (
  <svg {...line} className={className}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);

export const ServiceIcon = ({ name, className }: P & { name: string }) => {
  const paths: Record<string, React.ReactNode> = {
    rumah: (
      <>
        <path d="M3 11 12 4l9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
    renovasi: (
      <>
        <path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.5-.5-.5-2.5Z" />
      </>
    ),
    interior: (
      <>
        <path d="M4 18v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
        <path d="M4 15h16M6 18v2M18 18v2M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
      </>
    ),
    taman: (
      <>
        <path d="M12 21v-8" />
        <path d="M12 13c-4 0-6-2.5-6-6 3.5 0 6 2 6 6Z" />
        <path d="M12 13c4 0 6-2.5 6-6-3.5 0-6 2-6 6Z" />
        <path d="M5 21h14" />
      </>
    ),
    material: (
      <>
        <rect x="3" y="13" width="8" height="5" />
        <rect x="13" y="13" width="8" height="5" />
        <rect x="8" y="7" width="8" height="5" />
      </>
    ),
  };
  return (
    <svg {...line} className={className}>
      {paths[name]}
    </svg>
  );
};
