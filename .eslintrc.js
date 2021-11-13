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
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
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
    'no-unused-vars': 'off',
    // Somehow trigger errors for interfaces from dom lib
    'no-undef': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'jsx-a11y/anchor-is-valid': 'off',
    'react/display-name': 'off',
  },
  settings: {
    react: {
      version: 'detect',
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
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
