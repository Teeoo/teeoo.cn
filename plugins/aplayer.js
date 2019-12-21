import Vue from 'vue'
import APlayer from '@moefe/vue-aplayer'

Vue.component('aplayer', APlayer)
// Vue.use(Aplayer)
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png', // 设置播放器默认封面图片
  productionTip: false // 是否在控制台输出版本信息
})
