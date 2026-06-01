/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Popular Peptides brand palette — light clinical medical
        bg: {
          primary: '#F8FAFC',
          secondary: '#FFFFFF',
          tertiary: '#EEF2F7',
          elevated: '#E2EAF4',
        },
        brand: {
          cyan: '#0284C7',
          'cyan-dim': '#0369A1',
          'cyan-glow': '#0284C720',
          green: '#059669',
          'green-dim': '#047857',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          accent: '#0284C7',
        },
        border: {
          subtle: '#E2E8F0',
          default: '#CBD5E1',
          bright: '#0284C740',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(2,132,199,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.05) 1px, transparent 1px)",
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(2,132,199,0.08) 0%, transparent 60%)',
        'card-glow': 'radial-gradient(ellipse at top, rgba(2,132,199,0.05) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        }
      },
      boxShadow: {
        'cyan-sm': '0 0 10px rgba(2,132,199,0.15)',
        'cyan-md': '0 0 20px rgba(2,132,199,0.2)',
        'cyan-lg': '0 0 40px rgba(2,132,199,0.15)',
        'card': '0 2px 12px rgba(15,23,42,0.08), 0 1px 0 rgba(255,255,255,0.8) inset',
      }
    },
  },
  plugins: [],
}
