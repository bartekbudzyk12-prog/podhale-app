import { useState, useMemo } from 'react';
import { Shield, Target, Users, Star, Flame } from 'lucide-react';
import { PLAYERS, type Player } from '@/lib/data';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';

const FILTERS = ['Wszyscy', 'Bramkarze', 'Obrońcy', 'Napastnicy'] as const;
type Filter = typeof FILTERS[number];

const POS_ICON = { 'Bramkarz': Shield, 'Obrońca': Shield, 'Napastnik': Target };

function ratingColor(r: number): string {
  if (r >= 87) return 'text-gold-400';
  if (r >= 82) return 'text-green-400';
  if (r >= 78) return 'text-blue-400';
  return 'text-gray-400';
}

export function TeamScreen() {
  const [filter, setFilter] = useState<Filter>('Wszyscy');
  const [selected, setSelected] = useState<Player | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'Wszyscy') return PLAYERS;
    const map: Record<string, Player['position']> = { 'Bramkarze': 'Bramkarz', 'Obrońcy': 'Obrońca', 'Napastnicy': 'Napastnik' };
    return PLAYERS.filter(p => p.position === map[filter]);
  }, [filter]);

  return (
    <div className="px-4 pt-5 pb-28 space-y-4">
      <div>
        <h1 className="font-display text-2xl uppercase tracking-wide text-white">Drużyna 2026/27</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">Skład Szarotek na sezon 2026/27</p>
      </div>

      {/* Coach banner */}
      <div className="glass-gold rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-gold-400" />
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Sztab Szkoleniowy</span>
        </div>
        <p className="text-sm text-white font-medium">Trener główny: <span className="text-gold-300">Andrzej Świstak</span></p>
        <p className="text-[12px] text-gray-400 mt-0.5">Asystenci: Marcin Kolusz, Marek Batkiewicz</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all active:scale-95 ${filter === f ? 'bg-gold-400 text-navy-900' : 'glass text-gray-400'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Player cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(p => {
          const Icon = POS_ICON[p.position];
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="relative rounded-2xl overflow-hidden glass active:scale-95 transition-transform text-left"
            >
              <div className="absolute inset-0 shimmer-bg opacity-40 pointer-events-none" />
              <div className="relative p-3.5">
                {/* Top row: rating + number */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-display font-bold leading-none ${ratingColor(p.rating)}`}>{p.rating}</span>
                    <span className="text-[7px] text-gray-500 uppercase tracking-wider mt-0.5">OVR</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-xl text-white leading-none">#{p.number}</span>
                    <span className="text-[8px] text-gray-500 uppercase mt-0.5">{p.position}</span>
                  </div>
                </div>

                {/* Position icon center */}
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-500/50 to-navy-700 border border-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-400/70" />
                  </div>
                </div>

                {/* Name */}
                <p className="text-[13px] font-semibold text-white text-center leading-tight truncate">{p.name}</p>
                <p className="text-[10px] text-gray-400 text-center mt-0.5">{p.flag} {p.nationality}</p>

                {p.role && (
                  <div className="flex justify-center mt-2">
                    <Badge text={p.role === 'Kapitan' ? 'C — Kapitan' : p.role} color="gold" size="sm" />
                  </div>
                )}

                {/* Stats footer */}
                <div className="flex items-center justify-around mt-3 pt-2.5 border-t border-white/5">
                  <div className="text-center">
                    <p className="text-[9px] text-gray-500 uppercase">G</p>
                    <p className="text-sm font-bold tabular text-white">{p.goals}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-gray-500 uppercase">A</p>
                    <p className="text-sm font-bold tabular text-white">{p.assists}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-gray-500 uppercase">Pkt</p>
                    <p className="text-sm font-bold tabular text-gold-400">{p.points}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Player detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Karta Zawodnika">
        {selected && (
          <div className="p-5">
            <div className="relative rounded-2xl overflow-hidden holo-card p-4 border border-gold-400/20 mb-4">
              <div className="absolute inset-0 shimmer-bg opacity-50 pointer-events-none" />
              <div className="relative flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-red-400 flex items-center justify-center text-navy-900 font-display text-3xl shrink-0">
                  #{selected.number}
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl uppercase text-white leading-tight">{selected.name}</p>
                  <p className="text-[12px] text-gold-400 mt-1">{selected.flag} {selected.nationality}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-400 uppercase">{selected.position}</span>
                    {selected.role && <Badge text={selected.role} color="gold" size="sm" />}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-display font-bold ${ratingColor(selected.rating)}`}>{selected.rating}</p>
                  <p className="text-[8px] text-gray-500 uppercase">OVR</p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Bramki', value: selected.goals, icon: Target, color: 'text-gold-400' },
                { label: 'Asysty', value: selected.assists, icon: Users, color: 'text-white' },
                { label: 'Punkty (G+A)', value: selected.points, icon: Star, color: 'text-gold-400' },
                { label: 'Mecze', value: selected.matches, icon: Shield, color: 'text-white' },
                { label: 'Wiek', value: selected.age, icon: Users, color: 'text-white' },
                { label: 'Kary (min)', value: selected.pim, icon: Flame, color: 'text-red-300' },
                { label: 'Śr. na mecz', value: (selected.points / Math.max(1, selected.matches)).toFixed(2), icon: Target, color: 'text-gold-400' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="glass rounded-xl p-3 flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${s.color}`} />
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider">{s.label}</p>
                      <p className={`text-lg font-bold tabular ${s.color}`}>{s.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 glass rounded-xl p-3 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Forma zawodnika</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={`w-2 h-2 rounded-full ${n <= Math.round(selected.rating / 20) ? 'bg-gold-400' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            <button onClick={() => setSelected(null)} className="w-full mt-4 py-3 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform">
              Zamknij
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
