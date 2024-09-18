module.exports = {
  presets: [
    // enables modules
    '@babel/preset-env',
    // enables typescript
    '@babel/preset-typescript',
    // enables vhtml via jsx runtime
    ['@babel/preset-react', {
    }]
  ]
}