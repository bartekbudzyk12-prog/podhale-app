export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Bramkarz' | 'Obrońca' | 'Napastnik';
  role?: string;
  age: number;
  matches: number;
  goals: number;
  assists: number;
  points: number;
  pim: number;
  rating: number;
  nationality: string;
  flag: string;
}

export const PLAYERS: Player[] = [
  // Bramkarze
  { id: 'polak', name: 'Polak Oskar', number: 27, position: 'Bramkarz', age: 23, matches: 8, goals: 0, assists: 0, points: 0, pim: 0, rating: 78, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'roberts', name: 'Roberts Ethan', number: 42, position: 'Bramkarz', age: 24, matches: 3, goals: 0, assists: 0, points: 0, pim: 0, rating: 75, nationality: 'Kanada', flag: '🇨🇦' },
  { id: 'zajac', name: 'Zając Kacper', number: 33, position: 'Bramkarz', age: 21, matches: 11, goals: 0, assists: 0, points: 0, pim: 0, rating: 76, nationality: 'Polska', flag: '🇵🇱' },
  // Obrońcy
  { id: 'bochenski', name: 'Bocheński Kamil', number: 6, position: 'Obrońca', age: 17, matches: 2, goals: 0, assists: 0, points: 0, pim: 0, rating: 68, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'horzelski', name: 'Horzelski Marcin', number: 59, position: 'Obrońca', age: 30, matches: 19, goals: 2, assists: 4, points: 6, pim: 10, rating: 77, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'kaminski', name: 'Kamiński Łukasz', number: 15, position: 'Obrońca', age: 27, matches: 19, goals: 5, assists: 7, points: 12, pim: 14, rating: 80, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'kopytko', name: 'Kopytko Filip', number: 18, position: 'Obrońca', age: 19, matches: 4, goals: 0, assists: 0, points: 0, pim: 2, rating: 70, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'matera', name: 'Matera Jan', number: 8, position: 'Obrońca', age: 18, matches: 21, goals: 0, assists: 0, points: 0, pim: 6, rating: 72, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'matthews', name: 'Matthews Daryan', number: 23, position: 'Obrońca', age: 19, matches: 16, goals: 0, assists: 0, points: 0, pim: 8, rating: 73, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'mackowski_d', name: 'Maćkowski Szymon', number: 86, position: 'Obrońca', age: 23, matches: 3, goals: 0, assists: 0, points: 0, pim: 0, rating: 71, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'savchenko', name: 'Sewczenko Arseni', number: 24, position: 'Obrońca', age: 19, matches: 3, goals: 0, assists: 1, points: 1, pim: 2, rating: 70, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'sitnik', name: 'Sitnik Iwan', number: 28, position: 'Obrońca', age: 20, matches: 9, goals: 0, assists: 0, points: 0, pim: 4, rating: 72, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'tanczyk', name: 'Tańczyk Wiktor', number: 61, position: 'Obrońca', age: 18, matches: 20, goals: 0, assists: 0, points: 0, pim: 6, rating: 73, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'weglarczyk', name: 'Węglarczyk Wiktor', number: 21, position: 'Obrońca', age: 19, matches: 18, goals: 1, assists: 0, points: 1, pim: 8, rating: 74, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'zalamay', name: 'Załamaj Dmitrij', number: 69, position: 'Obrońca', age: 32, matches: 19, goals: 2, assists: 9, points: 11, pim: 12, rating: 79, nationality: 'Polska', flag: '🇵🇱' },
  // Napastnicy
  { id: 'alanko', name: 'Alanko Roni', number: 29, position: 'Napastnik', age: 21, matches: 1, goals: 0, assists: 0, points: 0, pim: 0, rating: 68, nationality: 'Finlandia', flag: '🇫🇮' },
  { id: 'blach', name: 'Błach Jan', number: 9, position: 'Napastnik', age: 19, matches: 2, goals: 0, assists: 0, points: 0, pim: 0, rating: 69, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'bochnak', name: 'Bochnak Wiktor', number: 14, position: 'Napastnik', age: 24, matches: 17, goals: 2, assists: 5, points: 7, pim: 10, rating: 76, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'bryniarski', name: 'Bryniarski Daniel', number: 19, position: 'Napastnik', age: 20, matches: 14, goals: 0, assists: 1, points: 1, pim: 6, rating: 72, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'chyrkin', name: 'Chyrkin Uładzimir', number: 17, position: 'Napastnik', age: 19, matches: 10, goals: 0, assists: 0, points: 0, pim: 4, rating: 71, nationality: 'Białoruś', flag: '🇧🇾' },
  { id: 'dlugopolski', name: 'Długopolski Łukasz', number: 18, position: 'Napastnik', age: 22, matches: 2, goals: 0, assists: 0, points: 0, pim: 0, rating: 69, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'duda', name: 'Duda Eryk', number: 24, position: 'Napastnik', age: 16, matches: 2, goals: 0, assists: 0, points: 0, pim: 0, rating: 67, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'gach', name: 'Gach Michał', number: 6, position: 'Napastnik', age: 20, matches: 1, goals: 0, assists: 0, points: 0, pim: 0, rating: 68, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'hu', name: 'Hu Sam', number: 67, position: 'Napastnik', age: 29, matches: 5, goals: 2, assists: 5, points: 7, pim: 4, rating: 75, nationality: 'Kanada', flag: '🇨🇦' },
  { id: 'jarczyk', name: 'Jarczyk Krzysztof', number: 93, position: 'Napastnik', age: 23, matches: 20, goals: 0, assists: 1, points: 1, pim: 8, rating: 73, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'kapica', name: 'Kapica Fabian', number: 91, position: 'Napastnik', age: 23, matches: 18, goals: 3, assists: 5, points: 8, pim: 10, rating: 77, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'kolendowicz', name: 'Kolendowicz Alex', number: 18, position: 'Napastnik', age: 18, matches: 2, goals: 0, assists: 0, points: 0, pim: 0, rating: 68, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'lojas', name: 'Łojas Dawid', number: 46, position: 'Napastnik', age: 20, matches: 21, goals: 1, assists: 1, points: 2, pim: 6, rating: 74, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'majoch', name: 'Majoch Dawid', number: 10, position: 'Napastnik', age: 33, matches: 20, goals: 2, assists: 1, points: 3, pim: 12, rating: 75, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'malasinski', name: 'Malasiński Kacper', number: 7, position: 'Napastnik', age: 22, matches: 20, goals: 0, assists: 1, points: 1, pim: 8, rating: 74, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'olifirchuk', name: 'Olifirczuk Danyło', number: 82, position: 'Napastnik', age: 18, matches: 21, goals: 2, assists: 4, points: 6, pim: 6, rating: 76, nationality: 'Ukraina', flag: '🇺🇦' },
  { id: 'sadovsky', name: 'Sadouski Aliaksander', number: 77, position: 'Napastnik', age: 20, matches: 11, goals: 1, assists: 0, points: 1, pim: 4, rating: 72, nationality: 'Słowacja', flag: '🇸🇰' },
  { id: 'saroka', name: 'Saroka Marat', number: 77, position: 'Napastnik', age: 23, matches: 5, goals: 2, assists: 2, points: 4, pim: 4, rating: 74, nationality: 'Białoruś', flag: '🇧🇾' },
  { id: 'sroka', name: 'Sroka Marcin', number: 55, position: 'Napastnik', age: 19, matches: 11, goals: 0, assists: 1, points: 1, pim: 4, rating: 71, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'slowakiewicz', name: 'Słowakiewicz Adrian', number: 2, position: 'Napastnik', age: 27, matches: 21, goals: 5, assists: 1, points: 6, pim: 10, rating: 78, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'worwa', name: 'Worwa Jakub', number: 12, position: 'Napastnik', age: 27, matches: 4, goals: 1, assists: 0, points: 1, pim: 2, rating: 75, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'wsol', name: 'Wsół Bartłomiej', number: 28, position: 'Napastnik', age: 26, matches: 3, goals: 0, assists: 0, points: 0, pim: 0, rating: 70, nationality: 'Polska', flag: '🇵🇱' },
  { id: 'zoltek', name: 'Żółtek Szczepan', number: 87, position: 'Napastnik', age: 19, matches: 20, goals: 0, assists: 1, points: 1, pim: 4, rating: 72, nationality: 'Polska', flag: '🇵🇱' },
];

