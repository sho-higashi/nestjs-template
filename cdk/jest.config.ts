import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
};

export default config;
