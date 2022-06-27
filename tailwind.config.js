/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'poops-red': '#ce283d',
      'poops-dark-red': '#a52a2a',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000'
    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tw-elements/dist/plugin')]
}
