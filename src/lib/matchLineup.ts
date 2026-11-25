// Edit this file before each match to publish the new lineup.

export interface LineupPlayer {
  number: number;
  name: string;
  position: 'C' | 'LW' | 'RW' | 'D' | 'G';
  captain?: 'C' | 'A';
}

export interface LineupUnit {
  label: string;
  forwards: LineupPlayer[];
  defense: LineupPlayer[];
}

export interface MatchLineup {
  opponent: string;
  date: string;
  venue: string;
  status: 'confirmed' | 'provisional';
  coach: string;
  units: LineupUnit[];
  goalies: { starter: LineupPlayer; backup: LineupPlayer[] };
  reserves: LineupPlayer[];
}

export const MATCH_LINEUP: MatchLineup = {
  opponent: 'Polonia Bytom',
  date: '27.11.2026, 18:00',
  venue: 'Miejska Hala Lodowa, Nowy Targ',
  status: 'provisional',
  coach: 'Andrzej Świstak',
  units: [
    {
      label: '1. formacja',
      forwards: [
        { number: 77, name: 'Saroka Marat', position: 'LW' },
        { number: 15, name: 'Kamiński Łukasz', position: 'C', captain: 'C' },
        { number: 91, name: 'Kapica Fabian', position: 'RW' },
      ],
      defense: [
        { number: 69, name: 'Załamaj Dmitrij', position: 'D', captain: 'A' },
        { number: 59, name: 'Horzelski Marcin', position: 'D' },
      ],
    },
    {
      label: '2. formacja',
      forwards: [
        { number: 12, name: 'Worwa Jakub', position: 'LW' },
        { number: 67, name: 'Hu Sam', position: 'C' },
        { number: 2, name: 'Słowakiewicz Adrian', position: 'RW', captain: 'A' },
      ],
      defense: [
        { number: 10, name: 'Majoch Dawid', position: 'D' },
        { number: 23, name: 'Matthews Daryan', position: 'D' },
      ],
    },
    {
      label: '3. formacja',
      forwards: [
        { number: 93, name: 'Jarczyk Krzysztof', position: 'LW' },
        { number: 14, name: 'Bochnak Wiktor', position: 'C' },
        { number: 82, name: 'Olifirczuk Danyło', position: 'RW' },
      ],
      defense: [
        { number: 8, name: 'Matera Jan', position: 'D' },
        { number: 61, name: 'Tańczyk Wiktor', position: 'D' },
      ],
    },
    {
      label: '4. formacja',
      forwards: [
        { number: 87, name: 'Żółtek Szczepan', position: 'LW' },
        { number: 7, name: 'Malasiński Kacper', position: 'C' },
        { number: 46, name: 'Łojas Dawid', position: 'RW' },
      ],
      defense: [
        { number: 21, name: 'Węglarczyk Wiktor', position: 'D' },
        { number: 19, name: 'Bryniarski Daniel', position: 'D' },
      ],
    },
  ],
  goalies: {
    starter: { number: 33, name: 'Zając Kacper', position: 'G' },
    backup: [{ number: 27, name: 'Polak Oskar', position: 'G' }],
  },
  reserves: [
    { number: 77, name: 'Sadouski Aliaksander', position: 'RW' },
    { number: 55, name: 'Sroka Marcin', position: 'D' },
  ],
};
