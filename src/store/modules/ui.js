const state = {
  focusedController: undefined
}
const getters = {

}
const mutations = {
  focusOn: (state, payload) => {
    state.focusedController = payload;
  }
}
const actions = {
  sstest: context => {
    context.commit('textMutation')
  }
}
