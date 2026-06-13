import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#c8102e',
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d5',
          300: '#f7aab3',
          400: '#f17a8b',
          500: '#e64d64',
          600: '#c8102e',
          700: '#a90d27',
          800: '#8c0f24',
          900: '#751123',
          950: '#41040e',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'Impact', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
