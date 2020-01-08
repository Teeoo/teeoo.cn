const state = () => ({
  title: 'lee的小窝',
  cover: null
})

const mutations = {
  SET_TITLE(state, value) {
    state.title = value
  },
  SET_COVER(state, value) {
    state.cover = value
  }
}
const actions = {
  title({ state, commit }, val) {
    commit('SET_TITLE', val)
  },
  cover({ state, commit }, val) {
    commit('SET_COVER', val)
  },
  reset({ state, commit }, val) {
    commit('SET_TITLE', 'lee的小窝')
    commit('SET_COVER', null)
  }
}

export default {
  state,
  actions,
  mutations
}
