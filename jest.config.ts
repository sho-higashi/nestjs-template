import { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  setupFiles: ['./.jest/jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/cdk'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
};

export default config;
