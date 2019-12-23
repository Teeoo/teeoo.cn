import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

function formatRelativeTime(value) {
  return dayjs()
    .locale('zh-cn')
    .to(dayjs(value))
}

const filters = {
  formatRelativeTime
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
