import { useState, useEffect, useCallback } from 'react';
import { BarChart3, Check } from 'lucide-react';
import { POLLS, type Poll } from '@/lib/data';
import { supabase } from '@/lib/supabase';

interface VoteCounts {
  [optionId: string]: number;
}

export function FanPoll() {
  const [activePoll, setActivePoll] = useState<Poll>(POLLS[0]);
  const [votes, setVotes] = useState<VoteCounts>({});
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVotes = useCallback(async (pollId: string) => {
    const { data } = await supabase.from('poll_votes').select('option_id').eq('poll_id', pollId);
    const counts: VoteCounts = {};
    (data || []).forEach(r => { counts[r.option_id] = (counts[r.option_id] || 0) + 1; });
    setVotes(counts);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setVotedOption(null);
    fetchVotes(activePoll.id);
    const channel = supabase
      .channel(`poll_${activePoll.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'poll_votes', filter: `poll_id=eq.${activePoll.id}` }, () => fetchVotes(activePoll.id))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activePoll.id, fetchVotes]);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0) || 1;

  const castVote = async (optionId: string) => {
    if (votedOption) return;
    setVotedOption(optionId);
    await supabase.from('poll_votes').insert({ poll_id: activePoll.id, option_id: optionId });
  };

  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gold-400" />
          <h2 className="font-display text-base uppercase tracking-wide text-white">Ankieta Kibiców</h2>
        </div>
        <span className="text-[11px] text-gray-400 tabular">{totalVotes > 1 ? totalVotes : 0} głosów</span>
      </div>

      {/* Poll selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {POLLS.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePoll(p)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all active:scale-95 ${activePoll.id === p.id ? 'bg-gold-400 text-navy-900' : 'glass text-gray-400'}`}
          >
            {p.id === 'poll_song' ? 'Piosenka' : 'Atmosfera'}
          </button>
        ))}
      </div>

      <p className="text-[13px] text-white font-medium leading-snug mb-4">{activePoll.question}</p>

      <div className="space-y-2.5">
        {activePoll.options.map(o => {
          const count = votes[o.id] || 0;
          const pct = totalVotes > 1 ? Math.round((count / totalVotes) * 100) : 0;
          const isVoted = votedOption === o.id;
          const showResults = !!votedOption;
          return (
            <button
              key={o.id}
              onClick={() => castVote(o.id)}
              disabled={!!votedOption}
              className={`relative w-full text-left rounded-2xl overflow-hidden transition-all active:scale-[0.98] ${isVoted ? 'ring-2 ring-gold-400' : 'glass'} ${votedOption ? 'cursor-default' : 'hover:bg-white/10'}`}
            >
              {showResults && (
                <div
                  className={`absolute inset-0 transition-all duration-700 ${isVoted ? 'bg-gold-400/20' : 'bg-white/5'}`}
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center gap-3 p-3">
                <span className={`text-[13px] flex-1 ${showResults ? 'text-white' : 'text-gray-200'}`}>{o.label}</span>
                {showResults && (
                  <div className="flex items-center gap-2 shrink-0">
                    {isVoted && <Check className="w-4 h-4 text-gold-400" />}
                    <span className="text-xs font-bold tabular text-white w-9 text-right">{pct}%</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {votedOption && (
        <p className="text-center text-[11px] text-gold-400 mt-3 animate-fade-in">Dziękujemy za głos! Wyniki aktualizują się na żywo.</p>
      )}
      {loading && !votedOption && <p className="text-center text-[11px] text-gray-500 mt-3">Ładowanie ankiet...</p>}
    </div>
  );
}
