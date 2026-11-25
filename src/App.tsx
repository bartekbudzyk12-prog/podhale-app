import { useState, useCallback } from 'react';
import { PointsProvider } from './lib/points';
import { BottomNav, type TabId } from './components/BottomNav';
import { PushBanner } from './components/PushBanner';
import { MatchScreen } from './screens/MatchScreen';
import { FanZoneScreen } from './screens/FanZoneScreen';
import { QuizScreen } from './screens/QuizScreen';
import { FanCardScreen } from './screens/FanCardScreen';
import { TeamScreen } from './screens/TeamScreen';
import { AdminScreen } from './screens/AdminScreen';

export default function App() {
  const [tab, setTab] = useState<TabId>('mecz');
  const [push, setPush] = useState<string | null>(null);

  const dismissPush = useCallback(() => setPush(null), []);

  return (
    <PointsProvider>
      <div className="min-h-screen bg-navy-900 flex justify-center text-white">
        {/* Desktop frame */}
        <div className="relative w-full max-w-[430px] min-h-screen bg-navy-700 shadow-2xl overflow-x-hidden sm:border-x border-white/5">
          {/* Ambient background glow */}
          <div className="fixed inset-0 pointer-events-none max-w-[430px] mx-auto">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gold-400/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-red-400/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 right-0 w-60 h-60 bg-navy-400/10 rounded-full blur-[80px]" />
          </div>

          {/* Content */}
          <div className="relative">
            {push && <PushBanner text={push} onDismiss={dismissPush} />}
            <div className="pt-safe">
              {tab === 'mecz' && <MatchScreen />}
              {tab === 'typer' && <FanZoneScreen />}
              {tab === 'quiz' && <QuizScreen />}
              {tab === 'karta' && <FanCardScreen />}
              {tab === 'druzyna' && <TeamScreen />}
              {tab === 'panel' && <AdminScreen pushHandler={setPush} />}
            </div>
          </div>

          <BottomNav active={tab} onChange={setTab} />
        </div>
      </div>
    </PointsProvider>
  );
}
