import { useState } from 'react';
import { Brain, Check, X, Trophy, RotateCcw, ChevronRight, Sparkles, Dumbbell, Info } from 'lucide-react';
import type { QuizQuestion } from '@/lib/data';
import { usePoints } from '@/lib/points';
import { Badge } from '@/components/Badge';
import { ECONOMY } from '@/lib/economy';
import { QUIZ_POOL } from '@/lib/quizPool';
import {
  drawRound,
  loadQuizProgress,
  rankedRoundsLeft,
  rememberSeen,
  saveQuizProgress,
  type QuizProgress,
} from '@/lib/quizProgress';

const QUIZ = ECONOMY.quiz;

type AnswerOutcome = { kind: 'earned'; amount: number } | { kind: 'repeat' } | { kind: 'training' } | { kind: 'wrong' };

export function QuizScreen() {
  const { points, addPoints } = usePoints();
  const [progress, setProgress] = useState<QuizProgress>(loadQuizProgress);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [ranked, setRanked] = useState(false);
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<AnswerOutcome | null>(null);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);
  const [repeats, setRepeats] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [finished, setFinished] = useState(false);

  const updateProgress = (next: QuizProgress) => {
    setProgress(next);
    saveQuizProgress(next);
  };

  const roundsLeft = rankedRoundsLeft(progress);
  const total = questions.length;
  const q: QuizQuestion | undefined = questions[idx];
  const answered = selected !== null;

  const start = () => {
    const current = loadQuizProgress();
    const isRanked = rankedRoundsLeft(current) > 0;
    const round = drawRound(current);
    const withSeen = rememberSeen(current, round.map(r => r.id));
    updateProgress(isRanked ? { ...withSeen, rankedRoundsToday: withSeen.rankedRoundsToday + 1 } : withSeen);

    setQuestions(round);
    setRanked(isRanked);
    setStarted(true);
    setIdx(0);
    setSelected(null);
    setOutcome(null);
    setScore(0);
    setEarned(0);
    setRepeats(0);
    setBonus(0);
    setFinished(false);
  };

  const answer = (i: number) => {
    if (answered || !q) return;
    setSelected(i);
    if (i !== q.correct) {
      setOutcome({ kind: 'wrong' });
      return;
    }
    setScore(s => s + 1);
    if (!ranked) {
      setOutcome({ kind: 'training' });
      return;
    }
    if (progress.rewardedIds.includes(q.id)) {
      setRepeats(r => r + 1);
      setOutcome({ kind: 'repeat' });
      return;
    }
    const amount = QUIZ.pointsPerNewCorrect;
    addPoints(amount);
    setEarned(e => e + amount);
    updateProgress({ ...progress, rewardedIds: [...progress.rewardedIds, q.id] });
    setOutcome({ kind: 'earned', amount });
  };

  const next = () => {
    if (idx + 1 >= total) {
      if (ranked && score >= QUIZ.perfectRoundThreshold) {
        addPoints(QUIZ.perfectRoundBonus);
        setBonus(QUIZ.perfectRoundBonus);
      }
      setFinished(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setOutcome(null);
    }
  };

  if (!started) {
    const trainingOnly = roundsLeft === 0;
    return (
      <div className="px-4 pt-5 pb-28 space-y-5">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-wide text-white">Quizy Szarotek</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">Sprawdź wiedzę o hokeju i Podhalu</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl glass-gold p-6 text-center">
          <div className="absolute inset-0 shimmer-bg animate-shimmer pointer-events-none" />
          <div className="relative">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center mb-4">
              {trainingOnly ? <Dumbbell className="w-10 h-10 text-gold-400" /> : <Brain className="w-10 h-10 text-gold-400" />}
            </div>
            <h2 className="font-display text-xl uppercase text-white mb-1">
              {trainingOnly ? 'Tryb treningowy' : 'Wielki Quiz Kibica'}
            </h2>
            <p className="text-[13px] text-gray-300 mb-4">
              {QUIZ.questionsPerRound} losowych pytań z puli {QUIZ_POOL.length}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <Badge text={`+${QUIZ.pointsPerNewCorrect} Szarotek / nowa poprawna`} color="gold" size="md" />
              <Badge text={`Bonus +${QUIZ.perfectRoundBonus} za ${QUIZ.perfectRoundThreshold}/${QUIZ.questionsPerRound}`} color="gold" size="md" />
            </div>

            <div className="rounded-2xl bg-navy-900/40 border border-white/10 p-3 mb-5">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Rundy punktowane dziś</p>
              <p className="font-display text-3xl text-gradient-gold tabular">
                {roundsLeft} / {QUIZ.rankedRoundsPerDay}
              </p>
              {trainingOnly && (
                <p className="text-[11px] text-gray-300 mt-1">Limit wykorzystany — wróć jutro po kolejne punkty.</p>
              )}
            </div>

            <button onClick={start} className="w-full py-3.5 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform glow-gold flex items-center justify-center gap-2">
              {trainingOnly ? <Dumbbell className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
              {trainingOnly ? 'Trenuj bez punktów' : 'Rozpocznij rundę punktowaną'}
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gold-400" />
            <p className="text-[11px] text-gray-300 uppercase tracking-wider font-semibold">Zasady</p>
          </div>
          <ul className="text-[12px] text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
            <li>Dziennie {QUIZ.rankedRoundsPerDay} rundy punktowane, potem tylko trening.</li>
            <li>Punkty za każde pytanie zdobywasz tylko raz — powtórki nie dają Szarotek.</li>
            <li>Pytania, które niedawno widziałeś, nie wracają od razu.</li>
            <li>Runda liczy się od momentu rozpoczęcia.</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Twoje saldo</p>
              <p className="font-display text-2xl text-gradient-gold tabular">{points.toLocaleString('pl-PL')}</p>
            </div>
            <Sparkles className="w-6 h-6 text-gold-400/50" />
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / Math.max(1, total)) * 100);
    return (
      <div className="px-4 pt-5 pb-28 space-y-5">
        <div className="relative overflow-hidden rounded-3xl glass p-6 text-center">
          <div className="absolute inset-0 shimmer-bg animate-shimmer pointer-events-none opacity-50" />
          <div className="relative">
            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-4 ${pct >= 70 ? 'bg-gold-400/15 border border-gold-400/30' : 'bg-white/5 border border-white/10'}`}>
              <Trophy className={`w-10 h-10 ${pct >= 70 ? 'text-gold-400' : 'text-gray-400'}`} />
            </div>
            <h2 className="font-display text-2xl uppercase text-white mb-1">
              {ranked ? 'Wynik rundy' : 'Wynik treningu'}
            </h2>
            <p className="font-display text-5xl text-gradient-gold tabular my-3">{score} / {total}</p>
            <p className="text-sm text-gray-300 mb-1">{pct >= 70 ? 'Świetna robota, kibicu!' : 'Spróbuj ponownie!'}</p>
            <p className="text-[11px] text-gray-400 mb-5">Poprawne odpowiedzi: {pct}%</p>

            {ranked ? (
              <div className="glass-gold rounded-2xl p-3 mb-3">
                <p className="text-[11px] text-gold-400 uppercase tracking-wider">Zdobyte Szarotki</p>
                <p className="font-display text-3xl text-gold-300 tabular">+{earned + bonus}</p>
                {bonus > 0 && <p className="text-[11px] text-gray-300 mt-1">w tym bonus za wynik: +{bonus}</p>}
                {repeats > 0 && <p className="text-[11px] text-gray-400 mt-1">Powtórki bez punktów: {repeats}</p>}
              </div>
            ) : (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3 mb-3">
                <p className="text-[12px] text-gray-300">Trening nie daje punktów — ale wiedza zostaje!</p>
              </div>
            )}

            <p className="text-[11px] text-gray-400 mb-5">
              Pozostałe rundy punktowane dziś: {roundsLeft} / {QUIZ.rankedRoundsPerDay}
            </p>

            <button onClick={start} className="w-full py-3.5 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" /> {roundsLeft > 0 ? 'Zagraj kolejną rundę' : 'Trenuj dalej'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!q) return null;

  const outcomeText = (() => {
    switch (outcome?.kind) {
      case 'earned': return `Poprawnie! +${outcome.amount} Szarotek`;
      case 'repeat': return 'Poprawnie! (punkty za to pytanie już zdobyte)';
      case 'training': return 'Poprawnie! (trening)';
      default: return 'Niestety, błąd';
    }
  })();
  const isRight = answered && selected === q.correct;
  const progressPct = ((idx + (answered ? 1 : 0)) / total) * 100;

  return (
    <div className="px-4 pt-5 pb-28 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl uppercase tracking-wide text-white">{ranked ? 'Quiz' : 'Trening'}</h1>
          <p className="text-[11px] text-gray-400">Pytanie {idx + 1} z {total}</p>
        </div>
        <div className="flex items-center gap-3">
          {!ranked && <Badge text="Bez punktów" color="gold" size="sm" />}
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-gold-400" />
            <span className="font-display text-lg text-gold-400 tabular">{score}</span>
          </div>
        </div>
      </div>

      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-gold-400 to-red-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-gold-400" />
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Pytanie</span>
        </div>
        <h2 className="text-[16px] font-semibold text-white leading-snug mb-5">{q.question}</h2>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isSelected = selected === i;
            let cls = 'glass';
            if (answered) {
              if (isCorrect) cls = 'bg-green-500/20 border border-green-500/40';
              else if (isSelected) cls = 'bg-red-500/20 border border-red-500/40';
              else cls = 'bg-white/5 opacity-50';
            }
            return (
              <button
                key={opt}
                onClick={() => answer(i)}
                disabled={answered}
                className={`w-full text-left rounded-2xl p-3.5 flex items-center gap-3 transition-all active:scale-[0.98] ${cls} ${!answered ? 'hover:bg-white/10' : ''}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold shrink-0 ${answered && isCorrect ? 'bg-green-500 text-white' : answered && isSelected ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300'}`}>
                  {answered && isCorrect ? <Check className="w-4 h-4" /> : answered && isSelected ? <X className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="text-[13px] text-white flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 animate-fade-in">
            <div className={`rounded-2xl p-3.5 ${isRight ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${isRight ? 'text-green-400' : 'text-red-300'}`}>
                {outcomeText}
              </p>
              <p className="text-[12px] text-gray-200 leading-snug">{q.explanation}</p>
            </div>
            <button onClick={next} className="w-full mt-3 py-3 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform flex items-center justify-center gap-2">
              {idx + 1 >= total ? 'Zobacz wynik' : 'Następne pytanie'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
