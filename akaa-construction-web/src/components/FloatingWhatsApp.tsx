import { WhatsAppIcon } from './icons';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp AKAA Construction (tab baru)"
      className="wa-pulse fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-wa text-white shadow-lg hover:brightness-110 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
