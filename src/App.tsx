import { useState, useCallback } from 'react';
import { User, Building2, Users, Shield, ChevronRight, ArrowLeft, BarChart3, Share2, RefreshCw } from 'lucide-react';
import { StatsScreen } from './screens/StatsScreen';
import { SocialMediaScreen } from './screens/SocialMediaScreen';
import { PointsProvider } from './lib/points';
import { BottomNav, type TabId } from './components/BottomNav';
import { PushBanner } from './components/PushBanner';
import { MatchScreen } from './screens/MatchScreen';
import { FanZoneScreen } from './screens/FanZoneScreen';
import { QuizScreen } from './screens/QuizScreen';
import { FanCardScreen } from './screens/FanCardScreen';
import { TeamScreen } from './screens/TeamScreen';
import { AdminScreen } from './screens/AdminScreen';
import { ClubHallSection } from './components/ClubHallSection';
import { AccountSection } from './components/AccountSection';

async function forceReloadApp() {
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.update()));
    }
  } catch {
    // Ignoruj błędy dostępu do pamięci podręcznej w trybie prywatnym
  }
  const url = new URL(window.location.href);
  url.searchParams.set('v', String(Date.now()));
  window.location.replace(url.toString());
}

function MoreMenu({ onSelect }: { onSelect: (tab: TabId) => void }) {
  const [reloading, setReloading] = useState(false);

  const items: {
    id: TabId;
    title: string;
    subtitle: string;
    icon: typeof User;
  }[] = [
    {
      id: 'konto',
      title: 'Moje konto',
      subtitle: 'Rejestracja, logowanie, punkty i zgody RODO',
      icon: User,
    },
    {
      id: 'hala',
      title: 'Hala i Historia Klubu',
      subtitle: 'Miejska Hala Lodowa, historia od 1932 r., legendy i FAQ',
      icon: Building2,
    },
    {
      id: 'druzyna',
      title: 'Drużyna',
      subtitle: 'Kadra zawodników i sztab Szarotek',
      icon: Users,
    },
    {
      id: 'statystyki',
      title: 'Statystyki',
      subtitle: 'Gole, asysty, punkty, kary i +/- zawodników',
      icon: BarChart3,
    },
    {
      id: 'social',
      title: 'Social Media',
      subtitle: 'Facebook, Instagram, YouTube, TikTok i strona klubu',
      icon: Share2,
    },
    {
      id: 'panel',
      title: 'Panel Klubu',
      subtitle: 'Statystyki na żywo i powiadomienia push',
      icon: Shield,
    },
  ];

  const handleRefreshClick = async () => {
    setReloading(true);
    await forceReloadApp();
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Więcej</h1>
          <p className="text-xs text-white/60 mt-0.5">
            Konto kibica, hala lodowa, zespół i narzędzia klubowe
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={reloading}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gold-400 transition-colors shrink-0 disabled:opacity-60"
          title="Wymuś pobranie najnowszej wersji aplikacji"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${reloading ? 'animate-spin' : ''}`} />
          {reloading ? 'Odświeżam...' : 'Odśwież'}
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map(({ id, title, subtitle, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center shrink-0 text-gold-400">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-white truncate">{title}</div>
                <div className="text-xs text-white/60 line-clamp-1">{subtitle}</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<TabId>('mecz');
  const [push, setPush] = useState<string | null>(null);

  const dismissPush = useCallback(() => setPush(null), []);

  const isSubScreen =
    tab === 'konto' || tab === 'hala' || tab === 'druzyna' || tab === 'statystyki' || tab === 'social' || tab === 'panel';

  return (
    <PointsProvider>
      <div className="min-h-screen bg-navy-900 flex justify-center text-white">
        {/* Desktop frame */}
        <div className="relative w-full max-w-[430px] min-h-screen bg-navy-700 shadow-2xl overflow-x-hidden sm:border-x border-white/5">
          {/* Ambient background glow */}
          <div className="fixed inset-0 pointer-events-none max-w-[430px] mx-auto">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gold-400/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-red-400/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 right-0 w-60 h-60 bg-navy-400/10 rounded-full blur-[80px]" />
          </div>

          {/* Content */}
          <div className="relative">
            {push && <PushBanner text={push} onDismiss={dismissPush} />}
            <div className="pt-safe px-3 pt-3 pb-20">
              {isSubScreen && (
                <button
                  type="button"
                  onClick={() => setTab('wiecej')}
                  className="mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white/80 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Wróć do menu Więcej
                </button>
              )}

              {tab === 'mecz' && <MatchScreen />}
              {tab === 'typer' && <FanZoneScreen />}
              {tab === 'quiz' && <QuizScreen />}
              {tab === 'karta' && <FanCardScreen />}
              {tab === 'wiecej' && <MoreMenu onSelect={setTab} />}
              {tab === 'konto' && <AccountSection />}
              {tab === 'hala' && <ClubHallSection />}
              {tab === 'druzyna' && <TeamScreen />}
              {tab === 'statystyki' && <StatsScreen />}
              {tab === 'social' && <SocialMediaScreen />}
              {tab === 'panel' && <AdminScreen pushHandler={setPush} />}
            </div>
          </div>

          <BottomNav active={tab} onChange={setTab} />
        </div>
      </div>
    </PointsProvider>
  );
}
