/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
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
  plugins: [require('@tailwindcss/forms')]
}
