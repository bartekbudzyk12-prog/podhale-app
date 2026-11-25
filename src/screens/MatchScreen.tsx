import { useState, useEffect } from 'react';
import { Ticket, ClipboardList, Radio, Zap, Clock, Calendar, Trophy, TrendingUp, ChevronRight, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { MatchLineupView } from '@/components/MatchLineupView';
import { NEWS, FIXTURES, RESULTS, STANDINGS, TICKET_URL } from '@/lib/data';

const NEXT_MATCH_DATE = new Date('2026-11-27T18:00:00+01:00');

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const clamped = Math.max(0, diff);
  const d = Math.floor(clamped / 86400000);
  const h = Math.floor((clamped % 86400000) / 3600000);
  const m = Math.floor((clamped % 3600000) / 60000);
  const s = Math.floor((clamped % 60000) / 1000);
  return { d, h, m, s, done: diff <= 0 };
}

export function MatchScreen() {
  const { d, h, m, s, done } = useCountdown(NEXT_MATCH_DATE);
  const [lineupOpen, setLineupOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [standingsOpen, setStandingsOpen] = useState(false);

  return (
    <div className="px-4 pt-3 pb-28 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <Logo size={48} />
        <div className="flex-1">
          <h1 className="font-display text-xl leading-none uppercase tracking-wide text-white">Podhale Nowy Targ</h1>
          <p className="text-[11px] text-gold-400 font-semibold tracking-wider mt-1">SZAROTKI</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge text="19x Mistrz Polski" color="gold" size="md" />
        <Badge text="THL 2026/27" color="red" size="md" />
      </div>

      {/* Hero Match Card */}
      <div className="relative overflow-hidden rounded-3xl glass-gold p-5 mt-2">
        <div className="absolute inset-0 shimmer-bg animate-shimmer pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">THL - Kolejka 22</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1"><Radio className="w-3 h-3" /> 27.11 - 18:00</span>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl glass border-gold-400/30 flex items-center justify-center mb-2">
                <Logo size={38} />
              </div>
              <p className="font-display text-sm uppercase text-white">Podhale</p>
              <p className="text-[10px] text-gray-400">Nowy Targ</p>
            </div>
            <div className="px-3">
              <p className="font-display text-2xl text-gold-400">VS</p>
              <p className="text-[9px] text-gray-500 uppercase mt-1">{done ? 'LIVE' : 'ZA CHWILE'}</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl glass border-red-400/20 flex items-center justify-center mb-2">
                <span className="font-display text-xl text-red-300">PB</span>
              </div>
              <p className="font-display text-sm uppercase text-white">Polonia</p>
              <p className="text-[10px] text-gray-400">Bytom</p>
            </div>
          </div>

          <div className="text-center mb-3">
            <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider flex items-center justify-center gap-1"><MapPin className="w-3 h-3 text-gold-400" /> Miejska Hala Lodowa, Nowy Targ</p>
            {!done ? (
              <div className="flex items-center justify-center gap-2 tabular">
                {[
                  { v: d, l: 'dni' },
                  { v: h, l: 'godz' },
                  { v: m, l: 'min' },
                  { v: s, l: 'sek' },
                ].map((u, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white bg-white/5 rounded-lg px-2.5 py-1 min-w-[44px] text-center">
                      {String(u.v).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] text-gray-500 uppercase mt-1">{u.l}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl font-display text-red-400 animate-pulse">Mecz trwa</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-900 font-bold py-3 rounded-xl transition-all active:scale-95 glow-gold"
            >
              <Ticket className="w-4 h-4" /> KUP BILET
            </a>
            <button
              type="button"
              onClick={() => setLineupOpen(true)}
              className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-300 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
            >
              <ClipboardList className="w-4 h-4" aria-hidden="true" /> SKŁAD NA MECZ
            </button>
          </div>
        </div>
      </div>

      {/* Quick access: Schedule / Results / Standings */}
      <div className="grid grid-cols-3 gap-2.5">
        <button onClick={() => setScheduleOpen(true)} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
          <Calendar className="w-5 h-5 text-gold-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">Terminarz</span>
        </button>
        <button onClick={() => setResultsOpen(true)} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
          <Trophy className="w-5 h-5 text-red-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">Wyniki</span>
        </button>
        <button onClick={() => setStandingsOpen(true)} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
          <TrendingUp className="w-5 h-5 text-gold-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">Tabela</span>
        </button>
      </div>

      {/* News */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base uppercase tracking-wide text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold-400" /> Aktualnosci Klubu
          </h2>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </div>
        <div className="space-y-2.5">
          {NEWS.map((n, i) => (
            <div key={i} className="glass rounded-2xl p-3.5 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`shrink-0 px-2 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${n.tagColor === 'gold' ? 'bg-gold-400/15 text-gold-300 border-gold-400/30' : 'bg-red-400/15 text-red-200 border-red-400/30'}`}>
                  {n.tag}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-gray-100 leading-snug">{n.text}</p>
                  <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      <Modal open={scheduleOpen} onClose={() => setScheduleOpen(false)} title="Terminarz 2026/27">
        <div className="p-3 space-y-2">
          {FIXTURES.map((f) => (
            <div key={f.id} className={`glass rounded-xl p-3 flex items-center gap-3 ${f.id === 'f1' ? 'ring-1 ring-gold-400/40' : ''}`}>
              <div className="text-center shrink-0 w-12">
                <p className="text-[11px] font-bold text-gold-400 tabular">{f.date}</p>
                {f.time !== '-' && <p className="text-[9px] text-gray-500 tabular">{f.time}</p>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-white truncate">
                  <span className={f.isHome ? 'font-semibold' : 'text-gray-300'}>{f.home}</span>
                  <span className="text-gray-500 mx-1.5">-</span>
                  <span className={!f.isHome ? 'font-semibold' : 'text-gray-300'}>{f.away}</span>
                </p>
                <p className="text-[9px] text-gray-500 mt-0.5">
                  {f.isHome ? 'Dom' : 'Wyjazd'} | {f.id === 'f1' ? 'Najblizszy mecz' : ''}
                </p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${f.isHome ? 'bg-gold-400/15 text-gold-300' : 'bg-navy-400/15 text-navy-100'}`}>
                {f.isHome ? 'DOM' : 'WYJ'}
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Results Modal */}
      <Modal open={resultsOpen} onClose={() => setResultsOpen(false)} title="Wyniki - Ostatnie mecze">
        <div className="p-3 space-y-2">
          {RESULTS.map((r) => {
            const isPodhaleHome = r.home === 'Podhale';
            const podhaleScore = isPodhaleHome ? r.homeScore : r.awayScore;
            const oppScore = isPodhaleHome ? r.awayScore : r.homeScore;
            return (
              <div key={r.id} className="glass rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-gray-500 tabular">{r.date} | {r.time}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-400/15 text-red-300 font-bold uppercase">P</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <p className={`text-[13px] ${isPodhaleHome ? 'text-gold-400 font-semibold' : 'text-gray-300'}`}>{r.home}</p>
                  </div>
                  <div className="px-3 flex items-center gap-1.5">
                    <span className={`text-lg font-display tabular ${podhaleScore > oppScore ? 'text-green-400' : podhaleScore < oppScore ? 'text-red-300' : 'text-white'}`}>{r.homeScore}</span>
                    <span className="text-gray-600 text-sm">:</span>
                    <span className={`text-lg font-display tabular ${podhaleScore < oppScore ? 'text-green-400' : podhaleScore > oppScore ? 'text-red-300' : 'text-white'}`}>{r.awayScore}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-[13px] ${!isPodhaleHome ? 'text-gold-400 font-semibold' : 'text-gray-300'}`}>{r.away}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Standings Modal */}
      <Modal open={standingsOpen} onClose={() => setStandingsOpen(false)} title="Tabela THL 2026/27">
        <div className="p-3">
          <div className="glass rounded-xl overflow-hidden">
            <div className="grid grid-cols-[24px_1fr_28px_28px_28px_52px_36px] gap-1 px-2.5 py-2 text-[8px] uppercase tracking-wider text-gray-500 font-semibold border-b border-white/5">
              <span>#</span>
              <span>Druzyna</span>
              <span className="text-center">M</span>
              <span className="text-center">W</span>
              <span className="text-center">P</span>
              <span className="text-center">Bramki</span>
              <span className="text-center">Pkt</span>
            </div>
            {STANDINGS.map(row => (
              <div
                key={row.pos}
                className={`grid grid-cols-[24px_1fr_28px_28px_28px_52px_36px] gap-1 px-2.5 py-2.5 items-center text-[11px] border-b border-white/5 ${row.isPodhale ? 'bg-gold-400/10' : ''}`}
              >
                <span className={`font-bold tabular ${row.isPodhale ? 'text-gold-400' : 'text-gray-400'}`}>{row.pos}</span>
                <span className={`truncate ${row.isPodhale ? 'text-gold-300 font-semibold' : 'text-gray-200'}`}>{row.team}</span>
                <span className="text-center text-gray-400 tabular">{row.m}</span>
                <span className="text-center text-gray-400 tabular">{row.w}</span>
                <span className="text-center text-gray-400 tabular">{row.p}</span>
                <span className="text-center text-gray-500 tabular text-[10px]">{row.goals}</span>
                <span className={`text-center font-bold tabular ${row.isPodhale ? 'text-gold-400' : 'text-white'}`}>{row.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Match Lineup Modal */}
      <Modal open={lineupOpen} onClose={() => setLineupOpen(false)} title="SKŁAD NA MECZ">
        <MatchLineupView />
      </Modal>
    </div>
  );
}
