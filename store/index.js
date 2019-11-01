export const state = () => ({
  qrcode: false,
  title: 'Mr. Lee\'s Blog',
  counter: 0,
  qrcodeUrl: ''
})

export const mutations = {
  toggle(state, text) {
    state.qrcode = text.qrcode
    state.qrcodeUrl = text.qrcodeUrl
  },
  setTitle(state, text) {
    state.title = text.title
  },
  increment(state) {
    state.counter++
  },
}
