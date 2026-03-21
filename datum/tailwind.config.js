/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4c4ff',
          300: '#a3a3ff',
          400: '#8080ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          cyan:   '#22d3ee',
          violet: '#a855f7',
          pink:   '#ec4899',
          green:  '#10b981',
        },
        dark: {
          900: '#05050f',
          800: '#0a0a1f',
          700: '#0f0f2d',
          600: '#13132f',
          500: '#1a1a3e',
          400: '#252550',
        },
        light: {
          50:  '#f8f9ff',
          100: '#f0f2ff',
          200: '#e4e8ff',
          300: '#cbd5ff',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'slide-up':     'slideUp 0.6s ease forwards',
        'fade-in':      'fadeIn 0.8s ease forwards',
        'spin-slow':    'spin 12s linear infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'marquee2':     'marquee2 30s linear infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          to:   { boxShadow: '0 0 60px rgba(99,102,241,0.8), 0 0 100px rgba(168,85,247,0.4)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-dark':        'radial-gradient(at 40% 20%, hsla(252,100%,20%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(266,100%,20%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(240,100%,10%,1) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
