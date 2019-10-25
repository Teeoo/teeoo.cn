import Vue from 'vue'
// 时间格式化
function prettyDate(dateString) {
  const date = new Date(dateString);
  const d = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const m = monthNames[date.getMonth()];
  const y = date.getFullYear();
  return d + " " + m + " " + y;
}

function summary(data){
  return data
    .replace(/<[^>]+>/g, '')
    .substring(0, 80)
}
let filters = {
  prettyDate,
  summary,
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
export default filters
