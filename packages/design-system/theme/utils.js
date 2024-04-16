const px = (n) => (typeof n === 'string' ? n : n === 0 ? '0' : `${n}px`)

const pxMap = (values) =>
  values.reduce((o, n) => Object.assign(o, { [n]: px(n) }), {})

const tokenMap = (tokens) =>
  Object.keys(tokens).reduce((obj, rule) => {
    const int = parseInt(tokens[rule].value, 10)
    obj[rule] = px(int)
    console.log(obj)
    return obj
  }, {})

module.exports = { pxMap, tokenMap }
