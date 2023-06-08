/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    'react/no-danger': 'error',
    'import/no-internal-modules': ['error', {
      forbid: [
        // always use the '@/design-system' specifier (see: tsconfig.json)
        '**/../design-system/**'
      ]
    }]

  }
}
