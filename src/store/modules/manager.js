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
  },
  needToSave: (state, getters) =>{
    console.log('--needToSave--')

    console.log('--needToSaveArticleTagCollection')
    var x = getters.needToSaveArticleTagCollection;
    console.log(x);

    console.log('--needToSaveSelectedCategory')
    var xx = getters.needToSaveSelectedCategory;
    console.log(xx);

    console.log('--needToSaveArticle')
    var art = getters.needToSaveArticle;
    console.log(art);

  },
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
    const initAsSavedArticle = (articleId !== undefined);

    //init data
    //summary sign => article => category, tag
    context.dispatch('syncSign', undefined, {root:true})
      .catch(err => {
        throw err;//todo if error occcur redirect to sign-in
      })
      .then( () => {
        if(initAsSavedArticle) {//저장된 글인 경우
          return context.dispatch('loadSavedArticle', articleId, {root:true})
        }else {//new article
          return context.dispatch('newArticle', undefined, {root:true});
        }
      })

    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);
    context.commit('setArticleListPaneShowing',false);

  },
  newArticle: (context) => {
    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);
    context.commit('setArticleListPaneShowing',false);

    return context.dispatch('initArticle', undefined)
      .catch( err => {
        throw err; //todo error on getting article. this mean wrong articleId(not mine, or no matched article)
      })
      .then( () => {
        context.dispatch('initCategoryTree', undefined, {root:true})
          .then( () => {
            //context.commit('setSelectedNode', null, {root:true});
          })
        context.dispatch('initArticleTags', undefined, {root:true});
      })

  },
  loadSavedArticle: (context, payload) => {
    var articleId = payload;
    //init ui
    context.commit('setCategoryPaneIsShowing', false);
    context.commit('setIsTagPaneShowing', false);
    context.commit('setArticleListPaneShowing',false);


    return context.dispatch('initArticle', articleId, {root:true})
      .then( articleData => {
        context.dispatch('initCategoryTree', undefined, {root:true})
          .then( () => {
            context.commit('setSelectedNodeById', articleData.category.id);
            context.commit('setOldSelectedNodeById', articleData.category.id);
          })

        context.dispatch('initArticleTags', undefined, {root:true});
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
