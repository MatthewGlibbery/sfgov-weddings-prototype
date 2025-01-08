const { i18n } = require('./next-i18next.config')

/** @typedef {import('next/dist/lib/load-custom-routes').Redirect} Redirect */
/** @typedef {import('next/dist/lib/load-custom-routes').Rewrite} Rewrite */

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  images: {
    domains: ['sf.gov', 'localhost', 'via.placeholder.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    remotePatterns: [
      {
        hostname: 'sf.gov',
        protocol: 'https'
      },
      {
        hostname: 'localhost',
        port: '8000',
        protocol: 'http'
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  poweredByHeader: false,
  experimental: {},
  transpilePackages: [
    '../design-system',
    '../../node_modules/lodash/index.js'
  ],
  async headers() {
    /**
     * Set headers on responses, filtered by path and/or header and query string
     * @see https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
     */
    // this pattern matches any path
    const ANY_PATH = '/:path*'
    const CACHE_CONTROL = 'cache-control'
    // by default, cache responses for 10 minutes
    const TTL_DEFAULT = 10 * 60
    return [
      {
        source: ANY_PATH,
        headers: [
          {
            key: CACHE_CONTROL,
            value: `public, max-age=${TTL_DEFAULT}`
          }
        ]
      },
      // don't cache previews
      {
        source: ANY_PATH,
        has: [
          {
            type: 'query',
            key: 'preview',
            value: 'true'
          }
        ],
        headers: [
          {
            key: CACHE_CONTROL,
            value: 'no-store, must-revalidate'
          }
        ]
      }
    ]
  },
  // redirects cause the browser URL to change
  redirects: async () => [
    ...storybookRedirects()
  ],
}

/**
 * These redirects allow storybook to be served at /storybook when its build is
 * output to public/storybook.
 * @returns {Redirect[]}
 */
function storybookRedirects() {
  return [
    {
      source: '/storybook',
      destination: '/storybook/index.html',
      permanent: true
    },
    {
      source: '/iframe.html',
      destination: '/storybook/iframe.html',
      permanent: true
    }
  ]
}