import path from 'path'
import { NuxtConfig } from '@nuxt/types'

const environment = process.env.NODE_ENV
const environmentSettings = require(`./environments/${environment}.ts`)
const BASE_URL = environmentSettings.BASE_URL || 'http://localhost:3000'

const config: NuxtConfig = {
  telemetry: true,
  ssr: false,

  head: {
    title: 'DJ Gassi',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'DJ Gassi' },
      {
        property: 'og:site_name',
        content: 'DJ Gassi',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'DJ Gassiやで' },
      {
        property: 'og:url',
        content: `${BASE_URL}`,
      },
      { property: 'og:image', content: `${BASE_URL}/ogp.png` },
      { property: 'og:title', content: 'DJ Gassi' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: 'DJ Gassi' },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon-transparent.svg' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/composition-api',
    '@/plugins/axios',
    '@/plugins/nuxtInstance',
    '@/plugins/fontawesome',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: environmentSettings.API_URL,
  },
  env: {
    ...environmentSettings,
    BASE_URL,
  },
  router: {
    middleware: ['auth', 'urlParams'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },
  alias: {
    '@': path.resolve(__dirname),
    '~': path.resolve(__dirname),
  },
}

export default config
