const pxMap = require('./utils')

const fontFamily = {
  body: 'var(--font-sans)',
  sans: 'var(--font-sans)',
  slab: 'var(--font-slab)',
  monospace: 'var(--font-mono)',
  chinese: 'var(--font-chinese)'
}

const lineHeight = {
  auto: 'AUTO',
  ...pxMap([52, 44, 40, 36, 32, 28, 24, 20, 16])
}

const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  boldChinese: 500
}

const fontSize = {
  small: ['14px', '24px'],
  h1: ['36px', '24px'],
  h2: ['32px', '24px'],
  h3: ['26px', '24px'],
  h4: ['20px', '24px'],
  h6: ['16px', '24px'],
  'desktop-display-xxxl': [
    '48px',
    {
      lineHeight: lineHeight['52'],
      letterSpacing: '0px',
      fontWeight: fontWeight.semibold
    }
  ],
  'desktop-display-lg': [
    '20px',
    {
      lineHeight: lineHeight['28'],
      letterSpacing: '0px',
      fontWeight: fontWeight.normal
    }
  ],
  'desktop-heading-xxl': [
    '40px',
    {
      lineHeight: lineHeight['52'],
      letterSpacing: '0px',
      fontWeight: fontWeight.medium
    }
  ],
  'desktop-heading-xl': [
    '24px',
    {
      lineHeight: lineHeight['44'],
      letterSpacing: '0px',
      fontWeight: fontWeight.semibold
    }
  ],
  'desktop-heading-lg': [
    '24px',
    {
      lineHeight: lineHeight['32'],
      letterSpacing: '0px',
      fontWeight: fontWeight.medium
    }
  ],
  'desktop-heading-md': [
    '18px',
    {
      lineHeight: lineHeight['24'],
      letterSpacing: '0px',
      fontWeight: fontWeight.bold
    }
  ],
  'desktop-heading-sm': [
    '16px',
    {
      lineHeight: lineHeight['16'],
      letterSpacing: '0px',
      fontWeight: fontWeight.extrabold
    }
  ],
  'desktop-heading-xs': [
    '14px',
    {
      lineHeight: lineHeight['16'],
      letterSpacing: '0px',
      fontWeight: fontWeight.light
    }
  ],
  'desktop-body': [
    '16px',
    {
      lineHeight: lineHeight['24'],
      letterSpacing: '0px',
      fontWeight: fontWeight.normal
    }
  ],
  'desktop-label': [
    '14px',
    {
      lineHeight: lineHeight.auto,
      letterSpacing: '0px',
      fontWeight: fontWeight.normal
    }
  ],
  'display-xxxl': [
    '32px',
    {
      lineHeight: lineHeight['40'],
      letterSpacing: '0px',
      fontWeight: fontWeight.semibold
    }
  ],
  'display-lg': [
    '20px',
    {
      lineHeight: lineHeight['24'],
      letterSpacing: '0px',
      fontWeight: fontWeight.normal
    }
  ],
  'heading-xxl': [
    '40px',
    {
      lineHeight: lineHeight['52'],
      letterSpacing: '0px',
      fontWeight: fontWeight.medium
    }
  ],
  'heading-xl': [
    '20px',
    {
      lineHeight: lineHeight['28'],
      letterSpacing: '0px',
      fontWeight: fontWeight.semibold
    }
  ],
  'heading-lg': [
    '20px',
    {
      lineHeight: lineHeight['28'],
      letterSpacing: '0px',
      fontWeight: fontWeight.medium
    }
  ],
  'heading-md': [
    '20px',
    {
      lineHeight: lineHeight['28'],
      letterSpacing: '0px',
      fontWeight: fontWeight.bold
    }
  ],
  'heading-sm': [
    '16px',
    {
      lineHeight: lineHeight['16'],
      letterSpacing: '0px',
      fontWeight: fontWeight.extrabold
    }
  ],
  'heading-xs': [
    '14px',
    {
      lineHeight: lineHeight['16'],
      letterSpacing: '0px',
      fontWeight: fontWeight.light
    }
  ],
  body: [
    '16px',
    {
      lineHeight: lineHeight['24'],
      letterSpacing: '0px',
      fontWeight: fontWeight.normal
    }
  ],
  label: [
    '14px',
    {
      lineHeight: lineHeight['24'],
      letterSpacing: '0px',
      fontWeight: fontWeight.normal
    }
  ]
}

module.exports = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight
}
