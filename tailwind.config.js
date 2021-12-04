/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        518: '518px',
      },
      colors: {
        ...colors,
        primary: '#0E56C0',
        danger: '#C23D13',
        success: '#4CAF50',
        info: '#2D9CDB',
        warning: '#FFC107',
        'fade-ash': '#A6A6A6',
        'dark-blue': '#0B4CAD',
        'dark-gray': '#5C5C5C',
        'light-gray': '#F9F9F9',
        'athens-gray': '#F2F2F5',
        'lynx-white': '#F7F7F7',
        'cyan-blue': '#bcd0ee',
        silver: '#C4C4C4',
        gray: '#F4F8FD',
        whisper: '#E5E5E5',
        'curious-blue': '#38A2DE',
        'tropical-blue': '#c4e3f5',
        sunglow: '#FFC727',
        'light-yellow': '#ffeebe',
        'light-cyan-blue': '#e6e7e8',
        citrus: '#E8EEC2',
        'lime-green': '#E4F5E5',
        'sunset-orange': '#F7A9A0',
        'light-orange': '#FFA900',
        'royal-blue': '#4C3AEF',
        'dark-cyan-blue': '#171819',
        'light-shade-gray': '#dbdbdb',
        'alice-blue': '#F5F9FF',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
