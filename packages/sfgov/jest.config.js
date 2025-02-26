/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')
const tsConfig = require('./tsconfig.json')

const aliases = Object.fromEntries(
  Object.entries(tsConfig.compilerOptions.paths).map(([alias, [path]]) => [
    `^${alias.replace('*', '(.*)')}$`,
    path
      .replace(/^..\//, '<rootDir>/../')
      .replace(/^.\//, '<rootDir>/')
      .replace('/*', '/$1')
  ])
)

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to
  // load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  ci: !!process.env.CI,
  coverageThreshold: {
    global: {
      lines: 100,
      functions: 100,
      statements: 100,
      branches: 80
    }
  },
  collectCoverageFrom: [
    'middleware.ts',
    '<rootDir>/components/**/*.tsx',
    '<rootDir>/lib/**/*.{js,ts,tsx}',
    // FIXME: there's no good way to cover these in tests
    '!<rootDir>/**/ErrorBoundary.tsx',
    '!<rootDir>/**/GoogleFonts.tsx'
  ],
  globals: {
    google: {
      maps: {
        MapTypeId: {
          ROADMAP: 'roadmap'
        }
      }
    }
  },
  moduleNameMapper: {
    ...aliases
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/browser/', '/playwright/']
}

// createJestConfig is exported this way to ensure
// that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
