import { dirname, join } from 'path'
import { resolve } from 'node:path'
import type { StorybookConfig } from '@storybook/core/types'
import type { Configuration } from 'webpack'

/**
 * FIXME: these resolve aliases are only necessary for paths that we
 * import _within_ the sfgov package. Stories that import from
 * paths like '@/sfgov/components' are resolved successfully by this
 * package's tsconfig.json, but webpack tries to resolve any imports in
 * _those_ files itself rather than just letting TypeScript do it.
 */
const resolvePaths = Object.fromEntries(
  ['@/components', '@/constants', '@/lib'].map((path) => [
    path,
    resolve(__dirname, path.replace('@/', '../../sfgov/'))
  ])
)

const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {}
  },

  stories: [
    './stories/**/*.mdx',
    './stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  // @ts-expect-error not typed
  webpackFinal: async (config: Configuration) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...resolvePaths
      }
    }
    return config
  }
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
