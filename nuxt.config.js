const colors = require('vuetify/es5/util/colors').default

require('dotenv').config()

module.exports = {
  mode: 'universal',

  modern: true,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ff5722'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuetify.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo'
  ],

  apollo: {
    includeNodeModules: true,
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler: '~/plugins/apollo-error.js',
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_ENDPOINT,
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        wsEndpoint: process.env.WS_ENDPOINT,
        persisting: false,
        websocketsOnly: false
      },
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimizeCSS: true,
    cssSourceMap: true,
    // maxChunkSize: 100000,
    extractCSS: true,
    optimization: {
      // minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        cacheGroups: {},
        minSize: 100000,
        maxSize: 100000
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
