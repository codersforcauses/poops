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
      white: colors.white,
      black: colors.black,
      gray: '#f9f9f9',
      'dark-gray': '#7B7B7B'
    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      dropShadow: {
        default: '0 4px 4px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}
