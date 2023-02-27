const nextJest = require('next/jest')
const tsConfig = require('./tsconfig.json')

const moduleNameMapper = Object.fromEntries(
  Object.entries(tsConfig.compilerOptions.paths)
    .map(([alias, [path]]) => [
      `^${alias.replace('*', '(.*)')}$`,
      path.replace('./', '<rootDir>/').replace('/*', '/$1')
    ])
)

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  ci: !!process.env.CI,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.tsx',
    '<rootDir>/design-system/components/**/*.tsx',
    '<rootDir>/lib/**/*.{ts,tsx}',
    // FIXME: there's no good way to cover these in tests
    '!<rootDir>/components/ServerStylesheet.tsx',
    '!<rootDir>/design-system/components/GlobalStyle.tsx',
    '!<rootDir>/design-system/components/GoogleFonts.tsx',
    '!<rootDir>/design-system/components/SSRStyle.tsx',
    '!<rootDir>/design-system/components/icons/wrapped.tsx'
  ],
  moduleNameMapper,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/browser/']
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
