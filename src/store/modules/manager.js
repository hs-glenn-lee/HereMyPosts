import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'

const state = {
  manager: {
    selectedCategoryNode: {}
  },

  focusedVueCompName: '',

  isCategoryPaneShowing: true,
  isArticleListPaneShowing: true
};
const getters = {
  isCategoryPaneShowing: state => {
    return state.isCategoryPaneShowing;
  },
  isArticleListPaneShowing: state => {
    return state.isArticleListPaneShowing;
  },
  getFocusedVueCompName: state => {
    return state.focusedVueCompName;
  }
};
const mutations = {
  setManager: (state, payload) => {
    state.manager = payload;
  },
  setCategorySubLeftPaneIsShow: (state, payload) => {
    state.isCategoryPaneShowing = payload;
  },
  setFocusedVueCompName: (state, payload)  => {
    var DOMevent = payload;

    console.log(payload)
    /*var event = payload.event;

    event.preventDefault();
    event.stopPropagation();

    var comp = payload.vueComp;

    state.focusedVueCompName = comp;*/
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
    validator.validate('test',undefined, function(exception) {
      console.log('reject callback')
      console.log(context.rootState.alert);

      context.commit('setAlertMessage', exception.message);
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
