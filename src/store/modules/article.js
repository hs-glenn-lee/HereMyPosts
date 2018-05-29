import api from '@/api/api'
import Article from '@/model/Article'
const state = {
  article: null,
  articleList: []
};
const getters = {
  getArticle: state => {
    return state.article;
  },
  getContent: state => {
    return state.article.content
  },
  getArticleList: state => {
    return state.articleList
  },
  isArticleListEmpty: state => {
    return state.articleList.length < 1
  }
};
const mutations = {

  newArticle: state => {
    state.article = new Article(null, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null);

  },
  setTitle: (state, payload) => {
    state.article.title = payload;
  },
  setContent: (state, payload) => {
    state.article.content = payload;
  }

};
const actions = {
  saveArticle: context => {
    state.article.category = context.getters.getSelectedNode.cloneAsCategory();
    state.article.author = context.getters.getAccount;

    //validate
    if(state.article.title === '') {

    }

    if(state.article.content === '') {

    }

    console.log(state.article)

    api.saveArticle(state.article)
      .then( data => {
        console.log('!!!saveArticle')
      })
  },
  getArticlesOfCategory : (context, payload) => {
    api.getArticlesOfCategory(payload)
      .then(data => {
        //todo getArticlesOfCategory data ordering
        console.log(data)
        state.articleList = data;
      })
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
