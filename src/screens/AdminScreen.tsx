import { useState, useEffect } from 'react';
import { Bell, Send, Users, Vote, TrendingUp, Zap, Megaphone, Activity, Plus, Minus, RotateCcw, Radio } from 'lucide-react';
import { PUSH_PRESETS } from '@/lib/data';

export const LIVE_SCORE_STORAGE_KEY = 'podhale_live_score_v1';

export type LivePeriod = '1. tercja' | '2. tercja' | '3. tercja' | 'Dogrywka' | 'Koniec meczu';

export interface LiveScoreState {
  active: boolean;
  homeScore: number;
  awayScore: number;
  period: LivePeriod;
  updatedAt: number;
}

export const DEFAULT_LIVE_SCORE: LiveScoreState = {
  active: false,
  homeScore: 0,
  awayScore: 0,
  period: '1. tercja',
  updatedAt: 0,
};

export function readLiveScore(): LiveScoreState {
  try {
    const raw = localStorage.getItem(LIVE_SCORE_STORAGE_KEY);
    if (!raw) return DEFAULT_LIVE_SCORE;
    const parsed = JSON.parse(raw) as Partial<LiveScoreState>;
    return {
      active: Boolean(parsed.active),
      homeScore: Math.max(0, Number(parsed.homeScore) || 0),
      awayScore: Math.max(0, Number(parsed.awayScore) || 0),
      period: parsed.period || '1. tercja',
      updatedAt: Number(parsed.updatedAt) || 0,
    };
  } catch {
    return DEFAULT_LIVE_SCORE;
  }
}

export function writeLiveScore(next: LiveScoreState): void {
  try {
    localStorage.setItem(LIVE_SCORE_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('podhale-live-score-change', { detail: next }));
  } catch {
    // Ignoruj błędy dostępu do localStorage
  }
}

const PERIODS: LivePeriod[] = ['1. tercja', '2. tercja', '3. tercja', 'Dogrywka', 'Koniec meczu'];

interface Props {
  pushHandler: (text: string) => void;
}

