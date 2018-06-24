import api from '@/api/api'
import TagCollection from "../../model/tag/TagCollection";
import Vue from 'vue'
const state = {
  myTags: null,
  articleTagCollection: null
};
const getters = {
  getMyTags: state => {
    return state.myTags;
  },
  getArticleTagCollection: state => {
    return state.articleTagCollection;
  }
};
const mutations = {
  setMyTags: (state, payload) => {
    state.myTags = payload;
  },
  setArticleTagCollection: (state, payload) => {
    state.articleTagCollection = payload;
  },
  setEmptyArticleTags : (state) => {
    state.articleTagCollection = new TagCollection();
  },
  addTag: (state, payload) => {
    var tag = payload;
    state.articleTagCollection.addTag(tag);
  },
  removeTag: (state,payload) => {
    var tag = payload;
    state.articleTagCollection.removeTag(tag);
  }
};
const actions = {
  initMyTags: (context) => {
    api.getMyTags()
      .then(data => {
        context.commit('setMyTags', data)
      })
  },
  initArticleTags: (context) => {
    const article = context.rootGetters.getArticle;
    let articleTagCollection = new TagCollection(article, null);
    if(article.id) {
      api.getArticleTags(article.id)
        .then(data => {
          articleTagCollection.setTagsArticles(data);
          context.commit('setArticleTagCollection', articleTagCollection);
        })
    }else {
      context.commit('setArticleTagCollection', articleTagCollection);
    }

  },
  saveArticleTags: (context, payload) => {
    var article = payload;

  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
