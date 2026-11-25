import { useState } from 'react';
import { Brain, Check, X, Trophy, RotateCcw, ChevronRight, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS, type QuizQuestion } from '@/lib/data';
import { usePoints } from '@/lib/points';
import { Badge } from '@/components/Badge';

const REWARD_PER_CORRECT = 100;

export function QuizScreen() {
  const { points, addPoints } = usePoints();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);
  const [finished, setFinished] = useState(false);

  const q: QuizQuestion | undefined = QUIZ_QUESTIONS[idx];

  const start = () => {
    setStarted(true);
    setIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setEarned(0);
    setFinished(false);
  };

  const answer = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q!.correct) {
      setScore(s => s + 1);
      setEarned(e => e + REWARD_PER_CORRECT);
      addPoints(REWARD_PER_CORRECT);
    }
  };

  const next = () => {
    if (idx + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  // Landing screen
  if (!started) {
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
              <Brain className="w-10 h-10 text-gold-400" />
            </div>
            <h2 className="font-display text-xl uppercase text-white mb-1">Wielki Quiz Kibica</h2>
            <p className="text-[13px] text-gray-300 mb-4">{QUIZ_QUESTIONS.length} pytań o Podhale NT i hokej na lodzie</p>
            <div className="flex items-center justify-center gap-2 mb-5">
              <Badge text={`+${REWARD_PER_CORRECT} Szarotek / poprawna`} color="gold" size="md" />
            </div>
            <p className="text-[11px] text-gray-400 mb-1">Możesz zdobyć do</p>
            <p className="font-display text-3xl text-gradient-gold tabular mb-5">{QUIZ_QUESTIONS.length * REWARD_PER_CORRECT} Szarotek</p>
            <button onClick={start} className="w-full py-3.5 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform glow-gold flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" /> Rozpocznij Quiz
            </button>
          </div>
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

  // Results screen
  if (finished) {
    const total = QUIZ_QUESTIONS.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="px-4 pt-5 pb-28 space-y-5">
        <div className="relative overflow-hidden rounded-3xl glass p-6 text-center">
          <div className="absolute inset-0 shimmer-bg animate-shimmer pointer-events-none opacity-50" />
          <div className="relative">
            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-4 ${pct >= 70 ? 'bg-gold-400/15 border border-gold-400/30' : 'bg-white/5 border border-white/10'}`}>
              <Trophy className={`w-10 h-10 ${pct >= 70 ? 'text-gold-400' : 'text-gray-400'}`} />
            </div>
            <h2 className="font-display text-2xl uppercase text-white mb-1">Wynik Quizu</h2>
            <p className="font-display text-5xl text-gradient-gold tabular my-3">{score} / {total}</p>
            <p className="text-sm text-gray-300 mb-1">{pct >= 70 ? 'Świetna robota, kibicu!' : 'Spróbuj ponownie!'}</p>
            <p className="text-[11px] text-gray-400 mb-5">Poprawne odpowiedzi: {pct}%</p>

            <div className="glass-gold rounded-2xl p-3 mb-5">
              <p className="text-[11px] text-gold-400 uppercase tracking-wider">Zdobyte Szarotki</p>
              <p className="font-display text-3xl text-gold-300 tabular">+{earned}</p>
            </div>

            <button onClick={start} className="w-full py-3.5 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" /> Zagraj ponownie
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  const progress = ((idx + (answered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;
  return (
    <div className="px-4 pt-5 pb-28 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl uppercase tracking-wide text-white">Quiz</h1>
          <p className="text-[11px] text-gray-400">Pytanie {idx + 1} z {QUIZ_QUESTIONS.length}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-gold-400" />
          <span className="font-display text-lg text-gold-400 tabular">{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-gold-400 to-red-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <div className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-gold-400" />
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Pytanie</span>
        </div>
        <h2 className="text-[16px] font-semibold text-white leading-snug mb-5">{q!.question}</h2>

        <div className="space-y-2.5">
          {q!.options.map((opt, i) => {
            const isCorrect = i === q!.correct;
            const isSelected = selected === i;
            let cls = 'glass';
            if (answered) {
              if (isCorrect) cls = 'bg-green-500/20 border border-green-500/40';
              else if (isSelected) cls = 'bg-red-500/20 border border-red-500/40';
              else cls = 'bg-white/5 opacity-50';
            }
            return (
              <button
                key={i}
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
            <div className={`rounded-2xl p-3.5 ${selected === q!.correct ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${selected === q!.correct ? 'text-green-400' : 'text-red-300'}`}>
                {selected === q!.correct ? `Poprawnie! +${REWARD_PER_CORRECT} Szarotek` : 'Niestety, błąd'}
              </p>
              <p className="text-[12px] text-gray-200 leading-snug">{q!.explanation}</p>
            </div>
            <button onClick={next} className="w-full mt-3 py-3 rounded-xl bg-gold-400 text-navy-900 font-bold active:scale-95 transition-transform flex items-center justify-center gap-2">
              {idx + 1 >= QUIZ_QUESTIONS.length ? 'Zobacz wynik' : 'Następne pytanie'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
