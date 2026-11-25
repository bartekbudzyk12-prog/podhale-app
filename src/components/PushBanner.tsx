import { Bell, X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  text: string;
  onDismiss: () => void;
}

export function PushBanner({ text, onDismiss }: Props) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[300] pt-safe animate-slide-down">
      <div className="m-2 rounded-2xl glass-gold border-gold-400/30 p-3 flex items-center gap-3 shadow-2xl glow-gold">
        <div className="w-9 h-9 rounded-xl bg-gold-400 flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 text-navy-900" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">PODHALE NOWY TARG</p>
          <p className="text-[13px] text-white font-medium leading-snug">{text}</p>
        </div>
        <button onClick={onDismiss} className="p-1 rounded-full hover:bg-white/10 shrink-0">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
