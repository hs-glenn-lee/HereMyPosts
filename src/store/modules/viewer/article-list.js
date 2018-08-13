import api from '@/api/api'
import PageParameter from "../..//../model/PageParameter";

const namespaced = true;
const state = {
  articleList: [],
  listOf: 'recent', //recent, category,
  sortDirection: 'desc', //desc, asc
  sortProperty: 'updateTimestamp', // updateTimestamp, title
  searchWord: ''
};
const getters = {
  getArticleList: state => {
    var articleList = state.articleList;

    var direction = (state.sortDirection === 'desc')? -1 : 1 ;

    var filtered = [];
    //filter
    if( (state.searchWord) && state.searchWord !== '') {
      articleList.forEach( el => {
        if(el.title.indexOf(state.searchWord) > -1) {
          filtered.push(el);
        }
      })
    }else {
      filtered = state.articleList
    }

    //sort
    filtered.sort( (a, b) => {
      var ret = (a[state.sortProperty] < b[state.sortProperty])? -1 : (a[state.sortProperty] === b[state.sortProperty]) ? 0 : 1;
      return ret * direction
    });
    return filtered
  },
  isArticleListEmpty: state => {
    return state.articleList.length < 1
  },
  isSavedArticle: state => {
    return state.isSavedArticle;
  },
  getListOf: state => {
    return state.listOf
  },
  getSortDirection: state => {
    return state.sortDirection
  },
  getSortProperty: state => {
    return state.sortProperty
  },
  getSearchWord: state => {
    return state.searchWord;
  }
};
const mutations = {
  setArticleList: (state, payload) => {
    state.articleList = payload;
  },
  setListOf: (state, payload) => {
    state.listOf = payload;
  },
  setSortDirection: (state, payload) => {
    state.sortDirection = payload;

  },
  setSortProperty: (state, payload) => {
    state.sortProperty = payload;
  },
  setSearchWord: (state, payload) => {
    state.searchWord = payload;
  },
  sortArticleList: (state) => {
    var articleList = state.articleList;
    var direction = (state.sortDirection === 'desc')? -1 : 1 ;

    articleList.sort( (a, b) => {
      var ret = (a[state.sortProperty] < b[state.sortProperty])? -1 : (a[state.sortProperty] === b[state.sortProperty]) ? 0 : 1;
      return ret * direction
    })
  }
};
const actions = {
  getPublicArticlesOfCategory : (context, payload) => {
    let username = payload.username;
    let categoryId = payload.categoryId;

    return api.getPublicArticlesOfCategory(username, categoryId)
      .then(data => {
        console.log(data);
        context.commit('setArticleList',data, {root:false})
        context.commit('setListOf','category', {root:false})
        context.commit('sortArticleList', {root:false});

      })
  },
  getRecentPublicArticles: (context, payload) => {
    var page = payload;
    var pageParameter = new PageParameter(page,10,'desc','updateTimestamp');
    var username = context.rootGetters['viewer/getRouteParam'].username;

    return api.getRecentPublicArticles(username, pageParameter)
      .then( data => {
        context.commit('setArticleList', data);
        context.commit('setListOf','recent');
        context.commit('sortArticleList');
      })
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
