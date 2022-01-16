/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      spacing: {
        518: '518px',
      },
      colors: {
        ...colors,
        primary: '#000050',
        danger: '#E72525',
        success: '#3FF50F',
        warning: '#FFC107',
        gray: '#666666',
        royalblue: '#3F3CD7',
        lightblue: '#C5CCFF',
        'border-gray': '#C6C5E0',
        dimgray: '#686868',
        darkslategray: '#2E282A',
        whitesmoke: '#f3f3f6',
        mediumblue: '#1612D3',
        lightsteelblue: '#bcbbe1',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
