import withPWA from 'next-pwa'
import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    appDir: false
  }
}

const PWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true
})

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
})

const config = async ({ defaultConfig }) => {
  const plugins = [PWAConfig, bundleAnalyzerConfig]
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...defaultConfig,
    ...nextConfig
  })
}

export default config
