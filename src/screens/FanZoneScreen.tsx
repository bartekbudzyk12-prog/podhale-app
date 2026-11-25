import { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Trophy, Check, Sparkles, Vote } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { FanPoll } from '@/components/FanPoll';
import { MVP_CANDIDATES, FIRST_GOAL_SCORERS } from '@/lib/data';
import { usePoints } from '@/lib/points';
import { supabase } from '@/lib/supabase';

interface VoteCounts {
  [id: string]: number;
}

export function FanZoneScreen() {
  const { addPoints } = usePoints();
  const [homeScore, setHomeScore] = useState(3);
  const [awayScore, setAwayScore] = useState(2);
  const [firstScorer, setFirstScorer] = useState(FIRST_GOAL_SCORERS[0]);
  const [submitted, setSubmitted] = useState(false);

  const [votes, setVotes] = useState<VoteCounts>({});
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVotes = useCallback(async () => {
    const { data } = await supabase.from('mvp_votes').select('player_id');
    const counts: VoteCounts = {};
    (data || []).forEach(r => { counts[r.player_id] = (counts[r.player_id] || 0) + 1; });
    setVotes(counts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVotes();
    const channel = supabase
      .channel('mvp_votes_live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mvp_votes' }, () => fetchVotes())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchVotes]);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0) || 1;

  const submitTyper = () => {
    setSubmitted(true);
    addPoints(150);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const castVote = async (id: string, name: string) => {
    if (voted === id) return;
    setVoted(id);
    await supabase.from('mvp_votes').insert({ player_id: id, player_name: name });
  };

  return (
    <div className="px-4 pt-5 pb-28 space-y-5">
      <div>
        <h1 className="font-display text-2xl uppercase tracking-wide text-white">Strefa Kibica</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">Typer & MVP — udowodnij, że znasz Szarotki</p>
      </div>

      {/* Typer */}
      <div className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-gold-400" />
          <h2 className="font-display text-base uppercase tracking-wide text-white">Typer Kibica</h2>
          <Badge text="+150 Szarotek" color="gold" size="sm" />
        </div>

        <p className="text-[11px] text-gray-400 mb-3">Podhale NT vs Polonia Bytom • 27.11.2026</p>

        {/* Score picker */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex-1 text-center">
            <p className="text-[10px] text-gold-400 font-semibold uppercase mb-2">Podhale</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setHomeScore(v => Math.max(0, v - 1))} className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition-transform">
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="text-4xl font-display tabular text-white w-12 text-center">{homeScore}</span>
              <button onClick={() => setHomeScore(v => Math.min(20, v + 1))} className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition-transform">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <span className="font-display text-xl text-gray-600 pt-5">:</span>
          <div className="flex-1 text-center">
            <p className="text-[10px] text-red-300 font-semibold uppercase mb-2">Bytom</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setAwayScore(v => Math.max(0, v - 1))} className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition-transform">
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="text-4xl font-display tabular text-white w-12 text-center">{awayScore}</span>
              <button onClick={() => setAwayScore(v => Math.min(20, v + 1))} className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition-transform">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* First scorer dropdown */}
        <div className="mb-4">
          <label className="text-[11px] text-gray-400 uppercase tracking-wider block mb-2">Pierwszy strzelec bramki</label>
          <div className="relative">
            <select
              value={firstScorer}
              onChange={e => setFirstScorer(e.target.value)}
              className="w-full bg-navy-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none cursor-pointer focus:border-gold-400/50 outline-none"
            >
              {FIRST_GOAL_SCORERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={submitTyper}
          disabled={submitted}
          className={`w-full py-3.5 rounded-xl font-bold transition-all active:scale-95 ${submitted ? 'bg-green-500 text-white' : 'bg-gold-400 text-navy-900 hover:bg-gold-300 glow-gold'}`}
        >
          {submitted ? (
            <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Typ wysłany! +150 Szarotek</span>
          ) : (
            <span className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Wyślij typ</span>
          )}
        </button>
      </div>

      {/* MVP Voting */}
      <div className="glass rounded-3xl p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 text-red-400" />
            <h2 className="font-display text-base uppercase tracking-wide text-white">Głosowanie MVP</h2>
          </div>
          <span className="text-[11px] text-gray-400 tabular">{totalVotes > 1 ? totalVotes : 0} głosów</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-4">Najlepszy zawodnik meczu — głosuj na żywo</p>

        <div className="space-y-3">
          {MVP_CANDIDATES.map(c => {
            const count = votes[c.id] || 0;
            const pct = totalVotes > 1 ? Math.round((count / totalVotes) * 100) : 0;
            const isVoted = voted === c.id;
            return (
              <button
                key={c.id}
                onClick={() => castVote(c.id, c.name)}
                disabled={!!voted}
                className={`relative w-full text-left rounded-2xl overflow-hidden transition-all active:scale-[0.98] ${isVoted ? 'ring-2 ring-gold-400' : 'glass'}`}
              >
                <div className="flex items-center gap-3 p-3.5 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display text-lg shrink-0 ${isVoted ? 'bg-gold-400 text-navy-900' : 'bg-white/10 text-white'}`}>
                    #{c.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                      <span className="text-sm">{c.flag}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{c.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isVoted ? 'bg-gold-400' : 'bg-gradient-to-r from-navy-400 to-gold-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold tabular text-white w-9 text-right">{pct}%</span>
                    </div>
                  </div>
                  {isVoted && <Check className="w-5 h-5 text-gold-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {voted && (
          <p className="text-center text-[11px] text-gold-400 mt-3 animate-fade-in">Dziękujemy za głos! Wyniki aktualizują się na żywo.</p>
        )}
        {voted && (
          <button onClick={() => setVoted(null)} className="w-full mt-2 text-[11px] text-gray-500 underline">Zmień głos</button>
        )}
        {loading && <p className="text-center text-[11px] text-gray-500 mt-3">Ładowanie głosów...</p>}
      </div>

      {/* Fan Poll */}
      <FanPoll />
    </div>
  );
}
