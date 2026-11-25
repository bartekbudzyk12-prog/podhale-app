import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, BookOpen, ChevronDown } from 'lucide-react';
import { PLAYER_STATS, type PlayerStatRow, type PositionGroup } from '../lib/playerStats';

type SortKey = 'name' | 'position' | 'matches' | 'goals' | 'assists' | 'points' | 'pim' | 'plusMinus';
type SortDir = 'asc' | 'desc';

const FILTERS: { id: PositionGroup; label: string }[] = [
  { id: 'all', label: 'Wszyscy' },
  { id: 'forwards', label: 'Napastnicy' },
  { id: 'defense', label: 'Obrońcy' },
  { id: 'goalies', label: 'Bramkarze' },
];

const COLUMNS: { key: SortKey; label: string; title: string }[] = [
  { key: 'position', label: 'Poz.', title: 'Pozycja' },
  { key: 'matches', label: 'M', title: 'Mecze rozegrane' },
  { key: 'goals', label: 'G', title: 'Gole' },
  { key: 'assists', label: 'A', title: 'Asysty' },
  { key: 'points', label: 'P', title: 'Punkty (G + A)' },
  { key: 'pim', label: 'PIM', title: 'Minuty kar' },
  { key: 'plusMinus', label: '+/-', title: 'Bilans plus/minus' },
];

const POSITION_ORDER = { C: 0, LW: 1, RW: 2, D: 3, G: 4 } as const;

const GLOSSARY: { term: string; name: string; description: string }[] = [
  { term: 'M', name: 'Mecze', description: 'Liczba meczów rozegranych przez zawodnika w sezonie.' },
  { term: 'G', name: 'Gole', description: 'Liczba bramek strzelonych przez zawodnika.' },
  {
    term: 'A',
    name: 'Asysty',
    description:
      'Podanie lub zagranie, po którym padła bramka. Asystę mogą dostać maksymalnie dwaj zawodnicy, którzy jako ostatni dotknęli krążka przed strzelcem.',
  },
  {
    term: 'P',
    name: 'Punkty',
    description:
      'Punkty w klasyfikacji kanadyjskiej, czyli suma goli i asyst (G + A). Pokazują, ile zawodnik wnosi do ofensywy drużyny.',
  },
  {
    term: 'PIM',
    name: 'Penalty in Minutes',
    description:
      'Łączna liczba minut kar nałożonych na zawodnika, np. 2 minuty za podcięcie czy 5 minut za poważniejsze przewinienie.',
  },
  {
    term: '+/-',
    name: 'Bilans plus/minus',
    description:
      'Gdy drużyna strzela gola, a zawodnik jest na lodzie, dostaje +1. Gdy drużyna traci gola, dostaje -1. Liczą się tylko gole w równych siłach lub w osłabieniu, bez goli strzelonych w przewadze. Dodatni wynik oznacza, że przy zawodniku na lodzie drużyna częściej strzela, niż traci.',
  },
  {
    term: 'Poz.',
    name: 'Pozycja',
    description:
      'C - środkowy napastnik (center), LW - lewoskrzydłowy, RW - prawoskrzydłowy, D - obrońca, G - bramkarz.',
  },
];

function compareRows(a: PlayerStatRow, b: PlayerStatRow, key: SortKey): number {
  if (key === 'name') return a.name.localeCompare(b.name, 'pl');
  if (key === 'position') return POSITION_ORDER[a.position] - POSITION_ORDER[b.position];
  return a[key] - b[key];
}

