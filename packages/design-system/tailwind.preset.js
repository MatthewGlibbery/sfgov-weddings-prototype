const theme = require('./theme')
const plugin = require('tailwindcss/plugin')

const alertIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="${theme.colors.danger600}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const clockIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.95711 16.7071L13.25 12.4142L13.25 7H11.25L11.25 11.5858L7.54289 15.2929L8.95711 16.7071Z" fill="#0B0C0C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="${theme.colors.black}"/>
</svg>`

const completedIcon = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="16" height="16" rx="8" fill="${theme.colors.success400}"/>
<rect x="1" y="1" width="16" height="16" rx="8" stroke="${theme.colors.success400}" stroke-width="2"/>
<path d="M4.1875 10.0833L7 13L14 5" stroke="#FCFCFC" stroke-width="2"/>
</svg>`

const dropdownIcon = `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 7L10 14L17 7" stroke="#0B0C0C" stroke-width="2"/>
</svg>
`

const infoIcon = `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="7" stroke="${theme.colors.information600}" stroke-width="2"/>
<circle cx="10" cy="7" r="1" transform="rotate(180 10 7)" fill="${theme.colors.information600}"/>
<rect x="11" y="14" width="2" height="4" transform="rotate(180 11 14)" fill="${theme.colors.information600}"/>
</svg>`

const pencilIcon = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.3608 17.6392L0.0515442 18.0515L0.360802 13.6392L14 0L18 4L4.3608 17.6392ZM14 2.82843L15.1716 4L14 5.17157L12.8284 4L14 2.82843ZM2.21176 15.8357L2.30364 14.5248L10.9844 5.84404L12.156 7.01561L3.45482 15.7168L2.21176 15.8357Z" fill="${theme.colors.black}"/>
</svg>`

const removeIcon = `<svg viewBox="0 0 20 20" fill="${theme.colors.white}" xmlns="http://www.w3.org/2000/svg">
<path d="M11.77 10l7.115-7.115a1.252 1.252 0 00-1.77-1.77L10 8.23 2.885 1.115a1.252 1.252 0 00-1.77 1.77L8.23 10l-7.115 7.115a1.26 1.26 0 000 1.77 1.255 1.255 0 001.77 0L10 11.77l7.115 7.115a1.255 1.255 0 001.77 0 1.26 1.26 0 000-1.77L11.77 10z"/>
</svg>`

function checkIcon(color) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" 
  d="M22.7311 4.68202L8.02488 20.4387L1.29297 13.7068L2.70718 12.2926L7.97527 17.5607L21.269 3.31738L22.7311 4.68202Z" 
  fill="${color}"/>
  </svg>
  `
}

function rightArrowIcon(color) {
  return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 16L17 10L11 4" stroke="${color}" stroke-width="2"/>
<path d="M2 10L16 10" stroke="${color}" stroke-width="2"/>
</svg>`
}

function rightArrow(color) {
  const svg = rightArrowIcon(color)
  return iconStyle(svg, 20)
}

function iconStyle(svg, size) {
  return {
    width: `${size}px !important`,
    height: `${size}px !important`,
    backgroundImage: svgBackgroundImage(svg),
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
}

function svgBackgroundImage(icon) {
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(icon)}")`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme,
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@thoughtbot/tailwindcss-aria-attributes'),
    plugin(({ addVariant, addUtilities }) => {
      addVariant('callout-titles', '& strong:first-child')
      addVariant('link', '& a')
      addUtilities({
        '.bg-check-white': {
          backgroundImage: svgBackgroundImage(
            checkIcon(`${theme.colors.white}`)
          ),
          backgroundColor: `${theme.colors.primary500}`,
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.check-shadow-inner': {
          'box-shadow': 'inset -.005rem -.005rem 0 .45rem white'
        },
        '.dropdown-open': {
          backgroundImage: svgBackgroundImage(dropdownIcon),
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.alert-icon': iconStyle(alertIcon, 24),
        '.clock-icon': iconStyle(clockIcon, 24),
        '.info-icon': iconStyle(infoIcon, 24),
        '.pencil-icon': iconStyle(pencilIcon, 18),
        '.success-icon': iconStyle(checkIcon(`${theme.colors.success600}`), 24),
        '.panel-completed': iconStyle(completedIcon, 18),
        '.remove-icon': iconStyle(removeIcon, 20),
        '.right-arrow-blue': rightArrow(`${theme.colors.primary600}`),
        '.right-arrow-white': rightArrow(`${theme.colors.white}`),
        '.right-arrow-disabled': rightArrow(`${theme.colors.neutral200}`)
      })
    })
  ]
}