export const MVP_CANDIDATES = PLAYERS.map((p) => ({
  id: p.id,
  name: p.name,
  role: `#${p.number}, ${p.position}`,
  number: p.number,
  flag: p.flag,
}));

export const FIRST_GOAL_SCORERS = [
  ...PLAYERS.map((p) => `#${p.number} ${p.name}`),
  'Brak gola (0:0)',
];

export interface Fixture {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  isHome: boolean;
  opponent: string;
}

export const FIXTURES: Fixture[] = [
  { id: 'f1', date: '27.11', time: '18:00', home: 'Podhale', away: 'Polonia Bytom', isHome: true, opponent: 'Polonia Bytom' },
  { id: 'f2', date: '29.11', time: '18:00', home: 'Zagłębie Sosnowiec', away: 'Podhale', isHome: false, opponent: 'Zagłębie Sosnowiec' },
  { id: 'f3', date: '01.12', time: '18:00', home: 'Podhale', away: 'Comarch Cracovia', isHome: true, opponent: 'Comarch Cracovia' },
  { id: 'f4', date: '04.12', time: '18:00', home: 'Unia Oświęcim', away: 'Podhale', isHome: false, opponent: 'Unia Oświęcim' },
  { id: 'f5', date: '06.12', time: '18:00', home: 'Podhale', away: 'STS Sanok', isHome: true, opponent: 'STS Sanok' },
  { id: 'f6', date: '18.12', time: '18:00', home: 'JKH GKS', away: 'Podhale', isHome: false, opponent: 'JKH GKS' },
  { id: 'f7', date: '20.12', time: '18:00', home: 'Podhale', away: 'GKS Tychy', isHome: true, opponent: 'GKS Tychy' },
  { id: 'f8', date: '22.12', time: '18:00', home: 'KH Energa Toruń', away: 'Podhale', isHome: false, opponent: 'KH Energa Toruń' },
  { id: 'f9', date: '03.01', time: '—', home: 'GKS Katowice', away: 'Podhale', isHome: false, opponent: 'GKS Katowice' },
  { id: 'f10', date: '05.01', time: '—', home: 'Polonia Bytom', away: 'Podhale', isHome: false, opponent: 'Polonia Bytom' },
];

