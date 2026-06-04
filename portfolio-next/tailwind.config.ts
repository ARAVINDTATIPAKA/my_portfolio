import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stone palette
        stone: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        // Cyan (Serious accent)
        cyan: {
          50:  '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        // Lime (Funky accent)
        lime: {
          DEFAULT: '#E8FF6B',
          dark:    '#D4F000',
          deeper:  '#B8D900',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'xs':   '2px',
        'sm':   '4px',
        'md':   '6px',
        'lg':   '8px',
        'xl':   '12px',
        '2xl':  '16px',
        '3xl':  '20px',
        '4xl':  '28px',
        'pill': '999px',
      },
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      animation: {
        'drop-bounce':  'dropBounce 1.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'id-sway':      'idSway 4s ease-in-out infinite',
        'dot-blink':    'dotBlink 2s ease-in-out infinite',
        'marquee':      'marquee 18s linear infinite',
        'pulse-dot':    'pulseDot 2.5s ease-in-out infinite',
        'drift':        'drift 8s ease-in-out infinite',
      },
      keyframes: {
        dropBounce: {
          '0%':   { transform: 'translateY(-480px) rotate(-3deg)', opacity: '0' },
          '50%':  { opacity: '1' },
          '60%':  { transform: 'translateY(28px) rotate(2deg)' },
          '72%':  { transform: 'translateY(-14px) rotate(-1.2deg)' },
          '83%':  { transform: 'translateY(8px) rotate(0.6deg)' },
          '91%':  { transform: 'translateY(-4px) rotate(-0.2deg)' },
          '96%':  { transform: 'translateY(2px) rotate(0.1deg)' },
          '100%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
        },
        idSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%':      { transform: 'rotate(0.7deg)' },
          '75%':      { transform: 'rotate(-0.7deg)' },
        },
        dotBlink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.25' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.4)', opacity: '0.7' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '33%':      { transform: 'translate(30px,-20px)' },
          '66%':      { transform: 'translate(-20px,30px)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out':    'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
