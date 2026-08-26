/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        blue: '#385da2',
        red: '#cd1e2b',
        green: '#2d7d3f',
        white: '#fff',
        'light-gray': '#f4f5f6',
        'mid-gray-1': '#cccabf',
        'mid-gray-2': '#474641',
        'dark-gray': '#292825',
        'mid-dark': '#33333d',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
};
