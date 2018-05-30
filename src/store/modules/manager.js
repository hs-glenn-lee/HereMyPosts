import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'

const state = {
  manager: {
    selectedCategoryNode: {}
  },

  isCategoryPaneShowing: true,
  isArticleListPaneShowing: true
};
const getters = {
  isCategoryPaneShowing: state => {
    return state.isCategoryPaneShowing;
  },
  isArticleListPaneShowing: state => {
    return state.isArticleListPaneShowing;
  }
};
const mutations = {
  setManager: (state, payload) => {
    state.manager = payload;
  },
  setCategorySubLeftPaneIsShow: (state, payload) => {
    state.isCategoryPaneShowing = payload;
  }
};
const actions = {
  init: context => {
    var initializedManager = new Manager().init().then(()=>{
      context.commit('setManager', initializedManager)
    })
  },
  test: (context) => {
    console.log('test')
    validator.validate('test',undefined, function() {
      console.log('reject callback')
      console.log(context.rootState.alert);

      context.commit('setAlertMessage', 'test alert message');
      context.commit('setAlertIsShowing', true);
    });
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
