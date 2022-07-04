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
      primary: '#ce283d',
      'dark-red': '#a52a2a',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: '#f9f9f9',
      'dark-gray': '#7B7B7B'
    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans]
      },
      dropShadow: {
        'default': '0 4px 4px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tw-elements/dist/plugin')]
}
