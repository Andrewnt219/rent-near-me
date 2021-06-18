module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,

    'jest/globals': true,

    'cypress/globals': true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'jsx-a11y',

    'jest',

    'testing-library',

    'cypress',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: [
        '**/cypress/**/__tests__/**/*.[jt]s?(x)',
        '**/cypress/**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      excludedFiles: '**/cypress/**/?(*.)+(spec|test).[jt]s?(x)',
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
    },
  ],
};
