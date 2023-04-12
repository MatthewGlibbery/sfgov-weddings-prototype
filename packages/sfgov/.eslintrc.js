/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: [
    '@typescript-eslint',
    'sfgov',
    'testing-library'
  ],
  extends: [
    'next/core-web-vitals',
    'plugin:sfgov/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'react/no-unescaped-entities': 'warn',
    'react/jsx-no-leaked-render': 'error',
    'no-unused-vars': 'off',
    'import/no-internal-modules': ['error', {
      forbid: [
        // always use the '@/design-system' specifier (see: tsconfig.json)
        '**/../design-system/**',
        // always import styled(), etc. from '@/design-system'
        '@stitches/**'
      ]
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
