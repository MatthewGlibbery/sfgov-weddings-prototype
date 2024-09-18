/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  presets: [require('./tailwind.preset')]
}
