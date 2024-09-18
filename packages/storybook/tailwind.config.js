/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    '../design-system/**/*.{ts,tsx}',
    '../sfgov/components/**/*.{ts,tsx}'
  ],
  presets: [require('../design-system/tailwind.preset')]
}
