// Logo AKAA dari file asli (../Logo.jpg) yang dijadikan PNG transparan.
// Dipakai sebagai CSS mask agar warnanya mengikuti tema (gelap/terang).
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span
      role="img"
      aria-label="AKAA – Aneka Kreasi Abadi"
      className={`logo-mask block h-10 w-[109px] sm:h-11 sm:w-[120px] ${light ? 'bg-white' : 'bg-foreground'}`}
    />
  );
}
