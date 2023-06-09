/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../design-system/components/**/*.{ts,tsx}'
  ],
  presets: [require('../design-system/tailwind.preset')]
}
