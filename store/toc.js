export const state = () => ({
  IsToc: false,
  data: {}
})

export const mutations = {
  add(state, text) {
    state.IsToc = text.IsToc
    state.data = text.data
  }
}
