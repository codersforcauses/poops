/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#ce283d',
        dark: '#a52a2a'
      },
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      zinc: colors.zinc
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
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class' // only generate classes
    })
  ]
}
