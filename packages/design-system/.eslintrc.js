/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  rules: {
    'react/no-danger': 'error',
    'import/no-internal-modules': [
      'error',
      {
        forbid: ['@/**', 'next', 'next/*']
      }
    ]
  }
}
