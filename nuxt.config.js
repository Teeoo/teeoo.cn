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
  loading: '~/components/loading.vue',
  // loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.styl'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/filters', ssr: true },
    { src: '~plugins/viewer', ssr: false },
    { src: '~plugins/aplayer', ssr: false },
    { src: '~plugins/seniverse', ssr: false },
    { src: '~plugins/quasar', ssr: true }
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
        includeNodeModules: true,
        watchLoading: '~/config/apollo.loading.js',
        errorHandler: '~/config/apollo.error.js',
        clientConfigs: {
          default: {
            httpEndpoint: process.env.HTTP_ENDPOINT,
            persisting: false
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
