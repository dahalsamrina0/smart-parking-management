/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mukta', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Mukta', 'Inter', 'sans-serif'],
        deva: ['Mukta', '"Noto Sans Devanagari"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Deep Nepal-inspired blue
        himal: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd2ff',
          300: '#8eb4ff',
          400: '#598bff',
          500: '#3366f0',
          600: '#1f4fd6',
          700: '#1a3fad',
          800: '#1b3585',
          900: '#1c2f6a',
          950: '#0e1a3c',
          980: '#0a1430',
          990: '#070f24',
        },
        // Nepal flag red (used sparingly as accent)
        sindur: {
          50: '#fff1f0',
          100: '#ffe0de',
          400: '#f25555',
          500: '#dc143c',
          600: '#c40f33',
          700: '#a30c2b',
        },
        // Temple gold
        pujari: {
          50: '#fffbeb',
          100: '#fef3c7',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        // Status colors
        park: {
          available: '#16a34a',
          reserved: '#dc2626',
          occupied: '#ea580c',
          maint: '#64748b',
        },
        slate2: {
          50: '#f6f8fc',
          100: '#eef2f8',
          200: '#dde5f0',
          300: '#c2cee0',
          400: '#94a6c2',
          500: '#64789b',
          600: '#475b7c',
          700: '#33465f',
          800: '#1f2c40',
          900: '#121b2b',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(14,26,60,0.06), 0 6px 20px rgba(14,26,60,0.06)',
        cardlg: '0 4px 8px rgba(14,26,60,0.06), 0 16px 40px rgba(14,26,60,0.12)',
        glow: '0 0 0 1px rgba(51,102,240,0.25), 0 10px 30px rgba(51,102,240,0.20)',
        gold: '0 0 0 1px rgba(245,158,11,0.3), 0 8px 24px rgba(245,158,11,0.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'flag-wave': {
          '0%,100%': { transform: 'skewX(0deg)' },
          '50%': { transform: 'skewX(-4deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'slide-right': 'slide-right 0.4s ease-out both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.16,1,0.3,1)',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'flag-wave': 'flag-wave 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
