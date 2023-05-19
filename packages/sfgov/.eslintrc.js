/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    'import/no-internal-modules': ['error', {
      forbid: [
        // always use the '@/design-system' specifier (see: tsconfig.json)
        '**/../design-system/**',
        // always import styled(), etc. from '@/design-system'
        '@stitches/**'
      ]
    }]

  }
}
