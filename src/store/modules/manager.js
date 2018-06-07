import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'

const state = {
  manager: {
    selectedCategoryNode: {}
  },

  passes: {
    'CategoryPane': {
      fail: function(context) {
        context.commit('setCategoryPaneIsShowing', false);
      }
    },
    'SeriesPane': {
      fail: function(context) {
        context.commit('setIsSeriesPaneShowing', false);
      }
    }
  },

  isCategoryPaneShowing: true,
  isArticleListPaneShowing: true,
  isSeriesPaneShowing: true
};
const getters = {
  isCategoryPaneShowing: state => {
    return state.isCategoryPaneShowing;
  },
  isArticleListPaneShowing: state => {
    return state.isArticleListPaneShowing;
  },
  isSeriesPaneShowing: state => {
    return state.isSeriesPaneShowing;
  }
};
const mutations = {
  setManager: (state, payload) => {
    state.manager = payload;
  },
  setCategoryPaneIsShowing: (state, payload) => {
    state.isCategoryPaneShowing = payload;
  },
  setIsSeriesPaneShowing: (state, payload) => {
    state.isSeriesPaneShowing = payload;
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
  },
  checkPass: (context, payload) => {//to not showing if click other components
    var event = payload;

    var passes = context.state.passes;
    var markedPasses = event.passes;

    if(markedPasses) {
      console.log('markedPasses exits')
      var markedPassMap = {};
      for(var k in markedPasses) {
        var markedPassKey = markedPasses[k];
        markedPassMap[markedPassKey] = {};
      }

      for(var passKey in passes) {
        if(markedPassMap[passKey] === undefined){
          passes[passKey].fail(context);
        }
      }
    }else {
      for(var passKey in passes) {//fail all
        var pass = passes[passKey];
        pass.fail(context);
      }
    }

  },
  markPass: (context, payload) => {
    if(event.passes) {
      event.passes.push(payload);
    }else {
      event.passes = [payload]
    }

  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