export function AdminScreen({ pushHandler }: Props) {
  const [message, setMessage] = useState('');
  const [sentCount, setSentCount] = useState(0);
  const [liveScore, setLiveScore] = useState<LiveScoreState>(() => readLiveScore());

  useEffect(() => {
    const onExternalChange = (e: Event) => {
      const custom = e as CustomEvent<LiveScoreState>;
      if (custom.detail) {
        setLiveScore(custom.detail);
      } else {
        setLiveScore(readLiveScore());
      }
    };
    window.addEventListener('podhale-live-score-change', onExternalChange);
    return () => window.removeEventListener('podhale-live-score-change', onExternalChange);
  }, []);

  const updateScore = (patch: Partial<LiveScoreState>) => {
    const next: LiveScoreState = {
      ...liveScore,
      ...patch,
      active: patch.active !== undefined ? patch.active : true,
      updatedAt: Date.now(),
    };
    setLiveScore(next);
    writeLiveScore(next);
  };

  const resetScore = () => {
    const next: LiveScoreState = { ...DEFAULT_LIVE_SCORE, updatedAt: Date.now() };
    setLiveScore(next);
    writeLiveScore(next);
  };

  const sendPush = (text: string) => {
    if (!text.trim()) return;
    pushHandler(text);
    setSentCount(c => c + 1);
  };

  return (
    <div className="px-4 pt-5 pb-28 space-y-5">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-red-400/20 text-red-300 text-[9px] font-bold uppercase border border-red-400/30">DEMO</span>
        <div>
          <h1 className="font-display text-2xl uppercase tracking-wide text-white">Panel Klubu</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">Wojciech Śniegowski — Prezes Zarządu</p>
        </div>
      </div>

      {/* Wynik na żywo */}
      <div className="glass rounded-2xl p-4 space-y-3.5 border border-gold-400/20">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-sm uppercase tracking-wide text-white flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-red-400"/> Wynik na żywo
          </h2>
          <button
            type="button"
            onClick={() => updateScore({ active: !liveScore.active })}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
              liveScore.active
                ? 'bg-red-500/25 text-red-300 border border-red-400/40'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            {liveScore.active ? 'LIVE AKTYWNY' : 'WYŁĄCZONY'}
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 py-1">
          <div className="flex-1 text-center">
            <p className="text-[10px] text-gold-400 font-semibold uppercase mb-1.5">Podhale</p>
            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => updateScore({ homeScore: Math.max(0, liveScore.homeScore - 1) })}
                className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Odejmij gola Podhalu"
              >
                <Minus className="w-3.5 h-3.5 text-white"/>
              </button>
              <span className="text-3xl font-display tabular text-white w-9 text-center">{liveScore.homeScore}</span>
              <button
                type="button"
                onClick={() => updateScore({ homeScore: liveScore.homeScore + 1 })}
                className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Dodaj gola Podhalu"
              >
                <Plus className="w-3.5 h-3.5 text-white"/>
              </button>
            </div>
          </div>

          <span className="font-display text-lg text-gray-500 pt-4">:</span>

          <div className="flex-1 text-center">
            <p className="text-[10px] text-red-300 font-semibold uppercase mb-1.5">Rywal</p>
            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => updateScore({ awayScore: Math.max(0, liveScore.awayScore - 1) })}
                className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Odejmij gola rywalowi"
              >
                <Minus className="w-3.5 h-3.5 text-white"/>
              </button>
              <span className="text-3xl font-display tabular text-white w-9 text-center">{liveScore.awayScore}</span>
              <button
                type="button"
                onClick={() => updateScore({ awayScore: liveScore.awayScore + 1 })}
                className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Dodaj gola rywalowi"
              >
                <Plus className="w-3.5 h-3.5 text-white"/>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Tercja / Status</p>
          <div className="flex flex-wrap gap-1.5">
            {PERIODS.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => updateScore({ period: p })}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  liveScore.period === p
                    ? 'bg-gold-400 text-navy-900'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <span className="text-[10px] text-gray-400">
            Widoczny na karcie meczu w zakładce Mecz
          </span>
          <button
            type="button"
            onClick={resetScore}
            className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white underline"
          >
            <RotateCcw className="w-3 h-3"/> Resetuj wynik
          </button>
        </div>
      </div>

      {/* Live metrics */}
      <div className="glass rounded-2xl p-4 space-y-3">
        <h2 className="font-display text-sm uppercase tracking-wide text-white flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-gold-400"/> Metryki na żywo
        </h2>
        {[
          { label: 'Sprzedane bilety (dziś)', value: '3 250', pct: 87 },
          { label: 'Aktywne Karty Kibica', value: '4 890', pct: 73 },
          { label: 'Typy kibiców (mecz)', value: '1 120', pct: 56 },
          { label: 'Odbite nagrody (mies.)', value: '218', pct: 42 },
        ].map((m, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-gray-400">{m.label}</span>
              <span className="font-bold tabular text-white">{m.value}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold-400 to-red-400 transition-all duration-700" style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Push simulator */}
      <div className="glass rounded-2xl p-4">
        <h2 className="font-display text-sm uppercase tracking-wide text-white flex items-center gap-2 mb-3">
          <Bell className="w-3.5 h-3.5 text-gold-400"/> Wyślij Powiadomienie Push
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Wpisz treść powiadomienia..."
            maxLength={120}
            className="flex-1 bg-navy-600 border border-white/10 rounded-xl px-3.5 py-3 text-[13px] text-white placeholder-gray-500 focus:border-gold-400/50 outline-none"
          />
          <button
            type="button"
            onClick={() => { sendPush(message); setMessage(''); }}
            disabled={!message.trim()}
            className="px-4 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform disabled:opacity-40"
          >
            <Send className="w-4 h-4"/>
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Szablony</p>
        <div className="space-y-2">
          {PUSH_PRESETS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendPush(p)}
              className="w-full text-left glass rounded-xl px-3.5 py-2.5 flex items-center gap-2 active:scale-[0.98] transition-transform"
            >
              <Megaphone className="w-3.5 h-3.5 text-gold-400 shrink-0"/>
              <span className="text-[12px] text-gray-200">{p}</span>
            </button>
          ))}
        </div>

        {sentCount > 0 && (
          <p className="text-[11px] text-green-400 mt-3 text-center">Wysłano {sentCount} powiadomień push do kibiców</p>
        )}
      </div>
    </div>
  );
}
