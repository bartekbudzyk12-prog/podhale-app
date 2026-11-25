import { createContext, useContext, useState, type ReactNode } from 'react';
import { ECONOMY } from './economy';

interface PointsCtx {
  points: number;
  addPoints: (n: number) => void;
  spendPoints: (n: number) => boolean;
}

const Ctx = createContext<PointsCtx | null>(null);

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState<number>(ECONOMY.startingBalance);
  const addPoints = (n: number) => setPoints(p => p + n);
  const spendPoints = (n: number) => {
    let ok = false;
    setPoints(p => {
      if (p >= n) { ok = true; return p - n; }
      return p;
    });
    return ok;
  };
  return <Ctx.Provider value={{ points, addPoints, spendPoints }}>{children}</Ctx.Provider>;
}

export function usePoints() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePoints must be used within PointsProvider');
  return ctx;
}
