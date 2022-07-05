/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
      facebook: '#4267B2',
      twitter: '#00ACEE',
      googleblue: '#4285F4',
      googlegreen: '#34A853',
      googleyellow: '#FBBC05',
      googlered: '#EA4335',
      applegrey: '#A2AAAD',
      microsoftblue: '#00A4EF',
      yahoopurple: '#430297'

    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
