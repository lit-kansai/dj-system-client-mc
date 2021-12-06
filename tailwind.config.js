/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const generateNeon = (color) => {
  return `0 0 0rem #fff, 0 0 .2rem #fff, 0 0 2rem ${color}, 0 0 0.8rem ${color}, 0 0 2.8rem ${color}, inset 0 0 1.3rem ${color};`
}

const neonBlue = '#3E65F4'
const neonPink = '#DD6BDA'
const neonGreen = '#C8FF7E'
const darkBlue = '#040B15'

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './constants/**/*.ts',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#FCFFF6',
      'neon-blue': neonBlue,
      'neon-pink': neonPink,
      'neon-green': neonGreen,
      'dark-blue': darkBlue,
    },
    boxShadow: {
      'neon-blue': generateNeon(neonBlue),
      'neon-pink': generateNeon(neonPink),
      'neon-green': generateNeon(neonGreen),
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
