export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="drop-shadow-[0_0_8px_rgba(255,209,0,0.3)]">
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE680" />
          <stop offset="50%" stopColor="#FFD100" />
          <stop offset="100%" stopColor="#E6B800" />
        </linearGradient>
      </defs>
      <path d="M50 10 L85 25 V55 Q85 78 50 92 Q15 78 15 55 V25 Z" fill="none" stroke="url(#logoGold)" strokeWidth="3.5" />
      <path d="M50 18 L78 30 V54 Q78 73 50 85 Q22 73 22 54 V30 Z" fill="rgba(255,209,0,0.05)" />
      <text x="50" y="40" fontFamily="Oswald,sans-serif" fontSize="11" fill="#FFD100" textAnchor="middle" fontWeight="600" letterSpacing="1">PODHALE</text>
      <text x="50" y="62" fontFamily="Oswald,sans-serif" fontSize="26" fill="url(#logoGold)" textAnchor="middle" fontWeight="700">P</text>
      <text x="50" y="78" fontFamily="Oswald,sans-serif" fontSize="9" fill="#E30613" textAnchor="middle" fontWeight="600" letterSpacing="1">NOWY TAG</text>
    </svg>
  );
}
