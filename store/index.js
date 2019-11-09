export const state = () => ({
  title: 'lee的小窝',
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  SET_TITLE(state, text) {
    state.title = text
  }
}
