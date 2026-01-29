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

const CI = !!process.env.CI

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  ci: CI,
  coverageThreshold: {
    global: {
      lines: 100,
      functions: 100,
      statements: 100,
      branches: 100
    }
  },
  collectCoverageFrom: [
    '<rootDir>/components/**/*.tsx',
    '<rootDir>/formio/**/*.ts*',
    // FIXME: remove this when we bring back our formio templates
    '!<rootDir>/formio/templates/**',
    '!<rootDir>/formio/components/HoursOfOperation.ts'
  ],
  moduleNameMapper: {
    ...moduleNameMapper,
    '.*\\.css$': '<rootDir>/__mocks__/css.mjs'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/browser/', '/dist/'],
  transform: {
    '.*/formio/templates/.*\\.tsx$': ['babel-jest', {
      extends: './babel.config.js'
    }],
    '^.+\\.(t|j)sx?$': 'ts-jest',
    '.*\\.mjs$': 'babel-jest'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the
// Next.js config, which is async
module.exports = customJestConfig
