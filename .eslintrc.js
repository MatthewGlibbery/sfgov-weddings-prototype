/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: [
    'sfgov',
    'testing-library',
    'unused-imports'
  ],
  extends: [
    'next/core-web-vitals',
    'plugin:sfgov/recommended'
  ],
  rules: {
    'react/no-unescaped-entities': 'warn',
    'react/jsx-no-leaked-render': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_'
    }]
  },
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      rules: {
        'no-undef': ['off'],
        'import/no-unresolved': ['off'],
        'import/named': ['off']
      }
    },
    {
      files: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
      ],
      extends: ['plugin:testing-library/react']
    }
  ]
}
