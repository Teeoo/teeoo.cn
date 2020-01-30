export const state = () => ({
  article: {}
})

export const mutations = {
  add(state, text) {
    state.article = text
  },
  push(state, text) {
    state.article.data.push({
      text
    })
  }
}
export const actions = {
  add({ state, commit }, val) {
    commit('add', val)
  },
  push({ state, commit }, val) {
    commit('push', val)
  }
}
