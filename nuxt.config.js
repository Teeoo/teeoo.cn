require(`dotenv`).config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'lee,JavaScript,博客,Node,Vue' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'author', content: 'oo.ee.ooe.teeo@gmail.com' },
      { name: 'renderer', content: 'webkit' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-page-mode', content: 'app' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: process.env.npm_package_name || '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: '2EE4QrPTXaJtHQVmdcq-Gkgj6BEPeIwPYFbDiWdeTI8' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff3e12', height: '2px' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/main.styl',
    {
      src: 'animate.css/animate.css',
      lang: 'css'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
    { src: '~/plugins/viewer.js', ssr: false },
    { src: '~/plugins/prism.js', ssr: false },
    { src: '~/plugins/event.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/vuetify', { optionsPath: './config/vuetify.options.js' }],
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
          name: `Lee 's Blog`,
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
        // fetchPolicy: 'no-cache'
        fetchPolicy: 'cache-and-network'
      }
      // $watchQuery: {
      //   fetchPolicy: 'no-cache',
      // },
    },
    errorHandler: '~/plugins/apolloError.js',
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
    analyze: false,
    maxChunkSize: 360000,
    extractCSS: true,
    optimization: {
      // minimize: true,
      // splitChunks: {
      //   chunks: 'all',
      //   automaticNameDelimiter: '.',
      //   maxAsyncRequests: 7,
      //   cacheGroups: {
      //     vuetify: {
      //       test: /node_modules[\\/]vuetify/,
      //       chunks: 'all',
      //       priority: 20,
      //       name: true
      //     }
      //   }
      // }
    },
    extend(config, ctx) {}
  }
}
