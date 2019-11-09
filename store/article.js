export const state = () => ({
  list: [],
  details: {}
})
export const mutations = {
  SET_DETAILS(state, text) {
    state.details = text
  },
  SET_ARTICLE_LIST(state, text) {
    state.list = text
  },
  UPDATE_DETAILS(state, text) {
    state.details.comments.push(text)
  }
}
export const actions = {
  setDetails({ commit }, data) {
    commit('SET_DETAILS', data)
  },
  setArticleList({ commit }, data) {
    commit('SET_ARTICLE_LIST', data)
  },
  updateDetails({ commit }, data) {
    commit('UPDATE_DETAILS', data)
  }
}
export const getters = {
  loading: (state) => {
    return Object.keys(state.details).length === 0
  },
  count: (state) => {
    return Object.keys(state.details).length === 0 ? 0 : state.details.comments.length
  }
}
