import { useState, useEffect, useMemo } from 'react';
import { Ticket, ClipboardList, Radio, Zap, Clock, Calendar, Trophy, TrendingUp, ChevronRight, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { MatchLineupView } from '@/components/MatchLineupView';
import { readLiveScore, type LiveScoreState } from '@/screens/AdminScreen';
import { NEWS, FIXTURES, RESULTS, STANDINGS, TICKET_URL, type Fixture } from '@/lib/data';

const MATCH_DURATION_MS = 3 * 60 * 60 * 1000;

function parseFixtureDate(fixture: Fixture): Date | null {
  const [dayStr, monthStr] = fixture.date.split('.');
  const day = Number(dayStr);
  const month = Number(monthStr);
  if (!day || !month) return null;

  const year = month >= 8 ? 2026 : 2027;

  let hours = 18;
  let minutes = 0;
  if (fixture.time && fixture.time !== '—' && fixture.time !== '-') {
    const [hStr, mStr] = fixture.time.split(':');
    const hNum = Number(hStr);
    const mNum = Number(mStr);
    if (!Number.isNaN(hNum)) hours = hNum;
    if (!Number.isNaN(mNum)) minutes = mNum;
  }

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function getTeamShort(teamName: string): string {
  const clean = teamName.replace(/\b(KS|BS|ECZD|JKH|GKS|KH|STS|Comarch|Unia)\b/gi, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase() || 'RYW';
}

function useActiveMatch(fixtures: Fixture[]) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  return useMemo(() => {
    const scheduled = fixtures
      .map((fixture, index) => ({
        fixture,
        index,
        startDate: parseFixtureDate(fixture),
      }))
      .filter((item): item is { fixture: Fixture; index: number; startDate: Date } => item.startDate !== null);

    const liveMatch = scheduled.find(
      item => now >= item.startDate.getTime() && now <= item.startDate.getTime() + MATCH_DURATION_MS,
    );

    if (liveMatch) {
      const elapsedMinutes = Math.max(1, Math.floor((now - liveMatch.startDate.getTime()) / 60000));
      return {
        fixture: liveMatch.fixture,
        roundNumber: 22 + liveMatch.index,
        startDate: liveMatch.startDate,
        isLive: true,
        elapsedMinutes,
        countdown: { d: 0, h: 0, m: 0, s: 0 },
      };
    }

    const upcoming = scheduled.find(item => item.startDate.getTime() > now) || scheduled[scheduled.length - 1];
    const diff = Math.max(0, upcoming.startDate.getTime() - now);

    return {
      fixture: upcoming.fixture,
      roundNumber: 22 + upcoming.index,
      startDate: upcoming.startDate,
      isLive: false,
      elapsedMinutes: 0,
      countdown: {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      },
    };
  }, [fixtures, now]);
}

interface MatchScreenProps {
  liveScore?: LiveScoreState;
}

export function MatchScreen({ liveScore: propLiveScore }: MatchScreenProps) {
  const { fixture, roundNumber, isLive, elapsedMinutes, countdown } = useActiveMatch(FIXTURES);
  const { d, h, m, s } = countdown;

  const [localLiveScore, setLocalLiveScore] = useState<LiveScoreState>(() => readLiveScore());
  const [lineupOpen, setLineupOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [standingsOpen, setStandingsOpen] = useState(false);

  useEffect(() => {
    const syncScore = (e: Event) => {
      const custom = e as CustomEvent<LiveScoreState>;
      if (custom.detail) {
        setLocalLiveScore(custom.detail);
      } else {
        setLocalLiveScore(readLiveScore());
      }
    };
    window.addEventListener('podhale-live-score-change', syncScore);
    window.addEventListener('storage', syncScore);
    return () => {
      window.removeEventListener('podhale-live-score-change', syncScore);
      window.removeEventListener('storage', syncScore);
    };
  }, []);

  const activeLiveScore = propLiveScore ?? localLiveScore;
  const showLiveScore = Boolean(activeLiveScore?.active);
  const opponentShort = getTeamShort(fixture.opponent);
  const venueLabel = fixture.isHome ? 'Miejska Hala Lodowa, Nowy Targ' : `Wyjazd • ${fixture.opponent}`;
  const timeLabel = fixture.time && fixture.time !== '—' ? `${fixture.date} - ${fixture.time}` : fixture.date;

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
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
              THL - Kolejka {roundNumber}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
              <Radio className="w-3 h-3" /> {timeLabel}
            </span>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl glass border-gold-400/30 flex items-center justify-center mb-2">
                <Logo size={38} />
              </div>
              <p className="font-display text-sm uppercase text-white">Podhale</p>
              <p className="text-[10px] text-gray-400">Nowy Targ</p>
            </div>
            <div className="px-3 text-center">
              {showLiveScore ? (
                <>
                  <p className="font-display text-3xl tabular text-white">
                    {activeLiveScore.homeScore} <span className="text-gold-400">:</span> {activeLiveScore.awayScore}
                  </p>
                  <p className="text-[9px] text-red-300 uppercase mt-1 font-semibold">{activeLiveScore.period}</p>
                </>
              ) : (
                <>
                  <p className="font-display text-2xl text-gold-400">VS</p>
                  <p className="text-[9px] text-gray-500 uppercase mt-1">{isLive ? 'LIVE' : 'ZA CHWILE'}</p>
                </>
              )}
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl glass border-red-400/20 flex items-center justify-center mb-2">
                <span className="font-display text-xl text-red-300">{opponentShort}</span>
              </div>
              <p className="font-display text-sm uppercase text-white truncate">{fixture.opponent}</p>
              <p className="text-[10px] text-gray-400">{fixture.isHome ? 'Gość' : 'Gospodarz'}</p>
            </div>
          </div>

          <div className="text-center mb-3">
            <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-gold-400" /> {venueLabel}
            </p>
            {showLiveScore ? (
              <div className="space-y-1">
                <p className="text-lg font-display text-red-400 uppercase">{activeLiveScore.period}</p>
                <p className="text-[11px] text-gray-300 tabular">
                  Wynik na żywo • Podhale {activeLiveScore.homeScore} : {activeLiveScore.awayScore} {fixture.opponent}
                </p>
              </div>
            ) : !isLive ? (
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
              <div className="space-y-1">
                <p className="text-2xl font-display text-red-400 animate-pulse">Mecz trwa</p>
                <p className="text-[11px] text-gray-300 tabular">
                  Ok. {elapsedMinutes}. min od rozpoczęcia • Wynik na żywo w relacji / hali
                </p>
              </div>
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
          {NEWS.
