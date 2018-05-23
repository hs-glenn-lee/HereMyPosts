import axiosAppJson from '@/api/api'
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

  newArticle: (state, payload) => {
    var cat = payload.category;
    var author = payload.author;
    state.article = new Article(null, '', '', '', 0, false, 0, cat, author);
    console.log(state.article.content)
  }

};
const actions = {
  saveArticle: (context, paylaod) => {

  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
