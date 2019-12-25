const state = () => ({
  title: '生如夏花之绚烂，死如秋叶之静美',
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
    commit('SET_TITLE', '生如夏花之绚烂，死如秋叶之静美')
    commit('SET_COVER', null)
  }
}

export default {
  state,
  actions,
  mutations
}
