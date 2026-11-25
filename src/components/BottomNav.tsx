import { Home, Trophy, CreditCard, Users, Shield, Brain } from 'lucide-react';

export type TabId = 'mecz' | 'typer' | 'quiz' | 'karta' | 'druzyna' | 'panel';

interface Tab {
  id: TabId;
  label: string;
  icon: typeof Home;
}

const TABS: Tab[] = [
  { id: 'mecz', label: 'Mecz', icon: Home },
  { id: 'typer', label: 'Typer & MVP', icon: Trophy },
  { id: 'quiz', label: 'Quizy', icon: Brain },
  { id: 'karta', label: 'Karta Kibica', icon: CreditCard },
  { id: 'druzyna', label: 'Drużyna', icon: Users },
  { id: 'panel', label: 'Panel Klubu', icon: Shield },
  { id: 'panel', label: 'Panel Klubu', icon: Shield },
  { id: 'hala', label: 'Hala', icon: Building2 },
];
];

interface Props {
  active: TabId;
  onChange: (id: TabId) => void;
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pb-safe">
      <div className="glass border-t border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-around px-0.5 pt-1.5 pb-2">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="flex flex-col items-center gap-0.5 px-0.5 py-1 relative transition-all active:scale-90 min-w-0 flex-1"
              >
                <div className={`relative flex items-center justify-center transition-all ${isActive ? 'scale-110' : ''}`}>
                  {isActive && <div className="absolute inset-0 bg-gold-400/20 rounded-xl blur-md" />}
                  <Icon className={`w-5 h-5 relative transition-colors ${isActive ? 'text-gold-400' : 'text-gray-500'}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[7.5px] font-medium uppercase tracking-tight transition-colors truncate w-full text-center ${isActive ? 'text-gold-400' : 'text-gray-500'}`}>
                  {tab.label}
                </span>
                {isActive && <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-gold-400 rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
