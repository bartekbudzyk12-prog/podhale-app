import { useState, useCallback, useEffect } from 'react';
import { User, Building2, Users, Shield, ChevronRight, ArrowLeft, BarChart3, Share2, RefreshCw, Lock, KeyRound } from 'lucide-react';
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
import { AdminScreen, type LiveScoreState, DEFAULT_LIVE_SCORE, readLiveScore, writeLiveScore } from './screens/AdminScreen';
import { ClubHallSection } from './components/ClubHallSection';
import { AccountSection } from './components/AccountSection';

const ADMIN_SESSION_KEY = 'podhale_admin_unlocked_v1';
const CONFIGURED_PIN = (import.meta.env.VITE_ADMIN_PIN as string | undefined)?.trim() || '1932';

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
    // Ignoruj błędy dostępu do pamięci podręcznej
  }
  const url = new URL(window.location.href);
  url.searchParams.set('v', String(Date.now()));
  window.location.replace(url.toString());
}

function PinUnlockModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === CONFIGURED_PIN) {
      setError('');
      setPin('');
      onSuccess();
    } else {
      setError('Nieprawidłowy PIN zarządzania.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] rounded-3xl glass-gold border border-white/15 p-5 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base uppercase tracking-wide text-white">Tryb zarządzania</h2>
            <p className="text-[11px] text-gray-400">Wpisz PIN osoby upoważnionej</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              if (error) setError('');
            }}
            placeholder="Wpisz PIN..."
            autoFocus
            className="w-full bg-navy-600 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-gold-400/60 outline-none"
          />
          {error && <p className="text-xs text-red-300">{error}</p>}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setPin('');
                setError('');
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-300 text-navy-900 text-xs font-bold"
            >
              Odblokuj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MoreMenu({
  onSelect,
  isAdminUnlocked,
  onOpenPinModal,
  onLockAdmin,
}: {
  onSelect: (tab: TabId) => void;
  isAdminUnlocked: boolean;
  onOpenPinModal: () => void;
  onLockAdmin: () => void;
}) {
  const [reloading, setReloading] = useState(false);

  const fanItems: {
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
            Konto kibica, hala lodowa, zespół i informacje klubowe
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
        {fanItems.map(({ id, title, subtitle, icon: Icon }) => (
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

      {isAdminUnlocked ? (
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={() => onSelect('panel')}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-red-400/10 hover:bg-red-400/15 border border-red-400/30 text-left transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-red-400/20 border border-red-400/30 flex items-center justify-center shrink-0 text-red-300">
                <Shield className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-white truncate">Panel Klubu</div>
                <div className="text-xs text-red-200/80 line-clamp-1">Zarządzanie wynikiem na żywo i powiadomienia</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-200/60 shrink-0" />
          </button>

          <button
            type="button"
            onClick={onLockAdmin}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Zablokuj tryb zarządzania
          </button>
        </div>
      ) : (
        <div className="pt-3 flex justify-center">
          <button
            type="button"
            onClick={onOpenPinModal}
            className="text-[11px] text-white/35 hover:text-white/60 transition-colors"
          >
            Dostęp zarządzający
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<TabId>('mecz');
  const [push, setPush] = useState<string | null>(null);
  const [liveScore, setLiveScore] = useState<LiveScoreState>(() => readLiveScore());
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [pinModalOpen, setPinModalOpen] = useState(false);

  useEffect(() => {
    const sync = () => setLiveScore(readLiveScore());
    window.addEventListener('podhale-live-score-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('podhale-live-score-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const handleUnlockSuccess = useCallback(() => {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    } catch {
      // Ignoruj błędy dostępu do sessionStorage
    }
    setIsAdminUnlocked(true);
    setPinModalOpen(false);
    setTab('panel');
  }, []);

  const handleLockAdmin = useCallback(() => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignoruj błędy dostępu do sessionStorage
    }
    setIsAdminUnlocked(false);
    if (tab === 'panel') {
      setTab('wiecej');
    }
  }, [tab]);

  const updateLiveScore = useCallback((patch: Partial<LiveScoreState>) => {
    setLiveScore((prev) => {
      const next: LiveScoreState = {
        ...prev,
        ...patch,
        active: patch.active !== undefined ? patch.active : true,
        updatedAt: Date.now(),
      };
      writeLiveScore(next);
      return next;
    });
  }, []);

  const resetLiveScore = useCallback(() => {
    const next: LiveScoreState = { ...DEFAULT_LIVE_SCORE, updatedAt: Date.now() };
    writeLiveScore(next);
    setLiveScore(next);
  }, []);

  const dismissPush = useCallback(() => setPush(null), []);

  const isSubScreen =
    tab === 'konto' || tab === 'hala' || tab === 'druzyna' || tab === 'statystyki' || tab === 'social' || tab === 'panel';

  return (
    <PointsProvider>
      <div className="min-h-screen bg-navy-900 flex justify-center text-white">
        <div className="relative w-full max-w-[430px] min-h-screen bg-navy-700 shadow-2xl overflow-x-hidden sm:border-x border-white/5">
          <div className="fixed inset-0 pointer-events-none max-w-[430px] mx-auto">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gold-400/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-red-400/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 right-0 w-60 h-60 bg-navy-400/10 rounded-full blur-[80px]" />
          </div>

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

              {tab === 'mecz' && <MatchScreen liveScore={liveScore} />}
              {tab === 'typer' && <FanZoneScreen />}
              {tab === 'quiz' && <QuizScreen />}
              {tab === 'karta' && <FanCardScreen />}
              {tab === 'wiecej' && (
                <MoreMenu
                  onSelect={setTab}
                  isAdminUnlocked={isAdminUnlocked}
                  onOpenPinModal={() => setPinModalOpen(true)}
                  onLockAdmin={handleLockAdmin}
                />
              )}
              {tab === 'konto' && <AccountSection />}
              {tab === 'hala' && <ClubHallSection />}
              {tab === 'druzyna' && <TeamScreen />}
              {tab === 'statystyki' && <StatsScreen />}
              {tab === 'social' && <SocialMediaScreen />}
              {tab === 'panel' && (
                isAdminUnlocked ? (
                  <AdminScreen
                    pushHandler={setPush}
                    liveScore={liveScore}
                    onUpdateLiveScore={updateLiveScore}
                    onResetLiveScore={resetLiveScore}
                  />
                ) : (
                  <MoreMenu
                    onSelect={setTab}
                    isAdminUnlocked={false}
                    onOpenPinModal={() => setPinModalOpen(true)}
                    onLockAdmin={handleLockAdmin}
                  />
                )
              )}
            </div>
          </div>

          <BottomNav active={tab} onChange={setTab} />
          <PinUnlockModal
            open={pinModalOpen}
            onClose={() => setPinModalOpen(false)}
            onSuccess={handleUnlockSuccess}
          />
        </div>
      </div>
    </PointsProvider>
  );
}
