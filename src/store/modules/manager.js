import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'

const state = {
  managerState: 'start',
  isManagerLoading:  false,
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
  }
};
const getters = {
  getManagerState: (state) => {
    return state.managerState;
  },
  needToSave: (state, getters) =>{
    if(!getters.isValidArticleToSave) {
      return false;
    }
    var saveTag = getters.needToSaveArticleTagCollection;
    /*console.log('--needToSaveArticleTagCollection : ' + saveTag)*/
    var saveCat = getters.needToSaveSelectedCategory;
    /*console.log('--needToSaveSelectedCategory : ' + saveCat)*/
    var saveArticle = getters.needToSaveArticle;
    /*console.log('--needToSaveArticle : ' + saveArticle)*/
    return saveTag || saveCat || saveArticle;
  },
  isManagerLoading: (state) => {
    return state.isManagerLoading;
  }
};
const mutations = {
  setManagerState: (state, payload) => {
    state.managerState = payload;
  },
  setIsManagerLoading: (state, payload) => {
    state.isManagerLoading = payload;
  }
};
const actions = {
  initManager: (context, payload) => {
    context.state.managerState = 'load';
    const articleId = payload.articleId;
    const username = payload.username;
    const initAsSavedArticle = (articleId !== undefined);

    //init data
    //summary sign => article => category, tag
    return context.dispatch('syncSign', undefined, {root:true})
      .catch(err => {
        return Promise.reject(err);
      })
      .then( data => {
        if(username !== data.username) {
          var appError = new Error('잘못된 요청입니다.');
          appError.name = 'BadRequest';
          return Promise.reject(appError);
        }
        if(initAsSavedArticle) {//저장된 글인 경우
          return context.dispatch('loadSavedArticle', articleId, {root:true})
        }else {//new article
          return context.dispatch('newArticle', undefined, {root:true});
        }
      });

    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);

  },
  newArticle: (context) => {
    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);
    context.commit('setArticleListPaneShowing',true);

    context.commit('setIsManagerLoading',true);
    var waitingFor = {'initCategoryTree': false, 'initArticleTags': false, 'getRecentArticles' : false};
    var onComplete = function (actionName) {
      waitingFor[actionName] = true;
      var isAllComplete = true;
      for(var actionNameKey in waitingFor) {
        isAllComplete = isAllComplete && (waitingFor[actionNameKey]);
      }

      if(isAllComplete) {
        setTimeout( () => {
          context.commit('setIsManagerLoading',!isAllComplete);
        }, 500)
      }
    };

    return context.dispatch('initArticle', undefined)
      .catch( err => {
        throw err; //todo error on getting article. this mean wrong articleId(not mine, or no matched article)
      })
      .then( () => {
        context.dispatch('initCategoryTree', undefined, {root:true})
          .then( () => {
            context.commit('setSelectedNode', null, {root:true});
            onComplete('initCategoryTree')
          })
        context.dispatch('initArticleTags', undefined, {root:true})
          .then( () => {onComplete('initArticleTags')});
        context.dispatch('getRecentArticles', 0, {root:true})
          .then( () => {onComplete('getRecentArticles')});
      })

  },
  loadSavedArticle: (context, payload) => {
    var articleId = payload;
    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);


    context.commit('setIsManagerLoading',true);
    var waitingFor = {'initCategoryTree': false, 'initArticleTags': false};
    var onComplete = function (actionName) {
      waitingFor[actionName] = true;
      var isAllComplete = true;
      for(var actionNameKey in waitingFor) {
        isAllComplete = isAllComplete && (waitingFor[actionNameKey]);
      }
      if(isAllComplete) {
        setTimeout( () => {
          context.commit('setIsManagerLoading',!isAllComplete);
        }, 500)
      }

      if(!context.state.isManagerLoading) {
        console.log( 'complete !' )
      }
    };

    return context.dispatch('initArticle', articleId, {root:true})
      .then( articleData => {
        context.dispatch('initCategoryTree', undefined, {root:true})
          .then( () => {
            context.commit('setSelectedNodeById', articleData.category.id);
            context.commit('setOldSelectedNodeById', articleData.category.id);
            onComplete('initCategoryTree')
          })

        context.dispatch('initArticleTags', undefined, {root:true})
          .then( () => { onComplete('initArticleTags')});
      })
  },

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
