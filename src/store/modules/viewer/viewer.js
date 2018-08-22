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
  isLoading:  false,
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
  },
  isLoading (state) {
    return state.isLoading;
  }
};
const mutations = {
  setRouteParamUsername (state, payload) {
    state.routeParam.username = payload;
  },
  setRouteParamArticleId (state, payload) {
    state.routeParam.articleId = payload;
  },
  setIsLoading (state, payload) {
    state.isLoading = payload;
  }
};
const actions = {
  initViewer: (context, payload) => {
    context.commit('setIsLoading', true);

    const route = payload;
    var routeParamUsername = route.params.username;
    var routeParamArticleId = route.params.articleId;

    context.dispatch('syncSign',{},{root:true})
      .catch( err => {
        console.log('비로그인 사용자.')
      })

    context.dispatch('loadViewerCategory', routeParamUsername, {root:false})
      .then( () => {
        stopWait('loadViewerCategory');
        context.commit('setRouteParamUsername',routeParamUsername);
      })
      .then( () => {
        context.dispatch('articleList/getRecentPublicArticles', 0, {root:false})
          .then( () => {
            stopWait('articleList/getRecentPublicArticles');
          });
      });


    context.dispatch('loadViewerArticle', routeParamArticleId)
      .then(() => {
        stopWait('loadViewerArticle');
        context.commit('setRouteParamArticleId', routeParamArticleId);
      });


    var waitingFor = {'loadViewerArticle': false, 'articleList/getRecentPublicArticles': false};
    var stopWait = function (actionName) {
      waitingFor[actionName] = true;
      var isAllComplete = true;
      for(var actionNameKey in waitingFor) {
        isAllComplete = isAllComplete && (waitingFor[actionNameKey]);
      }

      if(isAllComplete) {
        setTimeout( () => {
          context.commit('setIsLoading', false);
        }, 600)
      }
    };

  },
  onChangeRoute: (context, payload) => {
    console.log('onChangeRoute')

    const route = payload;
    const newUsername = route.params.username;
    const newArticleId = route.params.articleId;

    let viewerRouteParam = context.getters.getRouteParam;

    console.log(newArticleId)
    console.log(viewerRouteParam.articleId)

    if(newArticleId !== viewerRouteParam.articleId) {
      context.commit('setIsLoading', true);
      return context.dispatch('loadViewerArticle', newArticleId)
        .then( () => {
          context.commit('setRouteParamUsername', newUsername);
          context.commit('setRouteParamArticleId', newArticleId);
          setTimeout( () => {
            context.commit('setIsLoading', false);
          }, 600)
        })
    }


  },
  loadViewerCategory: (context, payload) => {
    const username = payload;
    return context.dispatch('categoryTree/initCategoryTree', {//TODO
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
