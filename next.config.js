/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true
  },

  eslint: {
    dirs: ['src']
  },

  reactStrictMode: true,

  swcMinify: true,
  experimental: {
    optimizeCss: true
  }

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },
})
