export type SocialPlatform = 'website' | 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'x' | 'linkedin';

export interface SocialLink {
  platform: SocialPlatform;
  name: string;
  handle: string;
  description: string;
  /** Set to null until the club confirms the official profile address. */
  url: string | null;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'website',
    name: 'Strona klubu',
    handle: 'podhalenowytarg.pl',
    description: 'Oficjalne komunikaty, terminarz, bilety i informacje o klubie.',
    url: 'https://podhalenowytarg.pl/kh',
  },
  {
    platform: 'facebook',
    name: 'Facebook',
    handle: '@podhale1932',
    description: 'Relacje z meczów, zapowiedzi, zdjęcia i najnowsze wiadomości z szatni.',
    url: 'https://www.facebook.com/podhale1932',
  },
  {
    platform: 'instagram',
    name: 'Instagram',
    handle: 'Szarotki',
    description: 'Zdjęcia z lodu, kulisy treningów i relacje dnia meczowego.',
    url: null,
  },
  {
    platform: 'youtube',
    name: 'YouTube',
    handle: 'Szarotki TV',
    description: 'Skróty meczów, wywiady z zawodnikami i konferencje trenerów.',
    url: null,
  },
  {
    platform: 'tiktok',
    name: 'TikTok',
    handle: 'Szarotki',
    description: 'Krótkie klipy, najlepsze akcje i zabawne momenty z hali.',
    url: null,
  },
  {
    platform: 'x',
    name: 'X',
    handle: 'Podhale Nowy Targ',
    description: 'Szybkie wyniki na żywo i najważniejsze ogłoszenia klubu.',
    url: null,
  },
  {
    platform: 'linkedin',
    name: 'LinkedIn',
    handle: 'podhalenowytarg',
    description: 'Informacje dla partnerów, sponsorów i współpracy biznesowej.',
    url: 'https://www.linkedin.com/company/podhalenowytarg',
  },
];
