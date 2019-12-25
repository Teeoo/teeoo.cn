import Vue from 'vue'
import Quasar, { AppFullscreen, Notify } from 'quasar'
import 'quasar/dist/quasar.css'
Vue.use(Quasar, {
  plugins: {
    AppFullscreen,
    Notify
  },
  config: {
    notify: {
      position: 'top-right',
      timeout: 5000,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    }
  }
})
