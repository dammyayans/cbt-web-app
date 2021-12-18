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
        primary: '#2A26F4',
        danger: '#D43228',
        success: '#3FF50F',
        warning: '#FFC107',
        gray: '#666666',
        royalblue: '#3F3CD7',
        'border-gray': '#C6C5E0',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
