import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080d10',
        background: '#0b1214',
        surface: '#0e1618',
        surface2: '#0b1416',
        border: '#163a41',
        foreground: '#e7f5f2',
        muted: '#B7C8CB', // lighter, still cool-toned
        accent: {
          100: '#ccfbf1',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a'
        },
        warn: '#ffc857',
        ok: '#22c55e',
        no: '#ef4444'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-spacegrotesk)'],
        mono: ['var(--font-dmmono)']
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.25rem' },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.05) inset, 0 10px 30px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgb(20 184 166 / 0.25), 0 10px 40px rgb(20 184 166 / 0.12)',
      },
      backgroundImage: {
        'grid': 'radial-gradient(circle at 1px 1px, rgba(94,234,212,0.10) 1px, transparent 1px)',
        'radial': 'radial-gradient(800px 400px at 50% -10%, rgba(20,184,166,.18), transparent 60%)',
        'aurora': 'linear-gradient(120deg, rgba(20,184,166,.35), rgba(94,234,212,.2), rgba(2,132,199,.22))',
      },
      animation: {
        aurora: 'aurora 12s ease-in-out infinite alternate',
        shimmer: 'shimmer 2.2s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translateX(-10%) translateY(0%) rotate(0deg)' },
          '100%': { transform: 'translateX(10%) translateY(5%) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    }
  },
  plugins: [],
}
export default config