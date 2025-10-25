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
  // Configurações de cache para produção
  headers: async () => [
    {
      source: '/links',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
        },
      ],
    },
  ],
  redirects: async () => [],
}

export default nextConfig

