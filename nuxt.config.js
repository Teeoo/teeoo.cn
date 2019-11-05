require(`dotenv`).config()
const webpack = require('webpack')

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      {
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
      },
      {
        name: 'google-site-verification',
        content: '2EE4QrPTXaJtHQVmdcq-Gkgj6BEPeIwPYFbDiWdeTI8'
      },
      {
        name: 'baidu-site-verification',
        content: 'CAN00oG0DD'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ff3e12',
    height: '2px'
  },
  /**
   ** cache
   */
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.styl'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
    { src: '~/plugins/viewer.js', ssr: false },
    { src: '@/plugins/prism.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['~/assets/variables.scss'],
        optionsPath: './config/vuetify.options.js'
      }
    ],
    ['@nuxtjs/dotenv', {}]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/pwa',
      {
        icon: true,
        meta: true,
        manifest: {
          name: `Lee\'s Blog`,
          short_name: `lee的小窝`,
          description: `生如夏花之绚烂，死如秋叶之静美`,
          theme_color: `#6200ea`,
          display: `standalone`
        }
      }
    ],
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
        fetchPolicy: 'cache-and-network'
      }
    },
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_ENDPOINT,
        httpLinkOptions: {
          credentials: 'same-origin'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    maxChunkSize: 360000,
    extractCSS: true,
    extend(config, ctx) {},
    babel: {},
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': "jquery'",
        'window.$': 'jquery'
      })
    ]
  }
}
