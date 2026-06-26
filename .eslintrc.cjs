module.exports = {
  root: true,
  env: { node: true, browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  overrides: [
    {
      files: ['packages/frontend/**/*.tsx'],
      extends: ['plugin:react-hooks/recommended'],
    },
    {
      files: ['packages/backend/**/*.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
    {
      files: ['packages/shared/**/*.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
  ],
  ignorePatterns: ['dist', 'node_modules', '*.js', '*.mjs'],
};
