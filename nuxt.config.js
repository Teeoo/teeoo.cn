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
    '@nuxtjs/pwa',
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
    extend(config, ctx) {}
  }
}
