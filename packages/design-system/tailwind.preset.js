const theme = require('./theme')
const plugin = require('tailwindcss/plugin')
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff">
  <path d="M5.75015 16.755C5.58585 16.7555 5.42306 16.7236 5.27117 16.6609C5.11927 16.5983 4.98128 16.5062 4.86515 16.39L0.365151 11.89C0.245937 11.7745 0.150915 11.6364 0.0856288 11.4838C0.0203424 11.3312 -0.0139012 11.1672 -0.0151039 11.0012C-0.0163066 10.8352 0.0155557 10.6707 0.0786239 10.5172C0.141692 10.3636 0.234703 10.2242 0.352231 10.107C0.469758 9.98982 0.609449 9.8972 0.763151 9.83457C0.916854 9.77193 1.08149 9.74054 1.24746 9.74221C1.41342 9.74388 1.57739 9.77859 1.7298 9.84431C1.88221 9.91002 2.02001 10.0054 2.13515 10.125L5.75015 13.74L17.8702 1.61998C18.1062 1.39259 18.4222 1.26702 18.7499 1.27033C19.0777 1.27363 19.391 1.40553 19.6225 1.63763C19.8539 1.86973 19.9849 2.18344 19.9873 2.51121C19.9897 2.83897 19.8632 3.15455 19.6352 3.38998L6.63515 16.39C6.51902 16.5062 6.38103 16.5983 6.22914 16.6609C6.07724 16.7236 5.91445 16.7555 5.75015 16.755Z"/>
</svg>
`
const completedIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="16" height="16" rx="8" fill="${theme.colors.success400}"/>
<rect x="1" y="1" width="16" height="16" rx="8" stroke="${theme.colors.success400}" stroke-width="2"/>
<path d="M4.1875 10.0833L7 13L14 5" stroke="#FCFCFC" stroke-width="2"/>
</svg>`

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
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            checkIcon
          )}")`,
          backgroundColor: `${theme.colors.primary500}`,
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        },
        '.panel-completed': {
          width: '18px',
          height: '18px',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            completedIcon
          )}")`,
          backgroundSize: '18px 18px',
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
