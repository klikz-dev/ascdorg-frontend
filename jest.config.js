// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(gql|graphql)$': [
      'jest-transform-graphql',
      { subsequentTransformer: 'next/dist/build/swc/jest-transformer' },
    ],
  },
  moduleDirectories: ['node_modules', '<rootDir>/__test-utils__'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/.storybook/**',
    '!**/__*__/**',
    '!**/*.config.*',
  ],
  // ignore e2e test directory
  modulePathIgnorePatterns: ['<rootDir>/tests/'],
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        pageTitle: 'jest tests',
        publicPath: './test-results',
        filename: 'report.html',
        openReport: true,
      },
    ],
  ],
}

module.exports = createJestConfig(customJestConfig)
