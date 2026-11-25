import { ExternalLink, Facebook, Globe, Instagram, Linkedin, Music2, Twitter, Youtube } from 'lucide-react';
import { SOCIAL_LINKS, type SocialPlatform } from '@/lib/socialLinks';

const PLATFORM_ICONS: Record<SocialPlatform, typeof Globe> = {
  website: Globe,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  x: Twitter,
  linkedin: Linkedin,
};

export function SocialMediaScreen() {
  return (
    <div className="space-y-4 pb-24">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Social Media</h1>
        <p className="text-xs text-white/60 mt-0.5">Oficjalne kanały Podhala Nowy Targ. Obserwuj Szarotki!</p>
      </div>

      <ul className="grid grid-cols-1 gap-2.5">
        {SOCIAL_LINKS.map((link) => {
          const Icon = PLATFORM_ICONS[link.platform];
          return (
            <li
              key={link.platform}
              className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center shrink-0 text-gold-400">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-white truncate">{link.name}</p>
                  <p className="text-xs text-white/60 truncate">{link.handle}</p>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{link.description}</p>
              {link.url ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 hover:bg-gold-300 text-navy-900 text-xs font-bold py-2.5 transition-all active:scale-95"
                >
                  Przejdź do profilu
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only">(otwiera się w nowej karcie)</span>
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-xl border border-white/10 text-white/50 text-xs font-semibold py-2.5">
                  Link wkrótce
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
