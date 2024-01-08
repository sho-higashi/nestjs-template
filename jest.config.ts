import { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  setupFiles: ['./.jest/jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: 'src.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
};

export default config;
