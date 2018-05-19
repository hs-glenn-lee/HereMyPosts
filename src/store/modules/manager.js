import Manager from '@/model/manager/Manager'
const state = {
  manager: {
    selectedCategoryNode: {}
  },

  categorySubLeftPaneIsShow: true
};
const getters = {
  getCategorySubLeftPaneIsShow: state => {
    return state.categorySubLeftPaneIsShow;
  }
};
const mutations = {
  setManager: (state, payload) => {
    state.manager = payload;
  },
  setCategorySubLeftPaneIsShow: (state, payload) => {
    state.categorySubLeftPaneIsShow = payload;
  }
};
const actions = {
  init: context => {
    var initializedManager = new Manager().init().then(()=>{
      context.commit('setManager', initializedManager)
    })
  },
  test: (context) => {
    console.log(context.rootState.categoryTreeModule.selectedNode);
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
