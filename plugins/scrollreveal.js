import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'
Vue.use(VueScrollReveal)

Vue.use(VueScrollReveal, {
  class: '.article',
  duration: 1000,
  delay: 5000,
  origin: 'bottom',
  reset: true,
  mobile: false,
  distance: '50px',
  opacity: 0,
  scale: 0.95,
  interval: 100,
  easing: 'ease'
})
