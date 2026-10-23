type Props = {
  eyebrow: string;
  title: string;
  /** Kata atau frasa opsional yang akan diwarnai emas hangat (two-tone heading) */
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
};

/**
 * Judul section bergaya arsitektur interior modern:
 * - Label kecil dengan titik aksen (`• EYEBROW`)
 * - Judul tebal dengan perpaduan warna hitam arang & champagne gold
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  as: Tag = 'h2',
  id,
}: Props) {
  const center = align === 'center' ? 'mx-auto text-center' : '';

  // Jika highlight tidak dikirim khusus, otomatis beri aksen emas pada 2 kata terakhir judul
  let beforeText = title;
  let accentText = highlight ?? '';
  let afterText = '';

  if (!highlight) {
    const words = title.trim().split(/\s+/);
    if (words.length >= 4) {
      const splitIndex = Math.max(1, words.length - 2);
      beforeText = `${words.slice(0, splitIndex).join(' ')} `;
      accentText = words.slice(splitIndex).join(' ');
    }
  } else if (title.includes(highlight)) {
    const parts = title.split(highlight);
    beforeText = parts[0] ?? '';
    accentText = highlight;
    afterText = parts.slice(1).join(highlight);
  }

  return (
    <div data-stagger className={`max-w-3xl ${center}`}>
      <p
        className={`reveal reveal-blur inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        <span>{eyebrow}</span>
      </p>
      <Tag
        id={id}
        className="reveal mt-3 font-serif text-4xl leading-[1.12] font-semibold tracking-tight text-foreground sm:text-5xl"
      >
        {beforeText}
        {accentText && <span className="text-accent">{accentText}</span>}
        {afterText}
      </Tag>
      {description && (
        <p className="reveal mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      )}
    </div>
  );
}
