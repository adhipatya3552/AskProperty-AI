/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c0ff',
          300: '#66a0ff',
          400: '#3380ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#fff0e6',
          100: '#ffe0cc',
          200: '#ffc199',
          300: '#ffa166',
          400: '#ff8033',
          500: '#ff6000',
          600: '#cc4d00',
          700: '#993a00',
          800: '#662600',
          900: '#331300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};