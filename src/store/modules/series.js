import api from '@/api/api'
import validator from '@/model/validator/validator.js'

const state = {
  series: null/*new Article(null, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null)*/
};
const getters = {
  getArticle: state => {
    return state.article;
  }
};
const mutations = {
  newArticle: state => {

  }
};
const actions = {
  getArticleFromServer: (context, payload) => {
   /* api.getArticle(payload).
      .then(data => {
        context.commit('setArticle',data);
      })*/
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
