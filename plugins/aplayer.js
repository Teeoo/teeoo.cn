import Vue from 'vue'
import APlayer from '@moefe/vue-aplayer'
Vue.component('aplayer', APlayer)
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})
