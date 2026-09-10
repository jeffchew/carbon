/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @type {import('jest').Config} */
export default {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.spec.ts',
    '<rootDir>/src/**/*.spec.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/esm2022/', '/fesm2022/'],
  // e2e tests run via Playwright, not Jest
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@carbon/web-components|lit|@lit|@floating-ui)',
  ],
  passWithNoTests: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/**/*.spec.ts'],
};
