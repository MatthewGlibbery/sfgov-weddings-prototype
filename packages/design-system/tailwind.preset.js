const theme = require('./theme')
const plugin = require('tailwindcss/plugin')
const checkIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" 
d="M22.7311 4.68202L8.02488 20.4387L1.29297 13.7068L2.70718 12.2926L7.97527 17.5607L21.269 3.31738L22.7311 4.68202Z" 
fill="${theme.colors.white}"/>
</svg>
`
const completedIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="16" height="16" rx="8" fill="${theme.colors.success400}"/>
<rect x="1" y="1" width="16" height="16" rx="8" stroke="${theme.colors.success400}" stroke-width="2"/>
<path d="M4.1875 10.0833L7 13L14 5" stroke="#FCFCFC" stroke-width="2"/>
</svg>`

const dropdownIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 7L10 14L17 7" stroke="#0B0C0C" stroke-width="2"/>
</svg>
`

const removeIcon = `<svg viewBox="0 0 20 20" fill="${theme.colors.white}" height="20" xmlns="http://www.w3.org/2000/svg">
<path d="M11.77 10l7.115-7.115a1.252 1.252 0 00-1.77-1.77L10 8.23 2.885 1.115a1.252 1.252 0 00-1.77 1.77L8.23 10l-7.115 7.115a1.26 1.26 0 000 1.77 1.255 1.255 0 001.77 0L10 11.77l7.115 7.115a1.255 1.255 0 001.77 0 1.26 1.26 0 000-1.77L11.77 10z"/>
</svg>`

function svgBackgroundImage(icon) {
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(icon)}")`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme,
  plugins: [
    require('@thoughtbot/tailwindcss-aria-attributes'),
    plugin(({ addVariant, addUtilities }) => {
      addVariant('callout-titles', '& strong:first-child')
      addVariant('link', '& a')
      addUtilities({
        '.bg-check-white': {
          backgroundImage: svgBackgroundImage(checkIcon),
          backgroundColor: `${theme.colors.primary500}`,
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.panel-completed': {
          width: '18px',
          height: '18px',
          backgroundImage: svgBackgroundImage(completedIcon),
          backgroundSize: '18px 18px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.dropdown-open': {
          backgroundImage: svgBackgroundImage(dropdownIcon),
          backgroundColor: `${theme.colors.white}`,
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.remove-icon': {
          width: '20px',
          height: '20px',
          backgroundImage: svgBackgroundImage(removeIcon),
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.check-shadow-inner': {
          'box-shadow': 'inset -.005rem -.005rem 0 .45rem white'
        }
      })
    })
  ]
}
