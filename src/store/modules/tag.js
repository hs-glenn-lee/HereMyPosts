import api from '@/api/api'
import TagCollection from "../../model/tag/TagCollection";
import Vue from 'vue'
const state = {
  myTags: null,
  articleTagCollection: null,
  oldArticleTagCollection: null
};
const getters = {
  getMyTags: state => {
    return state.myTags;
  },
  getArticleTagCollection: state => {
    return state.articleTagCollection;
  },
  getOldArticleTagCollection: state => {
    return state.oldArticleTagCollection;
  },
  needToSaveArticleTagCollection: state => {

    if(state.oldArticleTagCollection === null) {
      if(state.articleTagCollection === null) {
        return false;
      }

      if(state.articleTagCollection.isEmpty()) {
        return false
      }else {
        return true;
      }
    }else {
      return !state.articleTagCollection.equals(state.oldArticleTagCollection);
    }
  }
};
const mutations = {
  setMyTags: (state, payload) => {
    state.myTags = payload;
  },
  setArticleTagCollection: (state, payload) => {
    state.articleTagCollection = payload;
  },
  setOldArticleTagCollection: (state, payload) => {
    state.oldArticleTagCollection = payload;
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
    //reset
    context.commit('setMyTags', null);

    api.getMyTags()
      .then(data => {
        context.commit('setMyTags', data)
      })
  },
  initArticleTags: (context) => {
    //reset
    context.commit('setArticleTagCollection', null);
    context.commit('setOldArticleTagCollection', null);

    var article = context.rootGetters.getArticle;
    var isSavedArticle = context.rootGetters.isSavedArticle;
    let articleTagCollection = new TagCollection(article, null);

    if(isSavedArticle) {
      api.getTagArticlesOfArticle(article.id)
        .then(data => {
          articleTagCollection.setTagsArticles(data);
          context.commit('setArticleTagCollection', articleTagCollection);
          context.commit('setOldArticleTagCollection', articleTagCollection);
        })
    }else {
      context.commit('setArticleTagCollection', articleTagCollection);
    }

  },
  updateArticleTags: (context, payload) => {
    let article = payload;
    let collection = context.state.articleTagCollection;
    collection.setArticle(article);
    let tagsArticles = collection.getTagsArticles();
    console.log('updateArticleTags')
    console.log(tagsArticles);
    console.log(JSON.stringify(tagsArticles))
    return api.updateTagsArticlesOfArticle(article.id, tagsArticles);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
