const theme = require('./theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme,
  plugins: [
    require('@thoughtbot/tailwindcss-aria-attributes')
  ]
}
