/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  rules: {
    'react/no-danger': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-internal-modules': [
      'error',
      {
        forbid: [
          '@/**',
          'next',
          'next/*',
          // this should only be imported in utils.tsx, where we re-export it
          '@tw-classed/react'
        ]
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: "fake"
    }],
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-import-type-side-effects': 'error',
  }
}
