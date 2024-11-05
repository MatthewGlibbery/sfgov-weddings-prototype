/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    '../design-system/**/*.{ts,tsx}',
    '../sfgov/components/**/*.{ts,tsx}'
  ],
  presets: [require('../design-system/tailwind.preset')],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('callout-titles', '& strong:first-child')
      addVariant('link', '& a')
    })
  ]
}
