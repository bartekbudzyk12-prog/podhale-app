import { ClubHallSection } from './components/ClubHallSection';
import {
  MapPin,
  Navigation,
  Users,
  Car,
  Utensils,
  ShoppingBag,
  Bus,
  Trophy,
  Calendar,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface LegendItem {
  name: string;
  role: string;
  highlight: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const TIMELINE: TimelineItem[] = [
  {
    year: '1932',
    title: 'Narodziny hokeja w Nowym Targu',
    description:
      'Powstaje sekcja hokejowa, która na dekady buduje podhalańską tożsamość i wychowuje kolejne pokolenia zawodników.',
  },
  {
    year: '1966–1997',
    title: 'Złota era i dominacja na lodzie',
    description:
      'Kolejne tytuły Mistrza Polski sprawiają, że „Szarotki” stają się synonimem polskiego hokeja i kuźnią reprezentantów kraju.',
  },
  {
    year: 'XXI wiek',
    title: 'Nowe wyzwania i wychowankowie w świecie',
    description:
      'Zawodnicy wyszkoleni na Podhalu trafiają do najsilniejszych lig europejskich oraz NHL, a klub walczy o powrót na szczyt.',
  },
  {
    year: 'Dziś',
    title: 'Nowoczesna odsłona i bliskość kibica',
    description:
      'Łączymy góralski charakter i tradycję z nowoczesnym podejściem do dnia meczowego, społeczności i aplikacji mobilnej.',
  },
];

const LEGENDS: LegendItem[] = [
  {
    name: 'Walenty Ziętara',
    role: 'Legenda ławki i lodu',
    highlight: 'Symbol podhalańskiego hokeja, wielokrotny mistrz i szkoleniowiec.',
  },
  {
    name: 'Stefan Chowaniec',
    role: 'Reprezentant Polski i Olimpijczyk',
    highlight: 'Ikona defensywy i twardej, bezkompromisowej gry w barwach Podhala.',
  },
  {
    name: 'Krzysztof Oliwa',
    role: 'Wychowanek · Zdobywca Pucharu Stanleya',
    highlight: 'Pierwszy Polak, który sięgnął po najcenniejsze trofeum w światowym hokeju.',
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Kiedy otwierane są drzwi Miejskiej Hali Lodowej przed meczem?',
    answer:
      'Zazwyczaj na 60 minut przed pierwszym gwizdkiem / rozpoczęciem spotkania. Zachęcamy do wcześniejszego przyjścia, aby spokojnie zająć miejsce i odwiedzić strefę kibica.',
  },
  {
    question: 'Jakie obowiązują zasady wejścia dla dzieci oraz bilety ulgowe?',
    answer:
      'Dzieci do określonego wieku (zgodnie z aktualnym komunikatem meczowym klubu) wchodzą na zasadach preferencyjnych lub bezpłatnie pod opieką dorosłego. Bilety ulgowe przysługują uczniom, studentom, seniorom oraz osobom z niepełnosprawnościami po okazaniu ważnego dokumentu.',
  },
  {
    question: 'Czego nie wolno wnosić na teren hali podczas wydarzenia?',
    answer:
      'Ze względów bezpieczeństwa zabronione jest wnoszenie materiałów pirotechnicznych, broni, alkoholu, środków odurzających, szklanych opakowań oraz przedmiotów mogących stanowić zagrożenie dla innych uczestników.',
  },
];

export const ClubHallSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showSectorInfo, setShowSectorInfo] = useState(false);

  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Miejska+Hala+Lodowa+Parkowa+14+Nowy+Targ';

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="space-y-6 pb-8 text-slate-100">
      {/* Nagłówek sekcji */}
      <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-[#0b1730] via-[#071022] to-[#040810] p-5 shadow-lg">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          O Klubie i Hala
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-white">
          Szarotki · Podhale Nowy Targ
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
          Tradycja od 1932 roku, gorący doping pod Giewontem i dom na lodzie przy
          ulicy Parkowej w sercu Nowego Targu.
        </p>
      </div>

      {/* 1. Karta Miejskiej Hali Lodowej */}
      <div className="rounded-2xl border border-slate-800 bg-[#081124] p-5 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Obiekt meczowy
            </span>
            <h3 className="mt-1 text-xl font-bold text-white">
              Miejska Hala Lodowa w Nowym Targu
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-300">
              <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
              ul. Parkowa 14, 34-400 Nowy Targ
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-900/90 px-2.5 py-1 border border-slate-700/70">
                <Users className="h-3.5 w-3.5 text-amber-400" />
                Pojemność trybun: ok. 3 500 miejsc
              </span>
              <span className="inline-flex items-center rounded-lg bg-rose-500/15 px-2.5 py-1 font-medium text-rose-300 border border-rose-500/30">
                Modernizacja obiektu
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Kultowe lodowisko w Nowym Targu, na bieżąco unowocześniane pod kątem
          komfortu kibiców, zaplecza sportowego oraz organizacji wydarzeń
          hokejowych i miejskich.
        </p>

        {/* Przyciski szybkiej akcji */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 active:scale-[0.99]"
          >
            <Navigation className="h-4 w-4" />
            Nawiguj do hali
          </a>
          <button
            type="button"
            onClick={() => setShowSectorInfo((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white transition hover:border-amber-400/50 hover:bg-slate-800 active:scale-[0.99]"
          >
            <MapPin className="h-4 w-4 text-rose-400" />
            {showSectorInfo ? 'Ukryj plan sektorów' : 'Plan sektorów / Wejścia'}
          </button>
        </div>

        {showSectorInfo && (
          <div className="mt-3 rounded-xl border border-amber-400/25 bg-slate-950/80 p-3.5 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-amber-300">
              Wejścia i organizacja trybun (ul. Parkowa 14):
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-slate-300">
              <li>
                Wejście główne i kasy biletowe zlokalizowane są od strony alei
                parkowej i parkingu.
              </li>
              <li>
                Sektory kibiców gospodarzy oraz sektory rodzinne oznaczono
                czytelnie w holu głównym.
              </li>
              <li>
                W trakcie prac modernizacyjnych zwracaj uwagę na bieżące
                oznakowanie wejść i ciągów komunikacyjnych.
              </li>
            </ul>
          </div>
        )}

        {/* Kafelki praktycznych informacji dla kibica */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <Car className="h-4 w-4 text-amber-400" />
            <p className="mt-1.5 text-xs font-bold text-white">Parking</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
              Miejsca postojowe w pobliżu hali i parku — przyjedź wcześniej w dzień meczu.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <Utensils className="h-4 w-4 text-rose-400" />
            <p className="mt-1.5 text-xs font-bold text-white">
              Gastronomia / Strefa Kibica
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
              Ciepłe przekąski i napoje przed meczem oraz w przerwach tercji.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <ShoppingBag className="h-4 w-4 text-amber-400" />
            <p className="mt-1.5 text-xs font-bold text-white">Sklepik Klubowy</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
              Szaliki, koszulki, czapki i pamiątki w barwach Podhala.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <Bus className="h-4 w-4 text-sky-400" />
            <p className="mt-1.5 text-xs font-bold text-white">
              Dojazd komunikacją
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
              Wygodny dojazd pieszy, rowerowy oraz komunikacją miejską w Nowym Targu.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Historia i Tożsamość Klubu */}
      <div className="rounded-2xl border border-slate-800 bg-[#081124] p-5 shadow-md">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white">
            Szarotki – Duma Podhala
          </h3>
        </div>
        <p className="mt-1 text-sm text-slate-300">
          Klub z charakterem góralskiego hartu ducha i bogactwem sportowych
          sukcesów.
        </p>

        {/* Najważniejsze liczby w kafelkach */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-400/20 bg-slate-900/80 p-3.5 text-center">
            <p className="text-2xl font-black text-amber-400">1932</p>
            <p className="mt-0.5 text-xs font-semibold text-white">
              Rok założenia
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Ponad dziewięć dekad tradycji
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/25 bg-slate-900/80 p-3.5 text-center">
            <p className="text-2xl font-black text-rose-400">19×</p>
            <p className="mt-0.5 text-xs font-semibold text-white">
              Mistrz Polski
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Jeden z najbardziej utytułowanych klubów
            </p>
          </div>

          <div className="rounded-xl border border-sky-400/25 bg-slate-900/80 p-3.5 text-center">
            <p className="text-2xl font-black text-sky-400">NHL & Kadra</p>
            <p className="mt-0.5 text-xs font-semibold text-white">
              Wychowankowie klubu
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Reprezentanci Polski i lig zagranicznych
            </p>
          </div>
        </div>

        {/* Oś czasu (Timeline) */}
        <div className="mt-6">
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Calendar className="h-4 w-4 text-amber-400" />
            Oś czasu
          </h4>
          <div className="space-y-3 border-l-2 border-amber-400/40 pl-4">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-4 ring-[#081124]" />
                <span className="text-xs font-extrabold text-amber-300">
                  {item.year}
                </span>
                <h5 className="text-sm font-bold text-white">{item.title}</h5>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legendy klubu — przewijane karty poziome */}
        <div className="mt-6">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-300">
            Legendy klubu
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {LEGENDS.map((legend) => (
              <div
                key={legend.name}
                className="w-64 shrink-0 snap-start rounded-xl border border-slate-800 bg-slate-900/85 p-3.5"
              >
                <p className="text-sm font-bold text-white">{legend.name}</p>
                <p className="mt-0.5 text-xs font-semibold text-amber-300">
                  {legend.role}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {legend.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Zasady wejścia i regulamin dnia meczowego (FAQ Accordion) */}
      <div className="rounded-2xl border border-slate-800 bg-[#081124] p-5 shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white">
            Zasady wejścia i dzień meczowy
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Najważniejsze informacje przed wizytą na hali.
        </p>

        <div className="mt-4 divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950/60">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-white transition hover:bg-slate-900/70"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-amber-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs leading-relaxed text-slate-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClubHallSection;
