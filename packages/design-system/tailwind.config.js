/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./**/*.{ts,tsx}'],
  theme: {
    extend: {}
  },
  presets: [require('./tailwind.preset')]
}
