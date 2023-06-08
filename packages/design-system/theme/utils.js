const px = (n) =>
  (typeof n === 'string') ? n : n === 0 ? '0' : `${n}px`

const pxMap = (values) =>
  values.reduce((o, n) => Object.assign(o, { [n]: px(n) }), {})

module.exports = pxMap
