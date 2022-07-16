module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' }
    ],

    //#region  //*=========== Unused Import ===========
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    //#endregion  //*======== Unused Import ===========

    //#region  //*=========== Import Sort ===========
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          ['^react$', '^next', '^@?\\w', '^\\u0000'],
          // Lib and hooks
          ['^@lib', '^@hooks'],
          // static data
          ['^@data'],

          // pages
          ['^pages'],
          // components
          ['^@components', '^@container'],
          // zustand store
          ['^@store'],
          // Other imports
          ['^@'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)'
          ],
          ['^@types'],
          // public
          ['^public'],
          // other that didnt fit in
          ['^'],
          // {s}css files
          ['^.+\\.s?css$']
        ]
      }
    ]
    //#endregion  //*======== Import Sort ===========
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'jsx-a11y/anchor-is-valid': 'off'
      }
    }
  ],
  globals: {
    React: true,
    JSX: true
  }
}
