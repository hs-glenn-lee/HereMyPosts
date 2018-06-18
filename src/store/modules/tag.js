import api from '@/api/api'
import TagCollection from "../../model/tag/TagCollection";
import Vue from 'vue'
const state = {
  myTags: null,
  articleTags: null
};
const getters = {
  getMyTags: state => {
    return state.myTags;
  },
  getArticleTags: state => {
    console.log('getArticleTags  getters')
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
    var tag = payload;
    var tagCol = state.articleTags
    if(tagCol.findTag(tag.name) === undefined) {
      Vue.set(tagCol.tagMap, tag.name, tag)
    }
  },
  removeTagFromArticleTags: (state,payload) => {
    //Vue.delete( target, key )
  }
};
const actions = {
  initMyTags: (context) => {
    api.getMyTags()
      .then(data => {
        var tagCol = new TagCollection();
        tagCol.addTags(data);
        context.commit('setMyTags', tagCol)
      })
  },
  initArticleTags: (context) => {
    console.log(context);
    var article = context.rootGetters.getArticle;

    var tagCol = new TagCollection();
    if(article.id) {
      api.getArticleTags(article.id)
        .then(data => {
          tagCol.addTags(data);
          context.commit('setArticleTags', tagCol)
        })
    }else {
      context.commit('setArticleTags', tagCol)
    }

  },
  addTagToSavedArticle: (context, payload) => {
    var tagArticle = payload;
    api.addTagToArticle(tagArticle)
      .then(data => {
        context.commit('addTagToArticleTag', data);
      })
  },
  removeTagFromSavedArticle: (context, payload) => {
    var tag = payload;
    api.removeTagFromArticle(tag)
      .then(data => {
        context.commit('removeTagFromArticleTags', tag);
      })
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
