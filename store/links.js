export const state = () => ({
  list: []
})

export const mutations = {
  SET_LINKS_LIST(state, text) {
    state.list = text
  }
}
export const actions = {
  setLinksList({ commit }, data) {
    commit('SET_LINKS_LIST', data)
  }
}
