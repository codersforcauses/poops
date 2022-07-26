/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')
import withPWA from 'next-pwa'

// module.exports = withPWA({
const nextConfig = withPWA({
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

export default nextConfig
