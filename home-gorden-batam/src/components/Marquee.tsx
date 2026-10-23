type Props = {
  children: React.ReactNode;
  duration?: string;
  className?: string;
};

// Teks berjalan tanpa henti. Konten digandakan agar loop mulus; salinannya disembunyikan dari pembaca layar.
export function Marquee({ children, duration = '40s', className = '' }: Props) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ '--duration': duration } as React.CSSProperties}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
