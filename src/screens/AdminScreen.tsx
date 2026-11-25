import { useState } from 'react';
import { Bell, Send, Users, Vote, TrendingUp, Zap, Megaphone, Activity } from 'lucide-react';
import { PUSH_PRESETS } from '@/lib/data';

interface Props {
  pushHandler: (text: string) => void;
}

export function AdminScreen({ pushHandler }: Props) {
  const [message, setMessage] = useState('');
  const [sentCount, setSentCount] = useState(0);

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

      {/* Live metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gold-400" />
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Na hali</span>
          </div>
          <p className="text-3xl font-display tabular text-white">1 840</p>
          <p className="text-[10px] text-green-400 flex items-center gap-1 mt-1">
            <Activity className="w-2.5 h-2.5" /> Aktywni kibice
          </p>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Vote className="w-4 h-4 text-red-400" />
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Głosy MVP</span>
          </div>
          <p className="text-3xl font-display tabular text-white">942</p>
          <p className="text-[10px] text-green-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-2.5 h-2.5" /> +12% dziś
          </p>
        </div>
      </div>

      {/* Extra metrics */}
      <div className="glass rounded-2xl p-4 space-y-3">
        <h2 className="font-display text-sm uppercase tracking-wide text-white flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-gold-400" /> Metryki na żywo
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
          <Bell className="w-3.5 h-3.5 text-gold-400" /> Wyślij Powiadomienie Push
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
            onClick={() => { sendPush(message); setMessage(''); }}
            disabled={!message.trim()}
            className="px-4 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Szablony</p>
        <div className="space-y-2">
          {PUSH_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => sendPush(p)}
              className="w-full text-left glass rounded-xl px-3.5 py-2.5 flex items-center gap-2 active:scale-[0.98] transition-transform"
            >
              <Megaphone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
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
