import Vue from 'vue'
import Quasar, {
  QTimeline,
  QTimelineEntry,
  QIntersection,
  Notify,
  Loading,
  AppFullscreen,
  AddressbarColor
} from 'quasar'
import 'quasar/dist/quasar.css'
Vue.use(Quasar, {
  components: {
    QTimeline,
    QTimelineEntry,
    QIntersection
  },
  plugins: {
    Notify,
    Loading,
    AppFullscreen,
    AddressbarColor
  },
  config: {
    loading: {},
    notify: {
      position: 'top-right',
      timeout: 3500,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    }
  }
})
