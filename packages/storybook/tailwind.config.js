/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    '../design-system/**/*.{ts,tsx}',
    '../sfgov/components/**/*.{ts,tsx}',
    '!/node_modules/'
  ],
  presets: [require('../design-system/tailwind.preset')]
}
