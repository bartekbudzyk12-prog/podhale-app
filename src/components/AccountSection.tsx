import { useState, type FormEvent } from 'react';
import {
  UserCheck,
  LogIn,
  UserPlus,
  LogOut,
  ShieldCheck,
  Mail,
  Lock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { usePoints } from '../lib/points';

interface FanProfile {
  name: string;
  email: string;
  favoriteSector: string;
  marketingConsent: boolean;
  termsAcceptedAt: string;
}

const STORAGE_KEY = 'podhale_fan_profile_v1';

function loadSavedProfile(): FanProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FanProfile) : null;
  } catch {
    return null;
  }
}

export function AccountSection() {
  const { points } = usePoints();
  const [profile, setProfile] = useState<FanProfile | null>(() => loadSavedProfile());
  const [mode, setMode] = useState<'register' | 'login'>('register');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteSector, setFavoriteSector] = useState('Sektor A — Młyn');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const cleanEmail = email.trim();
    const cleanName = name.trim() || cleanEmail.split('@')[0] || 'Kibic Szarotek';

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Podaj poprawny adres e-mail.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }

    if (mode === 'register' && !acceptTerms) {
      setErrorMsg('Aby założyć konto, zaakceptuj regulamin oraz politykę prywatności (RODO).');
      return;
    }

    const existing = loadSavedProfile();
    const nextProfile: FanProfile =
      mode === 'login' && existing && existing.email.toLowerCase() === cleanEmail.toLowerCase()
        ? existing
        : {
            name: cleanName,
            email: cleanEmail,
            favoriteSector,
            marketingConsent,
            termsAcceptedAt: existing?.termsAcceptedAt || new Date().toISOString(),
          };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    } catch {
      // ignorujemy błąd pamięci lokalnej w trybie prywatnym
    }

    setProfile(nextProfile);
    setPassword('');
    setInfoMsg(
      mode === 'register'
        ? 'Konto kibica zostało utworzone i zgody zostały zapisane.'
        : 'Zalogowano pomyślnie.'
    );
  };

  const handleToggleMarketing = () => {
    if (!profile) return;
    const updated: FanProfile = {
      ...profile,
      marketingConsent: !profile.marketingConsent,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignorujemy błąd pamięci lokalnej
    }
    setProfile(updated);
    setInfoMsg('Zaktualizowano ustawienia zgody marketingowej.');
  };

  const handleLogout = () => {
    setProfile(null);
    setInfoMsg('Wylogowano z konta.');
  };

  if (profile) {
    return (
      <div className="space-y-4 pb-24">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Konto Kibica
                </div>
                <h1 className="text-lg font-bold text-white leading-tight">{profile.name}</h1>
                <p className="text-xs text-white/60">{profile.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Wyloguj
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/10">
            <div className="rounded-xl bg-navy-900/60 p-3 border border-white/5">
              <div className="text-[11px] text-white/55">Twoje punkty</div>
              <div className="text-xl font-bold text-gold-400 mt-0.5">{points} pkt</div>
            </div>
            <div className="rounded-xl bg-navy-900/60 p-3 border border-white/5">
              <div className="text-[11px] text-white/55">Ulubione miejsce</div>
              <div className="text-xs font-semibold text-white mt-1.5">{profile.favoriteSector}</div>
            </div>
          </div>
        </div>

        {infoMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{infoMsg}</span>
          </div>
        )}

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <h2 className="text-sm font-bold text-white">Zgody RODO i prywatność</h2>
          </div>

          <p className="text-xs text-white/65 leading-relaxed">
            Regulamin i polityka prywatności zaakceptowane:{' '}
            <span className="text-white/90 font-medium">
              {new Date(profile.termsAcceptedAt).toLocaleDateString('pl-PL')}
            </span>
            . W każdej chwili możesz zmienić zgodę komunikacyjną lub poprosić o usunięcie konta.
          </p>

          <label className="flex items-start justify-between gap-3 pt-2 border-t border-white/10 cursor-pointer">
            <div className="text-xs">
              <div className="font-medium text-white">Zgoda marketingowa i newsy klubowe</div>
              <div className="text-white/55 mt-0.5">
                Informacje o biletach, promocjach, konkursach i ofertach partnerów klubu.
              </div>
            </div>
            <input
              type="checkbox"
              checked={profile.marketingConsent}
              onChange={handleToggleMarketing}
              className="mt-1 h-4 w-4 accent-gold-400 rounded cursor-pointer shrink-0"
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Moje konto kibica</h1>
        <p className="text-xs text-white/60 mt-0.5">
          Załóż konto, aby zapisywać punkty, Kartę Kibica i ustawienia powiadomień
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setErrorMsg(null);
          }}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
            mode === 'register'
              ? 'bg-gold-400 text-navy-900'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          Rejestracja
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setErrorMsg(null);
          }}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
            mode === 'login'
              ? 'bg-gold-400 text-navy-900'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          Logowanie
        </button>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3.5">
        {mode === 'register' && (
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1">
              Imię lub pseudonim kibica
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="np. Góral z Nowego Targu"
              className="w-full px-3 py-2.5 rounded-xl bg-navy-900/70 border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-gold-400"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Adres e-mail</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kibic@podhale.pl"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-900/70 border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Hasło</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 znaków"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-900/70 border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {mode === 'register' && (
          <>
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1">
                Twój sektor na hali
              </label>
              <select
                value={favoriteSector}
                onChange={(e) => setFavoriteSector(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-navy-900/70 border border-white/10 text-sm text-white focus:outline-none focus:border-gold-400"
              >
                <option value="Sektor A — Młyn">Sektor A — Młyn</option>
                <option value="Sektor B — Trybuna główna">Sektor B — Trybuna główna</option>
                <option value="Sektor rodzinny">Sektor rodzinny</option>
                <option value="Kibic wyjazdowy / online">Kibic wyjazdowy / online</option>
              </select>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zgody i informacja RODO
              </div>

              <p className="text-[11px] text-white/55 leading-relaxed">
                Administratorem danych jest podmiot prowadzący aplikację klubu Podhale Nowy Targ.
                Dane przetwarzamy w celu obsługi konta kibica, programu lojalnościowego oraz
                informacji meczowych (art. 6 ust. 1 lit. b oraz lit. a RODO). Zgodę można wycofać w
                dowolnym momencie w zakładce konta.
              </p>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-gold-400 rounded cursor-pointer shrink-0"
                />
                <span className="text-xs text-white/85 leading-snug">
                  Akceptuję <span className="underline">regulamin aplikacji</span> oraz zapoznałem/-am
                  się z <span className="underline">polityką prywatności (RODO)</span>. *
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-gold-400 rounded cursor-pointer shrink-0"
                />
                <span className="text-xs text-white/75 leading-snug">
                  Wyrażam dobrowolną zgodę na otrzymywanie informacji o biletach, promocjach i
                  wydarzeniach klubowych (zgoda opcjonalna).
                </span>
              </label>
            </div>
          </>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-400/30 text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-200">
            {infoMsg}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-navy-900 font-bold text-sm transition-colors"
        >
          {mode === 'register' ? 'Załóż konto kibica' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
}
