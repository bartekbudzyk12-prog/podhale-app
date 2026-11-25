import { PLAYERS, type Player } from './data';

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

const FORWARD_POSITIONS: Record<string, 'C' | 'LW' | 'RW'> = {
  alanko: 'LW',
  blach: 'RW',
  bochnak: 'C',
  bryniarski: 'LW',
  chyrkin: 'RW',
  dlugopolski: 'C',
  duda: 'LW',
  gach: 'RW',
  hu: 'C',
  jarczyk: 'LW',
  kapica: 'C',
  kolendowicz: 'RW',
  lojas: 'RW',
  majoch: 'LW',
  malasinski: 'C',
  olifirchuk: 'C',
  sadovsky: 'RW',
  saroka: 'LW',
  sroka: 'RW',
  slowakiewicz: 'C',
  worwa: 'LW',
  wsol: 'RW',
  zoltek: 'LW',
};

const PLUS_MINUS: Record<string, number> = {
  horzelski: 3,
  kaminski: 7,
  kopytko: -1,
  matera: -4,
  matthews: -2,
  mackowski_d: 0,
  savchenko: 1,
  sitnik: -3,
  tanczyk: -5,
  weglarczyk: -1,
  zalamay: 6,
  bochnak: 4,
  bryniarski: -2,
  chyrkin: -3,
  hu: 5,
  jarczyk: -4,
  kapica: 2,
  lojas: -6,
  majoch: -1,
  malasinski: -3,
  olifirchuk: 1,
  sadovsky: -2,
  saroka: 3,
  sroka: -1,
  slowakiewicz: 2,
  worwa: 1,
  wsol: -1,
  zoltek: -2,
};

function toDetailedPosition(player: Player): DetailedPosition {
  if (player.position === 'Bramkarz') return 'G';
  if (player.position === 'Obrońca') return 'D';
  return FORWARD_POSITIONS[player.id] ?? 'C';
}

function toGroup(player: Player): PlayerStatRow['group'] {
  if (player.position === 'Bramkarz') return 'goalies';
  if (player.position === 'Obrońca') return 'defense';
  return 'forwards';
}

export const PLAYER_STATS: PlayerStatRow[] = PLAYERS.map((player) => ({
  id: player.id,
  name: player.name,
  number: player.number,
  position: toDetailedPosition(player),
  group: toGroup(player),
  matches: player.matches,
  goals: player.goals,
  assists: player.assists,
  points: player.goals + player.assists,
  pim: player.pim,
  plusMinus: PLUS_MINUS[player.id] ?? 0,
}));