export interface MatchResult {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  result: 'P';
}

export const RESULTS: MatchResult[] = [
  { id: 'r1', date: '22.11', time: '18:00', home: 'Podhale', away: 'GKS Katowice', homeScore: 2, awayScore: 10, result: 'P' },
  { id: 'r2', date: '20.11', time: '18:00', home: 'Podhale', away: 'KH Energa Toruń', homeScore: 4, awayScore: 11, result: 'P' },
  { id: 'r3', date: '17.11', time: '18:00', home: 'GKS Tychy', away: 'Podhale', homeScore: 9, awayScore: 2, result: 'P' },
  { id: 'r4', date: '15.11', time: '18:00', home: 'Podhale', away: 'JKH GKS', homeScore: 2, awayScore: 7, result: 'P' },
  { id: 'r5', date: '13.11', time: '18:00', home: 'STS Sanok', away: 'Podhale', homeScore: 5, awayScore: 1, result: 'P' },
  { id: 'r6', date: '31.10', time: '18:00', home: 'Podhale', away: 'Unia Oświęcim', homeScore: 2, awayScore: 9, result: 'P' },
  { id: 'r7', date: '29.10', time: '18:00', home: 'Comarch Cracovia', away: 'Podhale', homeScore: 7, awayScore: 2, result: 'P' },
  { id: 'r8', date: '25.10', time: '17:00', home: 'Zagłębie Sosnowiec', away: 'Podhale', homeScore: 11, awayScore: 1, result: 'P' },
  { id: 'r9', date: '23.10', time: '18:00', home: 'Polonia Bytom', away: 'Podhale', homeScore: 7, awayScore: 2, result: 'P' },
];

