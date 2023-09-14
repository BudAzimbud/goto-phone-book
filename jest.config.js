const nextJest = require('next/jest');

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jest-environment-node',
};

const createJestConfig = nextJest({
  dir: './',
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
    '^.+\\.(css)$': '<rootDir>/fileTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!swiper|ssr-window|dom7)'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
})(customJestConfig);

module.exports = async () => {
  const jestConfig = await createJestConfig();

  return { ...jestConfig };
};