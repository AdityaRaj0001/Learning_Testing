import type { Config } from 'jest';
import nextJest from 'next/jest';

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true, // Automatically resets mock state between tests
  // Since you are using the Pages Router, you might want to specifically target test files
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