export interface StandingRow {
  pos: number;
  team: string;
  m: number;
  w: number;
  p: number;
  goals: string;
  pts: number;
  isPodhale: boolean;
}

export const STANDINGS: StandingRow[] = [
  { pos: 1, team: 'GKS Tychy', m: 21, w: 18, p: 3, goals: '97:34', pts: 54, isPodhale: false },
  { pos: 2, team: 'KH Energa Toruń', m: 22, w: 16, p: 6, goals: '99:54', pts: 47, isPodhale: false },
  { pos: 3, team: 'KS Unia Oświęcim', m: 21, w: 13, p: 8, goals: '82:59', pts: 42, isPodhale: false },
  { pos: 4, team: 'ECZD Zagłębie Sosnowiec', m: 21, w: 13, p: 8, goals: '88:53', pts: 40, isPodhale: false },
  { pos: 5, team: 'BS Polonia Bytom', m: 21, w: 13, p: 8, goals: '81:52', pts: 38, isPodhale: false },
  { pos: 6, team: 'GKS Katowice', m: 22, w: 12, p: 10, goals: '94:57', pts: 37, isPodhale: false },
  { pos: 7, team: 'Comarch Cracovia', m: 21, w: 9, p: 12, goals: '56:75', pts: 26, isPodhale: false },
  { pos: 8, team: 'JKH GKS Jastrzębie', m: 21, w: 9, p: 12, goals: '44:60', pts: 25, isPodhale: false },
  { pos: 9, team: 'STS Sanok Sokół', m: 21, w: 3, p: 18, goals: '31:81', pts: 9, isPodhale: false },
  { pos: 10, team: 'Podhale Nowy Targ', m: 21, w: 0, p: 21, goals: '31:178', pts: 0, isPodhale: true },
];

export const NEWS = [
  { tag: 'SZTAB', tagColor: 'gold', text: 'Trener Andrzej Świstak i Marcin Kolusz szykują formę przed starciem z Polonią Bytom', time: '2h temu' },
  { tag: 'TRANSFERY', tagColor: 'red', text: 'Wzmocnienia Szarotek: Roberts Ethan i Saroka Marat gotowi do gry w Nowym Targu', time: '5h temu' },
  { tag: 'AKADEMIA', tagColor: 'gold', text: 'Młode Szarotki z kompletem zwycięstw w weekendowym turnieju!', time: '1d temu' },
];

export const REWARDS = [
  { id: 'r1', cost: 2500, title: 'Kawa lub herbata na hali gratis', icon: 'coffee' },
  { id: 'r2', cost: 6000, title: 'Oficjalny szalik Szarotek -30%', icon: 'scarf' },
  { id: 'r3', cost: 15000, title: 'Zdjęcie na lodzie z drużyną po meczu', icon: 'camera' },
];

