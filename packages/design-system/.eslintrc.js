/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  rules: {
    'import/no-internal-modules': ['error', {
      forbid: [
        '@/**',
        'next',
        'next/*'
      ]
    }]
  }
}
