/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src']
  },

  reactStrictMode: true,

  swcMinify: true,
  experimental: {
    optimizeCss: true
  },

  // Uncoment to add domain whitelist
  images: {
    domains: ['res.cloudinary.com']
  }
}
