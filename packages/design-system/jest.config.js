/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfig = require('./tsconfig.json')

const moduleNameMapper = Object.fromEntries(
  Object.entries(tsConfig.compilerOptions.paths).map(([alias, [path]]) => [
    `^${alias.replace('*', '(.*)')}$`,
    path
      .replace(/^..\//, '<rootDir>/../')
      .replace(/^.\//, '<rootDir>/')
      .replace('/*', '/$1')
  ])
)

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  ci: !!process.env.CI,
  coverageThreshold: {
    global: {
      lines: 100,
      functions: 100,
      statements: 100,
      branches: 90
    }
  },
  collectCoverageFrom: ['<rootDir>/components/**/*.tsx'],
  moduleNameMapper,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/browser/', '/dist/'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the
// Next.js config, which is async
module.exports = customJestConfig
