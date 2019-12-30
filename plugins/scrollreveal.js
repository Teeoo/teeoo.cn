import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'
Vue.use(VueScrollReveal)

Vue.use(VueScrollReveal, {
  class: '.card-avatar',
  duration: 1000,
  delay: 500,
  origin: 'bottom',
  reset: true,
  mobile: false,
  distance: '50px',
  opacity: 0.001,
  scale: 0.9,
  interval: 100,
  easing: 'linear',
  beforeReveal: () => {},
  beforeReset: () => {},
  afterReveal: () => {},
  afterReset: () => {}
})