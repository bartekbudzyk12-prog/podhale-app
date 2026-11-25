import { Home, Trophy, Brain, CreditCard, MoreHorizontal } from 'lucide-react';

export type TabId =
  | 'mecz'
  | 'typer'
  | 'quiz'
  | 'karta'
  | 'wiecej'
  | 'konto'
  | 'hala'
  | 'druzyna'
  | 'panel';

interface Tab {
  id: TabId;
  label: string;
  icon: typeof Home;
}

const TABS: Tab[] = [
  { id: 'mecz', label: 'Mecz', icon: Home },
  { id: 'typer', label: 'Typer', icon: Trophy },
  { id: 'quiz', label: 'Quizy', icon: Brain },
  { id: 'karta', label: 'Karta', icon: CreditCard },
  { id: 'wiecej', label: 'Więcej', icon: MoreHorizontal },
];

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ active, onChange }: Props) {
  const isMoreActive =
    active === 'wiecej' ||
    active === 'konto' ||
    active === 'hala' ||
    active === 'druzyna' ||
    active === 'panel';

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-navy-900/95 backdrop-blur-md border-t border-white/10 pb-safe">
      <div className="grid grid-cols-5 h-16">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = id === 'wiecej' ? isMoreActive : active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-gold-400' : 'text-white/60 hover:text-white/90'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold-400 rounded-full" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
