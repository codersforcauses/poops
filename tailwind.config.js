/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
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
      yahoopurple: '#430297',
      gray: '#f9f9f9',
      'dark-gray': '#7B7B7B',
      'zinc-200': '#F2F2F2',
      'zinc-300': '#D9D9D9',
      'zinc-50': '#FFFFFF'

    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      dropShadow: {
        default: '0 4px 4px rgba(0, 0, 0, 0.25)'
      },
      animation: {
        text: 'text 5s ease infinite'
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% ',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200%',
            'background-position': 'right center'
          }
        },
        white: colors.white,
        black: colors.black
      }
    },
    plugins: [require('@tailwindcss/forms')]
  }
}
