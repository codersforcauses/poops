import withPWA from 'next-pwa'
import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const url = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    appDir: false
  },
  rewrites: [
    {
      source: '/__/auth/:path*',
      destination: `https://${url}/__/auth/:path*`
    }
  ]
}

const PWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
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
