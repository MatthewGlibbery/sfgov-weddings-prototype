const theme = require('./theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme,
  corePlugins: {
    preflight: false
  }
}
