require('dotenv').config()

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
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'google-site-verification',
        content: process.env._GOOGLE
      },
      {
        name: 'baidu-site-verification',
        content: process.env._BAIDU
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.styl'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
    { src: '~/plugins/toast.js', ssr: false },
    { src: '~/plugins/viewer.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/vuetify-module
    ['@nuxtjs/vuetify', { optionsPath: '~/config/vuetify.js' }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/pwa',
      {
        icon: true,
        workbox: {},
        meta: {},
        manifest: {
          name: `Lee 's Blog`,
          short_name: `lee的小窝`,
          description: `愿你历尽千帆,归来仍是少年`,
          theme_color: `#6200ea`,
          start_url: `/`,
          display: `standalone`
        }
      }
    ],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/apollo-module
    [
      '@nuxtjs/apollo',
      // Give apollo module option
      {
        includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
        // (Optional) Default 'apollo' definition
        defaultOptions: {
          // See 'apollo' definition
          // For example: default query options
          $query: {
            loadingKey: 'loading',
            fetchPolicy: 'cache-and-network'
          }
        },
        // optional
        watchLoading: '~/config/apollo.loading.js',
        // optional
        errorHandler: '~/config/apollo.error.js',
        // required
        clientConfigs: {
          default: {
            // required
            httpEndpoint: process.env.HTTP_ENDPOINT,
            // optional
            // See https://www.apollographql.com/docs/link/links/http.html#options
            httpLinkOptions: {
              credentials: 'same-origin'
            },
            // Enable Automatic Query persisting with Apollo Engine
            persisting: false // Optional
          }
        }
      }
    ]
  ],
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
    extend(config, ctx) {}
  }
}
