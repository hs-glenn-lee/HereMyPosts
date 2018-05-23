import api from '@/api/api'
import Article from '@/model/Article'
const state = {
  article: null
};
const getters = {
  getArticle: state => {
    return state.article;
  },
  getContent: state => {
    return state.article.content
  }
};
const mutations = {

  newArticle: state => {
    state.article = new Article(null, '', '', '', 0, false, 0, null, null);
    console.log(state.article.content)
  },
  setTitle: (state, payload) => {
    state.article.title = payload;
  },
  setContent: (state, payload) => {
    state.article.article = payload;
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




    api.saveArticle(state.article)
      .then( data => {
        console.log('!!!saveArticle')
      })

  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
