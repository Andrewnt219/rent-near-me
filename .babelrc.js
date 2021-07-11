// In .babelrc.js
module.exports = {
  presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  plugins: [
    'lodash',
    'babel-plugin-twin',
    'babel-plugin-macros',
    ['styled-components', { ssr: true }],
  ],
};
