/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E6EBF2',
          100: '#C2CCDB',
          200: '#8FA0BC',
          300: '#5C73A0',
          400: '#345080',
          500: '#1A3358',
          600: '#0F2546',
          700: '#0A1628',
          800: '#070F1C',
          900: '#040810',
        },
        ice: '#FFFFFF',
        gold: {
          50: '#FFF9E0',
          100: '#FFF0B3',
          200: '#FFE680',
          300: '#FFD933',
          400: '#FFD100',
          500: '#E6B800',
          600: '#B38F00',
          700: '#806600',
        },
        red: {
          50: '#FFD9DC',
          100: '#FFA6AC',
          200: '#FF6E78',
          300: '#FF3543',
          400: '#E30613',
          500: '#C00510',
          600: '#99040C',
          700: '#6B0308',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Impact', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-red': 'pulse-red 1.2s ease-in-out infinite',
        'flash-navy': 'flash-navy 0.5s ease-in-out',
        'flash-gold': 'flash-gold 0.5s ease-in-out',
        'flash-red': 'flash-red 0.5s ease-in-out',
        'chant': 'chant 0.8s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 20s linear infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(227,6,19,0.6)', opacity: '1' },
          '50%': { boxShadow: '0 0 0 8px rgba(227,6,19,0)', opacity: '0.85' },
        },
        'flash-navy': {
          '0%, 100%': { backgroundColor: 'rgba(10,22,40,0)' },
          '50%': { backgroundColor: 'rgba(10,22,40,0.9)' },
        },
        'flash-gold': {
          '0%, 100%': { backgroundColor: 'rgba(255,209,0,0)' },
          '50%': { backgroundColor: 'rgba(255,209,0,0.5)' },
        },
        'flash-red': {
          '0%, 100%': { backgroundColor: 'rgba(227,6,19,0)' },
          '50%': { backgroundColor: 'rgba(227,6,19,0.5)' },
        },
        'chant': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
