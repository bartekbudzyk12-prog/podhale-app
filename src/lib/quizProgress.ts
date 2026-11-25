import { ECONOMY } from './economy';
import { QUIZ_POOL } from './quizPool';
import type { QuizQuestion } from './data';

const STORAGE_KEY = 'podhale_quiz_progress_v1';

export interface QuizProgress {
  day: string;
  rankedRoundsToday: number;
  recentIds: string[];
  rewardedIds: string[];
}

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function emptyProgress(): QuizProgress {
  return { day: todayKey(), rankedRoundsToday: 0, recentIds: [], rewardedIds: [] };
}

export function loadQuizProgress(): QuizProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<QuizProgress>;
    const progress: QuizProgress = {
      day: typeof parsed.day === 'string' ? parsed.day : todayKey(),
      rankedRoundsToday: Number(parsed.rankedRoundsToday) || 0,
      recentIds: Array.isArray(parsed.recentIds) ? parsed.recentIds : [],
      rewardedIds: Array.isArray(parsed.rewardedIds) ? parsed.rewardedIds : [],
    };
    if (progress.day !== todayKey()) {
      progress.day = todayKey();
      progress.rankedRoundsToday = 0;
    }
    return progress;
  } catch {
    return emptyProgress();
  }
}

export function saveQuizProgress(progress: QuizProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage may be unavailable (private mode); the quiz still works for this session.
  }
}

export function rankedRoundsLeft(progress: QuizProgress): number {
  return Math.max(0, ECONOMY.quiz.rankedRoundsPerDay - progress.rankedRoundsToday);
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const order = shuffle(q.options.map((_, i) => i));
  return {
    ...q,
    options: order.map(i => q.options[i]),
    correct: order.indexOf(q.correct),
  };
}

export function drawRound(progress: QuizProgress): QuizQuestion[] {
  const count = Math.min(ECONOMY.quiz.questionsPerRound, QUIZ_POOL.length);
  const recent = new Set(progress.recentIds);
  const fresh = shuffle(QUIZ_POOL.filter(q => !recent.has(q.id)));
  let picked = fresh.slice(0, count);

  if (picked.length < count) {
    // Not enough unseen questions: fall back to the ones seen longest ago.
    const byOldest = progress.recentIds
      .map(id => QUIZ_POOL.find(q => q.id === id))
      .filter((q): q is QuizQuestion => Boolean(q));
    picked = [...picked, ...byOldest.slice(0, count - picked.length)];
  }

  return shuffle(picked).map(shuffleOptions);
}

export function rememberSeen(progress: QuizProgress, ids: string[]): QuizProgress {
  const withoutDupes = progress.recentIds.filter(id => !ids.includes(id));
  const recentIds = [...withoutDupes, ...ids].slice(-ECONOMY.quiz.recentQuestionsMemory);
  return { ...progress, recentIds };
}
