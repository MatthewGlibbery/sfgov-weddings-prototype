import { defineConfig, devices } from '@playwright/experimental-ct-react'
import importCss from 'rollup-plugin-import-css'
import path from 'path'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright',
  /* The base directory, relative to
  the config file, for snapshot files
  created with toMatchSnapshot and toHaveScreenshot. */
  testMatch:
    /(agency|campaign|data-story|home-page|information|location|profile|report|resource-collection|step-by-step|news|meeting|transaction|event|about|form|location|home-page|topic).spec.tsx/,
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you
  accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
    ctViteConfig: {
      build: {
        commonjsOptions: {
          include: [/next\.config/, /node_modules/]
        },
        rollupOptions: {
          plugins: [
            importCss({
              include: ['**/*.css']
            })
          ]
        }
      },
      resolve: {
        alias: {
          '@/design-system': path.resolve(
            __dirname,
            '../../packages/design-system/index.ts'
          ),
          '@/components': path.resolve(__dirname, './components'),
          '@/lib': path.resolve(__dirname, './lib'),
          '@/types': path.resolve(__dirname, './types'),
          'next/router': path.resolve(__dirname, './__mocks__/next/router.ts'),
          'next/link': path.resolve(__dirname, './__mocks__/next/link.tsx'),
          'next/font/google': path.resolve(
            __dirname,
            './__mocks__/next/font/google/index.ts'
          ),
          '../../tailwind.config.js': path.resolve(
            __dirname,
            './__mocks__/tailwind.config.ts'
          )
        }
      }
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ]
})
