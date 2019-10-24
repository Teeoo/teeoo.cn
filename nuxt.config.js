require(`dotenv`).config()

module.exports = {
  mode: 'universal',
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
    color: '#ff3e12',
    height: '5px'
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/markdown.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    ['@nuxtjs/vuetify', {
      customVariables: ['~/assets/variables.scss'],
      optionsPath: './config/vuetify.options.js'
    }],
    ['@nuxtjs/dotenv', {}]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo'
  ],
  /**
   * apollo config
   */
  apollo: {
    includeNodeModules: true,
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_ENDPOINT,
        httpLinkOptions: {
          credentials: 'same-origin'
        },
      },
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
