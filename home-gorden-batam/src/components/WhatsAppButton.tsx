import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
};

// Tombol WhatsApp standar; selalu membuka tab baru dengan rel aman
export function WhatsAppButton({
  message = generalMessage,
  children = 'Tanya via WhatsApp',
  variant = 'solid',
  className = '',
}: Props) {
  const styles =
    variant === 'solid'
      ? 'bg-accent text-background hover:bg-accent-strong'
      : 'border border-foreground/30 text-foreground hover:border-accent hover:text-accent-strong';
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
      <span>{children}</span>
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  );
}
