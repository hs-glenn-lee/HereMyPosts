import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'


import article from './article.js'
import articleList from './article-list.js'
import categoryTree from './category-tree.js';

const namespaced = true;
const modules = {
  article,
  articleList,
  categoryTree
};
const state = {
  viewerState: 'start',
  routeParam : {
    username: '',
    articleId: ''
  },

  passes: {
    'CategoryPane': {
      fail: function(context) {
        context.commit('setCategoryPaneIsShowing', false, {root:true});
      }
    }
  }
};
const getters = {
  getRouteParam (state) {
    return state.routeParam;
  }
};
const mutations = {
  setRouteParamUsername (state, payload) {
    state.routeParam.username = state;
  },
  setRouteParamArticleId (state, payload) {
    state.routeParam.articleId = payload;
  }
};
const actions = {
  initViewer: (context, payload) => {
    const route = payload;
    var routeParamUsername = route.params.username;
    var routeParamArticleId = route.params.articleId;

    context.dispatch('loadViewerCategory', routeParamUsername, {root:false})
      .then( () => {
        stopWait('loadViewerCategory');
        context.commit('setRouteParamUsername',routeParamUsername);
      });

    context.dispatch('loadViewerArticle', routeParamArticleId)
      .then(() => {
        stopWait('loadViewerArticle');
        context.commit('setRouteParamArticleId', routeParamArticleId);
      });


    var waitingFor = {'initCategoryTree': false, 'loadViewerArticle': false};
    var stopWait = function (actionName) {
      waitingFor[actionName] = true;
      var isAllComplete = true;
      for(var actionNameKey in waitingFor) {
        isAllComplete = isAllComplete && (waitingFor[actionNameKey]);
      }

      if(isAllComplete) {
        setTimeout( () => {
          /*context.commit('setIsManagerLoading',!isAllComplete);*/
        }, 500)
      }
    };

  },
  onChangeRoute: (context, payload) => {
    const route = payload;
    const newUsername = route.route.params.username;
    const newArticleId = route.route.params.articleId;

    let viewerRouteParam = context.getters.getRouteParam;


    if(newArticleId !== viewerRouteParam.articleId) {
      return context.dispatch('loadViewerArticle', newArticleId)
        .then( () => {

        })
    }


  },
  loadViewerCategory: (context, payload) => {
    console.log(context);
    const username = payload;
    context.dispatch('categoryTree/initCategoryTree', {//TODO
      username:username
    }, {root:false})
  },
  loadViewerArticle: (context, payload) => {
    const articleId = payload;
    return context.dispatch('article/loadPublicArticle', articleId);
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
  namespaced,
  state,
  mutations,
  actions,
  getters,
  modules
}
