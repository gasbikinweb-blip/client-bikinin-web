import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang di pojok kanan bawah semua halaman
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp (membuka tab baru)"
      className="animate-wa-pulse fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
