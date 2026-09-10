import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vermelho: {
          DEFAULT: '#E51E25',
          hover: '#C3141B',
          light: '#FF4D53',
        },
        preto: {
          DEFAULT: '#0B0D10',
          card: '#12161D',
          elevated: '#181D26',
        },
        ambar: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        grafite: {
          DEFAULT: '#1E293B',
          card: '#27354A',
          border: '#334155',
          light: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
