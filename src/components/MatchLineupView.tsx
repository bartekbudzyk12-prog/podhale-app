import { MapPin, Shield, Users } from 'lucide-react';
import { MATCH_LINEUP, type LineupPlayer } from '@/lib/matchLineup';

function PlayerChip({ player }: { player: LineupPlayer }) {
  return (
    <li className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-2.5 py-2 min-w-0">
      <span className="w-8 h-8 shrink-0 rounded-lg bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-xs font-bold tabular text-gold-400">
        {player.number}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-white truncate">
          {player.name}
          {player.captain && (
            <span
              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded bg-red-400 text-[9px] font-bold text-white align-middle"
              aria-label={player.captain === 'C' ? 'Kapitan' : 'Asystent kapitana'}
            >
              {player.captain}
            </span>
          )}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-gray-400">{player.position}</p>
      </div>
    </li>
  );
}

export function MatchLineupView() {
  const lineup = MATCH_LINEUP;

  return (
    <div className="p-5 space-y-5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-lg text-white">Podhale vs {lineup.opponent}</p>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              lineup.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gold-400/15 text-gold-400'
            }`}
          >
            {lineup.status === 'confirmed' ? 'Potwierdzony' : 'Przewidywany'}
          </span>
        </div>
        <p className="text-xs text-gray-400">{lineup.date}</p>
        <p className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
          {lineup.venue}
        </p>
      </div>

      <section aria-labelledby="lineup-goalies" className="space-y-2">
        <h3 id="lineup-goalies" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400">
          <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Bramkarze
        </h3>
        <ul className="grid grid-cols-2 gap-2">
          <PlayerChip player={lineup.goalies.starter} />
          {lineup.goalies.backup.map((g) => (
            <PlayerChip key={`${g.number}-${g.name}`} player={g} />
          ))}
        </ul>
        <p className="text-[10px] text-gray-500">Pierwszy od lewej rozpoczyna mecz w bramce.</p>
      </section>

      {lineup.units.map((unit) => (
        <section key={unit.label} aria-label={unit.label} className="glass rounded-2xl p-3 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-white">{unit.label}</h3>
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Atak</p>
            <ul className="grid grid-cols-1 gap-2">
              {unit.forwards.map((p) => (
                <PlayerChip key={`${p.number}-${p.name}`} player={p} />
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Obrona</p>
            <ul className="grid grid-cols-2 gap-2">
              {unit.defense.map((p) => (
                <PlayerChip key={`${p.number}-${p.name}`} player={p} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      {lineup.reserves.length > 0 && (
        <section aria-labelledby="lineup-reserves" className="space-y-2">
          <h3 id="lineup-reserves" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400">
            <Users className="w-3.5 h-3.5" aria-hidden="true" /> Rezerwa
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {lineup.reserves.map((p) => (
              <PlayerChip key={`${p.number}-${p.name}`} player={p} />
            ))}
          </ul>
        </section>
      )}

      <p className="text-[10px] text-gray-500 text-center">Trener: {lineup.coach}</p>
    </div>
  );
}