function formatPlusMinus(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

export function StatsScreen() {
  const [filter, setFilter] = useState<PositionGroup>('all');
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const rows = useMemo(() => {
    const filtered = filter === 'all' ? PLAYER_STATS : PLAYER_STATS.filter((row) => row.group === filter);
    const direction = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const primary = compareRows(a, b, sortKey) * direction;
      if (primary !== 0) return primary;
      const byPoints = b.points - a.points;
      if (byPoints !== 0) return byPoints;
      return a.name.localeCompare(b.name, 'pl');
    });
  }, [filter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDir(key === 'name' || key === 'position' ? 'asc' : 'desc');
  };

  const ariaSort = (key: SortKey) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none';

  const SortIcon = sortDir === 'asc' ? ArrowUp : ArrowDown;

  return (
    <div className="space-y-4 pb-24">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Statystyki</h1>
        <p className="text-xs text-white/60 mt-0.5">
          Statystyki zawodników Podhala Nowy Targ, sezon 2026/27
        </p>
      </div>

      <div role="group" aria-label="Filtruj według pozycji" className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {FILTERS.map(({ id, label }) => {
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                active
                  ? 'bg-gold-400 text-navy-900 border-gold-400'
                  : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] text-xs tabular-nums">
            <caption className="sr-only">
              Tabela statystyk zawodników. Kliknij nagłówek kolumny, aby posortować.
            </caption>
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th
                  scope="col"
                  aria-sort={ariaSort('name')}
                  className="sticky left-0 z-10 bg-navy-700 text-left font-semibold"
                >
                  <button
                    type="button"
                    onClick={() => handleSort('name')}
                    className={`flex items-center gap-1 px-3 py-2.5 w-full uppercase tracking-wide ${
                      sortKey === 'name' ? 'text-gold-400' : 'hover:text-white'
                    }`}
                  >
                    Zawodnik
                    {sortKey === 'name' && <SortIcon className="w-3 h-3" aria-hidden="true" />}
                  </button>
                </th>
                {COLUMNS.map(({ key, label, title }) => (
                  <th key={key} scope="col" aria-sort={ariaSort(key)} className="font-semibold">
                    <button
                      type="button"
                      onClick={() => handleSort(key)}
                      title={title}
                      aria-label={`Sortuj: ${title}`}
                      className={`flex items-center justify-center gap-0.5 px-2 py-2.5 w-full ${
                        sortKey === key ? 'text-gold-400' : 'hover:text-white'
                      }`}
                    >
                      {label}
                      {sortKey === key && <SortIcon className="w-3 h-3" aria-hidden="true" />}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <th scope="row" className="sticky left-0 z-10 bg-navy-700 text-left font-normal">
                    <div className="flex items-center gap-2 px-3 py-2.5 min-w-[150px]">
                      <span className="w-4 text-right text-white/40">{index + 1}</span>
                      <span className="w-7 text-center rounded-md bg-white/10 py-0.5 text-[10px] font-bold text-gold-400">
                        {row.number}
                      </span>
                      <span className="font-medium text-white truncate">{row.name}</span>
                    </div>
                  </th>
                  <td className="px-2 py-2.5 text-center text-white/70">{row.position}</td>
                  <td className="px-2 py-2.5 text-center text-white/80">{row.matches}</td>
                  <td className="px-2 py-2.5 text-center text-white/80">{row.goals}</td>
                  <td className="px-2 py-2.5 text-center text-white/80">{row.assists}</td>
                  <td className="px-2 py-2.5 text-center font-bold text-white">{row.points}</td>
                  <td className="px-2 py-2.5 text-center text-white/80">{row.pim}</td>
                  <td
                    className={`px-2 py-2.5 text-center font-semibold ${
                      row.plusMinus > 0 ? 'text-emerald-400' : row.plusMinus < 0 ? 'text-red-400' : 'text-white/60'
                    }`}
                  >
                    {formatPlusMinus(row.plusMinus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[11px] text-white/40">
        Przesuń tabelę w bok, aby zobaczyć wszystkie kolumny. Dotknij nagłówka, aby posortować.
      </p>

      <details className="group rounded-2xl border border-white/10 bg-white/5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Słownik pojęć hokejowych</span>
              <span className="block text-xs text-white/60">Co oznaczają skróty w tabeli?</span>
            </span>
          </span>
          <ChevronDown
            className="w-5 h-5 text-white/40 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <dl className="space-y-3 px-4 pb-4">
          {GLOSSARY.map(({ term, name, description }) => (
            <div key={term} className="flex gap-3">
              <dt className="w-12 shrink-0">
                <span className="inline-flex min-w-10 justify-center rounded-lg bg-gold-400/15 border border-gold-400/30 px-2 py-1 text-xs font-bold text-gold-400">
                  {term}
                </span>
              </dt>
              <dd className="text-xs leading-relaxed text-white/70">
                <span className="font-semibold text-white">{name}. </span>
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  );
}
