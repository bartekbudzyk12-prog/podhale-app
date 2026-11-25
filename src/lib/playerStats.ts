export type DetailedPosition = 'C' | 'LW' | 'RW' | 'D' | 'G';
export type PositionGroup = 'all' | 'forwards' | 'defense' | 'goalies';

export interface PlayerStatRow {
  id: string;
  name: string;
  number: number;
  position: DetailedPosition;
  group: Exclude<PositionGroup, 'all'>;
  matches: number;
  goals: number;
  assists: number;
  points: number;
  pim: number;
  plusMinus: number;
}

export const STATS_SOURCE = {
  label: 'Hokej.Net',
  url: 'https://hokej.net/statystyki-zawodnikow/233/regularny-10?team=1552&position=&sortCol=P&sortType=desc',
  season: '2026/27 Ekstraliga, sezon regularny',
  updatedAt: '25.11.2026',
};

type RawRow = [
  id: string,
  name: string,
  number: number,
  position: DetailedPosition,
  matches: number,
  goals: number,
  assists: number,
  pim: number,
  plusMinus: number,
];

// Hokej.Net lists forwards only as "N"; C/LW/RW are the club's line assignments.
const RAW_STATS: RawRow[] = [
  ['kaminski', 'Kamiński Łukasz', 15, 'C', 19, 5, 8, 33, -31],
  ['kapica', 'Kapica Fabian', 91, 'C', 18, 3, 6, 55, -28],
  ['zalamay', 'Załamaj Dmitrij', 69, 'D', 19, 2, 7, 4, -16],
  ['slowakiewicz', 'Słowakiewicz Adrian', 2, 'C', 21, 5, 1, 16, -36],
  ['horzelski', 'Horzelski Marcin', 59, 'D', 19, 2, 4, 8, -28],
  ['bochnak', 'Bochnak Wiktor', 14, 'C', 17, 2, 4, 6, -24],
  ['olifirchuk', 'Olifirczuk Danyło', 82, 'C', 21, 2, 4, 6, -30],
  ['hu', 'Hu Sam', 67, 'C', 5, 2, 4, 0, 0],
  ['majoch', 'Majoch Dawid', 10, 'D', 20, 2, 1, 10, -34],
  ['saroka', 'Saroka Marat', 77, 'LW', 5, 2, 1, 6, -2],
  ['lojas', 'Łojas Dawid', 46, 'RW', 21, 1, 1, 33, -28],
  ['worwa', 'Worwa Jakub', 12, 'LW', 4, 1, 0, 0, -6],
  ['sadovsky', 'Sadouski Aliaksander', 77, 'RW', 11, 1, 0, 2, -10],
  ['weglarczyk', 'Węglarczyk Wiktor', 21, 'D', 17, 1, 0, 2, -14],
  ['mackowski_d', 'Maćkowski Szymon', 86, 'LW', 3, 0, 1, 0, -2],
  ['jarczyk', 'Jarczyk Krzysztof', 93, 'LW', 20, 0, 1, 43, -24],
  ['bryniarski', 'Bryniarski Daniel', 19, 'D', 14, 0, 1, 0, -18],
  ['zoltek', 'Żółtek Szczepan', 87, 'LW', 20, 0, 1, 2, -24],
  ['sroka', 'Sroka Marcin', 55, 'D', 11, 0, 1, 6, -5],
  ['matera', 'Matera Jan', 8, 'D', 21, 0, 1, 8, -37],
  ['tanczyk', 'Tańczyk Wiktor', 61, 'D', 21, 0, 1, 18, -35],
  ['wsol', 'Wsół Bartłomiej', 28, 'RW', 3, 0, 0, 2, -4],
  ['polak', 'Polak Oskar', 27, 'G', 13, 0, 0, 0, 0],
  ['dlugopolski', 'Długopolski Łukasz', 18, 'C', 3, 0, 0, 0, -1],
  ['malasinski', 'Malasiński Kacper', 7, 'C', 20, 0, 0, 6, -23],
  ['zajac', 'Zając Kacper', 33, 'G', 16, 0, 0, 2, 0],
  ['sitnik', 'Sitnik Iwan', 28, 'D', 9, 0, 0, 4, -11],
  ['gach', 'Gach Michał', 6, 'RW', 1, 0, 0, 0, 0],
  ['blach', 'Błach Jan', 9, 'D', 2, 0, 0, 0, 0],
  ['chyrkin', 'Chyrkin Uładzimir', 17, 'RW', 10, 0, 0, 2, -6],
  ['savchenko', 'Sewczenko Arseni', 24, 'D', 2, 0, 0, 0, -2],
  ['kolendowicz', 'Kolendowicz Alex', 18, 'RW', 2, 0, 0, 0, -3],
  ['duda', 'Duda Eryk', 24, 'LW', 2, 0, 0, 0, -4],
  ['bochenski', 'Bocheński Kamil', 6, 'D', 2, 0, 0, 0, 1],
  ['matthews', 'Matthews Daryan', 23, 'D', 16, 0, 0, 45, -23],
  ['kopytko', 'Kopytko Filip', 18, 'RW', 4, 0, 0, 0, -7],
  ['alanko', 'Alanko Roni', 29, 'LW', 1, 0, 0, 0, -5],
  ['roberts', 'Roberts Ethan', 42, 'G', 3, 0, 0, 0, 0],
];

function toGroup(position: DetailedPosition): PlayerStatRow['group'] {
  if (position === 'G') return 'goalies';
  if (position === 'D') return 'defense';
  return 'forwards';
}

export const PLAYER_STATS: PlayerStatRow[] = RAW_STATS.map(
  ([id, name, number, position, matches, goals, assists, pim, plusMinus]) => ({
    id,
    name,
    number,
    position,
    group: toGroup(position),
    matches,
    goals,
    assists,
    points: goals + assists,
    pim,
    plusMinus,
  }),
);
