import { Configuration } from 'webpack'
import { join, dirname, resolve } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config = {
  stories: [
    './stories/**/*.mdx',
    './stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-styling-webpack'),
    getAbsolutePath('@storybook/addon-mdx-gfm')
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (config: Configuration) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/design-system': resolve(__dirname, '../../design-system'),
        '@/sfgov': resolve(__dirname, '../../sfgov/components'),
        '@/components': resolve(__dirname, '../../sfgov/components'),
        '@/lib': resolve(__dirname, '../../sfgov/lib'),
        '@/constants': resolve(__dirname, '../../sfgov/constants')
      }
    }
    return config
  }
}
export default config
