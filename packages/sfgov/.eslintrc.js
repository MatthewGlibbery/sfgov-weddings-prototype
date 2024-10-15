/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['**/playwright/*.spec.ts', '**/playwright/*.spec.tsx'],
  rules: {
    'array-callback-return': 'warn',
    'import/no-internal-modules': [
      'error',
      {
        forbid: [
          // always use the '@/design-system' specifier (see: tsconfig.json)
          '**/../design-system/**'
        ]
      }
    ],
    'no-restricted-imports': ['warn', {
      name: 'react-i18next',
      importNames: ['useTranslation'],
      message: `import useTranslation from 'next-i18next' (not 'react-i18next')`
    }],
    'react/no-danger': 'error'
  }
}
