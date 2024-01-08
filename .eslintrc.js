/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    jest: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
  ],
  ignorePatterns: [
    'node_modules',
    'coverage',
    'dist',
    'generated',
    'openapi-spec.json',
    // cdk
    'cdk.out',
    'cdk/**/*.js',
    'cdk/**/*.d.ts',
  ],
  overrides: [
    {
      excludedFiles: ['cdk/**/*.ts'],
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
    {
      files: ['*.json'],
      parserOptions: { sourceType: 'module' },
      rules: { 'comma-dangle': ['off'] },
    },
    {
      // cdk
      files: ['cdk/**/*.ts', 'cdk/**/*.spec.ts'],
      parserOptions: {
        project: './cdk/tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'import',
    'typescript-sort-keys',
    'sonarjs',
    'jest',
    'sort-destructure-keys',
    'sort-keys-fix',
  ],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          memberTypes: ['field'],
          order: 'alphabetically',
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'jest/expect-expect': [
      'error',
      {
        additionalTestBlockFunctions: [],
        assertFunctionNames: ['expect'],
      },
    ],
    'lines-between-class-members': 'error',
    'newline-before-return': 'error',
    'no-console': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          array: true,
          object: false,
        },
        VariableDeclarator: {
          array: true,
          object: true,
        },
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-imports': 'off',
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
};

module.exports = config;
