/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['**/playwright/*.spec.ts', '**/playwright/*.spec.tsx'],
  rules: {
    'react/no-danger': 'error',
    'no-restricted-imports': ['warn', {
      name: 'react-i18next',
      importNames: ['useTranslation'],
      message: `import useTranslation from 'next-i18next' (not 'react-i18next')`
    }],
    'import/no-internal-modules': [
      'error',
      {
        forbid: [
          // always use the '@/design-system' specifier (see: tsconfig.json)
          '**/../design-system/**'
        ]
      }
    ]
  }
}
