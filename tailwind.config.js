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
        // Popular Peptides brand palette — dark clinical premium
        bg: {
          primary: '#080A0F',
          secondary: '#0D1117',
          tertiary: '#13181F',
          elevated: '#1A2030',
        },
        brand: {
          cyan: '#00D4FF',
          'cyan-dim': '#00A8CC',
          'cyan-glow': '#00D4FF33',
          green: '#00FF9D',
          'green-dim': '#00CC7A',
        },
        text: {
          primary: '#F0F4FF',
          secondary: '#8892A4',
          muted: '#4A5568',
          accent: '#00D4FF',
        },
        border: {
          subtle: '#1E2A3A',
          default: '#243040',
          bright: '#00D4FF40',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,212,255,0.15) 0%, transparent 60%)',
        'card-glow': 'radial-gradient(ellipse at top, rgba(0,212,255,0.08) 0%, transparent 60%)',
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
        'cyan-sm': '0 0 10px rgba(0,212,255,0.2)',
        'cyan-md': '0 0 20px rgba(0,212,255,0.3)',
        'cyan-lg': '0 0 40px rgba(0,212,255,0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
      }
    },
  },
  plugins: [],
}
