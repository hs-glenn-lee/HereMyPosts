const state = {
  account: undefined
}
const getters = {

}
const mutations = {
  textMutation: state => {
    state.account = {};
  }
}
const actions = {
  test: context => {
    context.commit('textMutation')
  }
}
