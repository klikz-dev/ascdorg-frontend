// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = {
  generateEtags: false,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
  images: {
    domains: ['images.ctfassets.net', 'library.ascd.org'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap/',
      },
    ]
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1,
  },
}

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true }
)
