import Manager from '@/model/manager/Manager'
import validator from '@/model/validator/validator'

const state = {
  viewerState: 'start',
  routeParam : {
    username: '',
    articleId: ''
  },

  passes: {
    'CategoryPane': {
      fail: function(context) {
        context.commit('setCategoryPaneIsShowing', false);
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

    context.dispatch('loadViewerCategory', routeParamUsername)
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





/*    context.dispatch('syncSign', undefined, {root:true})
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
      });*/


  },
  onChangeRoute: (context, payload) => {
    const newRouteData = payload.routeData;
    const newUsername = newRouteData.route.params.username;
    const newArticleId = newRouteData.route.params.articleId;

    let viewerRouteParam = context.getters.getRouteParam;


    if(newArticleId !== viewerRouteParam.articleId) {
      return context.dispatch('loadViewerArticle', newArticleId)
        .then( () => {

        })
    }


  },
  loadViewerCategory: (context, payload) => {
    const username = payload;
    context.dispatch('initCategoryTree', {//TODO
      mode:'public',
      username:username
    })
  },
  loadViewerArticle: (context, payload) => {

    /*context.dispatch*/
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
