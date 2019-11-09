export const state = () => ({
  pages: []
})

export const mutations = {
  SET_DRAWER_PAGES(state, text) {
    state.pages = text
  }
}
export const actions = {
  setDrawerPages({ commit }, data) {
    commit('SET_DRAWER_PAGES', data)
  }
}
