import Manager from '@/model/manager/Manager'
const state = {
  manager: new Manager()
};
const getters = {

};
const mutations = {
  setManager: (state, payload) => {
    state.manager = payload;
  }
};
const actions = {
  init: context => {
    var initializedManager = new Manager().init().then(()=>{
      context.commit('setManager', initializedManager)
    })
  },
  test: context => {
    console.log(context.state);
    console.log(context.rootState);
    console.log(context.rootState.signModule.sign)

  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
