/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: [
    '@typescript-eslint',
    'sfgov',
    'react',
    'testing-library'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:sfgov/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'max-len': ['warn', {
      code: 80
    }],
    'react/jsx-no-leaked-render': 'error',
    'react/no-unescaped-entities': 'warn'
  },
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      rules: {
        'import/named': 'off',
        'import/no-unresolved': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off'
      }
    },
    {
      files: '**/*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
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