export const PUSH_PRESETS = [
  'Ostatnie 50 biletów na mecz z Polonią Bytom!',
  'Mecz rozpocznie się za 30 minut. Zapraszamy na halę!',
  'Transmisja na żywo już dostępna. Oglądaj Szarotki!',
  'Nowe nagrody w katalogu Karty Kibica!',
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Ile razy Podhale Nowy Targ zdobyło Mistrzostwo Polski?',
    options: ['13 razy', '19 razy', '21 razy', '8 razy'],
    correct: 1,
    explanation: 'Podhale Nowy Targ to 19-krotny Mistrz Polski — rekordzista w historii polskiego hokeja.',
  },
  {
    id: 'q2',
    question: 'Jakim przydomkiem kibice nazywają drużynę Podhala?',
    options: ['Lwy', 'Szarotki', 'Orły', 'Górale'],
    correct: 1,
    explanation: 'Szarotki — od alpejskiego kwiatu, który rośnie w Tatrach, stąd przydomek drużyny.',
  },
  {
    id: 'q3',
    question: 'W jakim mieście rozgrywa domowe mecze Podhale Nowy Targ?',
    options: ['Zakopane', 'Kraków', 'Nowy Targ', 'Sosnowiec'],
    correct: 2,
    explanation: 'Klub ma siedzibę w Nowym Targu, a mecze odbywają się w Miejskiej Hali Lodowej.',
  },
  {
    id: 'q4',
    question: 'Kto jest najstarszym zawodnikiem w kadrze Szarotek 2026/27?',
    options: ['Majoch Dawid (33)', 'Załamaj Dmitrij (32)', 'Hu Sam (29)', 'Horzelski Marcin (30)'],
    correct: 0,
    explanation: 'Majoch Dawid, napastnik z numerem 10, ma 33 lata — najwięcej w składzie.',
  },
  {
    id: 'q5',
    question: 'Jakiej narodowości jest bramkarz Roberts Ethan?',
    options: ['Amerykańskiej', 'Kanadyjskiej', 'Szwedzkiej', 'Czeskiej'],
    correct: 1,
    explanation: 'Roberts Ethan pochodzi z Kanady i gra w Podhalu z numerem 42.',
  },
  {
    id: 'q6',
    question: 'Jak nazywa się główny trener Podhala w sezonie 2026/27?',
    options: ['Marek Batkiewicz', 'Andrzej Świstak', 'Marcin Kolusz', 'Krzysztof Zapała'],
    correct: 1,
    explanation: 'Andrzej Świstak jest trenerem głównym, a jego asystentami są Marcin Kolusz i Marek Batkiewicz.',
  },
  {
    id: 'q7',
    question: 'Ilu zawodników z jednej drużyny przebywa na lodzie w trakcie gry?',
    options: ['5', '6', '7', '4'],
    correct: 1,
    explanation: 'Na lodzie przebywa 6 zawodników: bramkarz, dwóch obrońców i trzech napastników — w układzie 5+1.',
  },
  {
    id: 'q8',
    question: 'Jak długo trwa regulaminowy czas meczu hokejowego?',
    options: ['3 × 15 min', '3 × 20 min', '2 × 30 min', '4 × 12 min'],
    correct: 1,
    explanation: 'Mecz składa się z trzech tercji po 20 minut czystej gry każda.',
  },
  {
    id: 'q9',
    question: 'Który obrońca nosi numer 69 w sezonie 2026/27?',
    options: ['Horzelski Marcin', 'Załamaj Dmitrij', 'Kamiński Łukasz', 'Węglarczyk Wiktor'],
    correct: 1,
    explanation: 'Załamaj Dmitrij, jeden z najskuteczniejszych obrońców drużyny, gra z numerem 69.',
  },
  {
    id: 'q10',
    question: 'Co oznacza skrót THL w polskim hokeju?',
    options: ['Tauron Hokej Liga', 'Tatry Hokej Lód', 'Polski Hokej Lód', 'Profesjonalna Hokejowa Liga'],
    correct: 0,
    explanation: 'THL to Tauron Hokej Liga — najwyższa klasa rozgrywkowa w polskim hokeju na lodzie.',
  },
];

export interface PollOption {
  id: string;
  label: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

export const POLLS: Poll[] = [
  {
    id: 'poll_song',
    question: 'Jaka piosenka ma brzmieć po pierwszej bramce Szarotek?',
    options: [
      { id: 's1', label: 'Hej Szarotki — tradycyjny hymn kibiców' },
      { id: 's2', label: 'We Will Rock You — Queen' },
      { id: 's3', label: 'Góralskie nuty — kapela z Podhala' },
      { id: 's4', label: 'Seven Nation Army — The White Stripes' },
    ],
  },
  {
    id: 'poll_atmosphere',
    question: 'Jaka atmosfera ma panować na hali podczas hitu z Polonią Bytom?',
    options: [
      { id: 'a1', label: 'Ogniste trybuny — ryk i flagi!' },
      { id: 'a2', label: 'Rodzinny klimat — bawmy się razem' },
      { id: 'a3', label: 'Mrożąca krew cisza przed bully' },
      { id: 'a4', label: 'Festiwal świateł i dymu na wejściu' },
    ],
  },
];

export function positionShort(pos: Player['position']): string {
  return { Bramkarz: 'B', Obrońca: 'O', Napastnik: 'N' }[pos];
}

export const TICKET_URL = 'https://biletynahokej.pl/';
