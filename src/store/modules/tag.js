import api from '@/api/api'
const state = {
  myTags: [],
  articleTags: []
};
const getters = {
  getMyTags: state => {
    return state.myTags;
  },
  getArticleTags: state => {
    return state.articleTags;
  }
};
const mutations = {
  setMyTags: (state, payload) => {
    state.myTags = payload;
  },
  setArticleTags: (state, payload) => {
    state.articleTags = payload;
  },
  addTagToArticleTags: (state, payload) => {
    state.articleTags.push(payload);
  },
  removeTagFromArticle: (state,payload) => {
    var tag = payload;
  }
};
const actions = {
  setMyTags: (context) => {
    api.getMyTags()
      .then(data => {
        context.commit('setMyTags', data)
      })
  },
  setArticleTags: (context, payload) => {
    var articleId = payload;
    api.getArticleTags(articleId)
      .then(data => {
        context.commit('setArticleTags', data)
      })
  },
  addTagToArticle: (context, payload) => {
    var tagArticle = payload;
    api.addTagToArticle(tagArticle)
      .then(data => {
        context.commit('addTagToArticleTags', data.tag );
      })
  },
  removeTagFromArticle: (context, payload) => {
    var tag = payload;
    api.removeTagFromArticle(tag)
      .then(data => {
        //context.commit('tagAtArticle', data.getTag);
      })
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
