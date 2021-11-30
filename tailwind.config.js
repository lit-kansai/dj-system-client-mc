const { themeColor } = require('./constants/color')

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: themeColor.TEXT_COLOR,
      'dark-blue': themeColor.BG_COLOR,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
