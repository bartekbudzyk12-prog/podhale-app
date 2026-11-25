interface BadgeProps {
  text: string;
  color?: 'gold' | 'red' | 'navy';
  size?: 'sm' | 'md';
}

export function Badge({ text, color = 'gold', size = 'sm' }: BadgeProps) {
  const colors = {
    gold: 'bg-gold-400/15 text-gold-300 border-gold-400/30',
    red: 'bg-red-400/15 text-red-200 border-red-400/30',
    navy: 'bg-navy-300/15 text-navy-100 border-navy-300/30',
  };
  const sizes = { sm: 'text-[10px] px-2 py-0.5', md: 'text-xs px-2.5 py-1' };
  return (
    <span className={`inline-flex items-center rounded-full border font-semibold uppercase tracking-wider ${colors[color]} ${sizes[size]}`}>
      {text}
    </span>
  );
}
