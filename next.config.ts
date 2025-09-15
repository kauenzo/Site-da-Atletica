import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  turbopack: {
    resolveAlias: {},
    root: __dirname,
  },
  redirects: async () => [],
}

export default nextConfig

