/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fffdf7',
          100: '#fff8ec',
          200: '#fff1d9',
          300: '#ffe5b8',
          400: '#ffd98c',
          500: '#ffc861',
        },
        blush: {
          50: '#fff5f7',
          100: '#ffe9ee',
          200: '#ffd3dd',
          300: '#ffb0c3',
          400: '#ff85a3',
          500: '#ff5c87',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e3f4ff',
          200: '#c7e8ff',
          300: '#a3d8ff',
          400: '#7cc4ff',
          500: '#54a8ff',
        },
        mint: {
          50: '#f0fdf6',
          100: '#dcfbe9',
          200: '#bbf4d4',
          300: '#86e9b3',
          400: '#4fd98c',
          500: '#22c16b',
        },
        sun: {
          50: '#fffceb',
          100: '#fff5c6',
          200: '#ffeb8f',
          300: '#ffdc4d',
          400: '#ffc91f',
          500: '#f5a800',
        },
        lavender: {
          50: '#f7f6ff',
          100: '#ece9ff',
          200: '#ddd7ff',
          300: '#c4baff',
          400: '#a696ff',
          500: '#8a73ff',
        },
        ink: {
          900: '#2b2540',
          800: '#3d3656',
          700: '#4f4670',
          600: '#6b6390',
          500: '#8a83a8',
          400: '#b3adc8',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(79, 70, 112, 0.18)',
        'soft-lg': '0 24px 60px -18px rgba(79, 70, 112, 0.28)',
        glow: '0 0 40px -8px rgba(255, 133, 163, 0.55)',
        inset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        floatBubble: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-110vh) translateX(40px)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        floatBubble: 'floatBubble linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        drift: 'drift linear infinite',
        shimmer: 'shimmer 8s linear infinite',
        breathe: 'breathe 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
