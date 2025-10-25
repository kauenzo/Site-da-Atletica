import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  turbopack: {
    resolveAlias: {},
    root: __dirname,
  },
  // Configurações para melhorar o hot reload
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  // Configurações de desenvolvimento
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Configurações para desabilitar cache completamente
  headers: async () => [
    {
      source: '/links',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate, max-age=0',
        },
        {
          key: 'Pragma',
          value: 'no-cache',
        },
        {
          key: 'Expires',
          value: '0',
        },
      ],
    },
  ],
  redirects: async () => [],
}

export default nextConfig

