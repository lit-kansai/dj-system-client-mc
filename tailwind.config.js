/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const generateNeon = (color) => {
  return `0 0 0rem #fff, 0 0 .2rem #fff, 0 0 2rem ${color}, 0 0 0.8rem ${color}, 0 0 2.8rem ${color}, inset 0 0 1.3rem ${color};`
}
const generateDropShadowNeon = (color) => {
  return `0 0 5px ${color}`
}

const generateModalNeon = (color) => {
  return `0 0 0rem #fff, 0 0 .2rem #fff, 0 0 2rem ${color}, 0 0 1rem ${color}, inset 0 0 1.3rem ${color};`
}
const neonBlue = '#3E65F4'
const neonPink = '#DD6BDA'
const neonGreen = '#C8FF7E'
const yellow = '#FFD768'
const whiteYellow = '#FFE08B'
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
      ...defaultColors,
      'neon-blue': neonBlue,
      'neon-pink': neonPink,
      'neon-green': neonGreen,
      yellow,
      whiteYellow,
      'dark-blue': darkBlue,
    },
    boxShadow: {
      'neon-blue': generateNeon(neonBlue),
      'neon-pink': generateNeon(neonPink),
      'neon-green': generateNeon(neonGreen),
      'card-neon-green': '0 0 0.2rem #fff, 0 0 0.8rem #c8ff7e',
      'modal-neon-pink': generateModalNeon(neonPink),
      'modal-neon-blue': generateModalNeon(neonBlue),
      'text-input-neon-blue':
        '0 0 0.8rem #3E65F4, 0 0 0.4rem #3E65F4, inset 0 0 0.3rem #3E65F4',
    },
    dropShadow: {
      'neon-blue': generateDropShadowNeon(neonBlue),
      'neon-pink': generateDropShadowNeon(neonPink),
      'neon-green': generateDropShadowNeon(neonGreen),
    },
    fontFamily: {
      sans: ['"Zen Kaku Gothic Antique"'],
    },
    extend: {
      fontFamily: {
        itim: ['Itim', 'cursive'],
      },
      gridTemplateColumns: {
        'title-and-content': '165px minmax(350px, 1fr)',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
    },
  },
  variants: {
    opacity: ['hover'],
    extend: {},
  },
  plugins: [],
}
//
