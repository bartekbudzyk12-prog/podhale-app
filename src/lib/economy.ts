export const ECONOMY = {
  startingBalance: 250,
  typerReward: 25,
  quiz: {
    questionsPerRound: 10,
    pointsPerNewCorrect: 10,
    perfectRoundThreshold: 8,
    perfectRoundBonus: 20,
    rankedRoundsPerDay: 2,
    recentQuestionsMemory: 30,
  },
} as const;
