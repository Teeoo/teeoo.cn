export const state = () => ({
  qrcode: false,
  title: 'Mr. Lee\'s Blog',
  counter: 0
})

export const mutations = {
  toggle(state, text) {
    state.qrcode = text.qrcode
  },
  setTitle(state, text) {
    state.title = text.title
  },
  increment(state) {
    state.counter++
  }
}
