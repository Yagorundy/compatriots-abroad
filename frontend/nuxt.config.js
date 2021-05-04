if (process.env.NODE_ENV === 'development') {
  require('dotenv-extended').load({ path: '../common/.env' })
}

require('dotenv-expand')({ parsed: process.env })

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Compatriots Abroad',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Custom routing
  router: {
    extendRoutes(routes) {
      routes.push(...[
        { path: '*', redirect: '/' },
        { path: '/', redirect: '/overview' }
      ])
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/services.client.ts',
    '~/plugins/axios.client.ts',
    '~/plugins/error.client.ts'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },

  server: {
    port: process.env.FRONTEND_PORT
  },

  proxy: {
    [process.env.BACKEND_PREFIX]: process.env.BACKEND_URL
  },

  // Environment variables client side
  env: {
    BACKEND_PREFIX: process.env.BACKEND_PREFIX,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
  }
}
