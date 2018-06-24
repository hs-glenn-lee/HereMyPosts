import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'

const state = {
  managerState: 'start',
  passes: {
    'CategoryPane': {
      fail: function(context) {
        context.commit('setCategoryPaneIsShowing', false);
      }
    },
    'TagPane': {
      fail: function(context) {
        context.commit('setIsTagPaneShowing', false);
      }
    }
  },
  isCategoryPaneShowing: true,
  isArticleListPaneShowing: true,
  isTagPaneShowing: true
};
const getters = {
  isCategoryPaneShowing: state => {
    return state.isCategoryPaneShowing;
  },
  isArticleListPaneShowing: state => {
    return state.isArticleListPaneShowing;
  },
  isTagPaneShowing: state => {
    return state.isTagPaneShowing;
  }
};
const mutations = {
  setCategoryPaneIsShowing: (state, payload) => {
    state.isCategoryPaneShowing = payload;
  },
  setIsTagPaneShowing: (state, payload) => {
    state.isTagPaneShowing = payload;
  }
};
const actions = {
  initManager: (context, payload) => {
    console.log('initManager');
    context.state.managerState = 'load';
    const articleId = payload;
    const isSavedArticle = (articleId !== undefined);

    //summary sign => article => category, tag
    context.dispatch('syncSign', undefined, {root:true})
      .catch(err => {
        throw err;//user is not signed, so go to sing-in page
      })
      .then( () => {
        console.log('after syncSign');
        context.dispatch('initMyTags', undefined, {root:true});
        if(isSavedArticle) {//저장된 글인 경우
          context.dispatch('initArticle', articleId, {root:true});
          context.dispatch('initArticleTags', undefined, {root:true});
        }else {//new article
          console.log('!isSavedArticle');
          context.dispatch('initArticle', undefined)
            .catch( err => {
              throw err; //todo error on getting article. this mean wrong articleId(not mine, or no matched article)
            })
            .then( () => {
              context.dispatch('initCategoryTree', undefined, {root:true});
              context.dispatch('initArticleTags', undefined, {root:true});
            })
        }
      })
  },
 /* test: (context) => {
    console.log('test')
    validator.validate('test',undefined, function(exception) {
      console.log('reject callback')
      console.log(context.rootState.alert);

      context.commit('setAlertMessage', exception.message);
      context.commit('setAlertIsShowing', true);
    });
  },*/
  checkPass: (context, payload) => {//to not showing if click other components
    const event = payload;

    const passes = context.state.passes;
    const markedPasses = event.passes;

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
