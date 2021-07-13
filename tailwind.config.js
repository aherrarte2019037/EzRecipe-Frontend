module.exports = {
  mode: 'jit',
  purge: [ './src/**/*.{html, ts}', './projects/**/*.{html, ts}' ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}