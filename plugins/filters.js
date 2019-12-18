import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-cn')

function prettyDate(dateString) {
  const date = new Date(dateString)
  const d = date.getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const m = monthNames[date.getMonth()]
  const y = date.getFullYear()
  return d + ' ' + m + ' ' + y
}

function formatDate(value) {
  return moment.utc(String(value)).fromNow()
}

const filters = {
  formatDate,
  prettyDate
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
