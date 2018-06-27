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
  }
};
const getters = {
  getManagerState: (state) => {
    return state.managerState;
  }
};
const mutations = {
  setManagerState: (state, payload) => {
    this.managerState = payload;
  }
};
const actions = {
  initManager: (context, payload) => {

    context.state.managerState = 'load';
    const articleId = payload;
    const isSavedArticle = (articleId !== undefined);

    //init data
    //summary sign => article => category, tag
    context.dispatch('syncSign', undefined, {root:true})
      .catch(err => {
        throw err;//todo if error occcur redirect to sign-in
      })
      .then( () => {

        context.dispatch('initMyTags', undefined, {root:true});
        if(isSavedArticle) {//저장된 글인 경우
          context.dispatch('initArticle', articleId, {root:true})
            .then( articleData => {
              context.dispatch('initCategoryTree', undefined, {root:true})
                .then( () => {
                  context.commit('setSelectedNode',articleData.category.id);
                })

              context.dispatch('initArticleTags', undefined, {root:true});
            })

        }else {//new article

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

    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);
    context.commit('setArticleListPaneShowing',false);

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
