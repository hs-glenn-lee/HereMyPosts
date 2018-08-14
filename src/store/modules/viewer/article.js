import api from '@/api/api'
const namespaced = true;
const state = {
  article: null,
  error: null
};
const getters = {
  getArticle: state => {
    return state.article;
  },
  getContent: state => {
    return state.article.content
  },
  getTitle: state => {
    return state.article.title
  },
  getAuthor: state => {
    return state.article.author
  },
  getError: state => {
    return state.error;
  }

};
const mutations = {
  setArticle: (state, payload) => {
    state.article = payload;
  },
  setError: (state, payload) => {
    state.error = payload;
  }
};
const actions = {
  loadPublicArticle: (context, payload) => {
    return api.getPublicArticle(payload)
      .then(data => {
        context.commit('setArticle',data);
        return data;
      })
      .catch( err => {
        context.commit('setError',err);
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
