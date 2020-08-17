module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier'
  ],
  globals: {
    cy: 'readonly',
    Cypress: 'readonly',
    React: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'jest'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],
    semi: ['warn', 'always'],
    'import/no-unresolved': 'off',
    'prettier/prettier': 'error',
    'no-extra-semi': 'error',
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-children-prop': 'warn',
    'react/no-unescaped-entities': 'off'
  }
};
