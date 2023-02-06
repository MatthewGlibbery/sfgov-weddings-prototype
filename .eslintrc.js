/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: [
    'sfgov',
    'testing-library'
  ],
  extends: [
    'next/core-web-vitals',
    'plugin:sfgov/recommended'
  ],
  rules: {
    'react/no-unescaped-entities': ['off'],
    'react/jsx-no-leaked-render': ['error']
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
