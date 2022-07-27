/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const generateNeon = (color) => {
  return `0 0 0rem #fff, 0 0 .2rem #fff, 0 0 2rem ${color}, 0 0 0.8rem ${color}, 0 0 2.8rem ${color}, inset 0 0 1.3rem ${color};`
}
const generateDropShadowNeon = (color) => {
  return `0 0 2px ${color}`
}

const generateModalNeon = (color) => {
  return `0 0 0rem #fff, 0 0 .2rem #fff, 0 0 2rem ${color}, 0 0 1rem ${color}, inset 0 0 1.3rem ${color};`
}
const neonBlue = '#3E65F4'
const neonPink = '#DD6BDA'
const neonGreen = '#C8FF7E'
const blue = '#3E65F4'
const yellow = '#FFD768'
const pink = '#F66FF2'
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
      blue,
      yellow,
      pink,
      'dark-blue': darkBlue,
    },
    borderColor: (theme) => ({
      ...theme('colors'),
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'neon-blue': neonBlue,
      'neon-pink': neonPink,
      'neon-green': neonGreen,
    }),
    boxShadow: {
      'neon-blue': generateNeon(neonBlue),
      'neon-pink': generateNeon(neonPink),
      'neon-green': generateNeon(neonGreen),
      'close-button-neon-blue': `0 0 0rem #fff, 0 0 .2rem #fff, 0 0 2rem ${neonBlue}, inset 0 0 1.3rem ${neonBlue};`,
      'text-button-neon-pink': `0 0 0.8rem ${neonPink}`,
      'text-button-hover-neon-pink': `0 0 1.4rem ${neonPink}`,
      'card-neon-pink': `0 0 0.1rem #fff, 0 0 1.4rem ${neonPink}`,
      'card-neon-green': `0 0 0.2rem #fff, 0 0 0.8rem ${neonGreen}`,
      'modal-neon-pink': generateModalNeon(neonPink),
      'modal-neon-blue': generateModalNeon(neonBlue),
      'text-input-neon-blue': `0 0 0.8rem ${blue}, 0 0 0.4rem ${blue}, inset 0 0 0.3rem ${blue}`,
    },
    dropShadow: {
      'neon-blue': generateDropShadowNeon(neonBlue),
      'neon-pink': generateDropShadowNeon(neonPink),
      'neon-green': generateDropShadowNeon(neonGreen),
    },
    fill: {
      'neon-blue': neonBlue,
      'neon-pink': neonPink,
      'neon-green': neonGreen,
    },
    fontFamily: {
      sans: ['"Zen Kaku Gothic Antique"'],
    },
    extend: {
      fontFamily: {
        itim: ['Itim', 'cursive'],
      },
      gridTemplateColumns: {
        'title-and-content': '165px minmax(300px, 1fr)',
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
      zIndex: {
        '-1': '-1',
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
