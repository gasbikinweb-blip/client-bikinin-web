// Logo AKAA dari file asli Logo_akaa.png (PNG transparan, tepi kosong dipotong).
// Dipakai sebagai CSS mask agar warnanya mengikuti tema (gelap/terang).
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span
      role="img"
      aria-label="AKAA – Aneka Kreasi Abadi"
      className={`logo-mask block h-10 w-[107px] sm:h-11 sm:w-[118px] ${light ? 'bg-white' : 'bg-foreground'}`}
    />
  );
}
