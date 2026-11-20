import { FacebookIcon, InstagramIcon, ThreadsIcon, TikTokIcon } from './icons';
import { site } from '@/data/site';

const items = [
  { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.social.threads, label: 'Threads', Icon: ThreadsIcon },
  { href: site.social.tiktok, label: 'TikTok', Icon: TikTokIcon },
  { href: site.social.facebook, label: 'Facebook', Icon: FacebookIcon },
];

export function Socials({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} AKAA Construction (tab baru)`}
            className="grid size-11 place-items-center rounded-md border border-current/20 hover:border-accent hover:text-accent"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
