/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ['@typescript-eslint', 'sfgov', 'react', 'testing-library'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:sfgov/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true
      }
    ],
    'max-len': [
      'warn',
      {
        code: 80,
        ignoreStrings: true,
        ignoreUrls: true
      }
    ],
    'react/jsx-no-leaked-render': 'error',
    'react/no-unescaped-entities': 'warn'
  },
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      rules: {
        // see: https://typescript-eslint.io/rules/prefer-function-type/#examples
        '@typescript-eslint/prefer-function-type': 'error',
        // these rules are great in JS environments, but TS has its own rules
        'import/named': 'off',
        'import/no-unresolved': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        // React overrides
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function'
          }
        ]
      }
    },
    {
      files: '**/*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ]
}
