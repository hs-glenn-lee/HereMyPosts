import api from '@/api/api'
import TagCollection from "../../model/tag/TagCollection";
import Article from '@/model/Article.js'
import Tag from '@/model/tag/Tag.js'
import TagArticle from '@/model/tag/TagArticle.js'

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
  getTagsArticles: state => {
    state.articleTagCollection.tagsArticles;
  },
  getOldArticleTagCollection: state => {
    return state.oldArticleTagCollection;
  },
  needToSaveArticleTagCollection: (state, getters) => {
    console.log('!!!needToSaveArticleTagCollection')
    var curTagCol = getters.getArticleTagCollection;
    var oldTagCol = getters.getOldArticleTagCollection;

    if(oldTagCol === null) {
      if(curTagCol === null) {
        return false;
      }

      if(curTagCol.isEmpty()) {
        return false
      }else {
        return true;
      }
    }else {
      console.log('eqauls tag col')
      console.log(state.articleTagCollection)
      console.log(state.oldArticleTagCollection)

      console.log(curTagCol)
      console.log(oldTagCol)
      if(curTagCol === null) {
        return false;
      }

      return !oldTagCol.equals(curTagCol);
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
 /*   context.commit('setArticleTagCollection', null);
    context.commit('setOldArticleTagCollection', null);*/

    var article = context.rootGetters.getArticle;
    var isSavedArticle = context.rootGetters.isSavedArticle;
    let articleTagCollection = new TagCollection(article, null);

    if(isSavedArticle) {
      api.getTagArticlesOfArticle(article.id)
        .then(data => {
          console.log('api return')
          console.log(data);
          var tagsArticles = [];

          if(data.length > 0) {
            data.forEach( el => {
              console.log('????')
              var dataArticle = el.article;
              var article = new Article(dataArticle.id, dataArticle.title, dataArticle.content, dataArticle.summary, dataArticle.readCount,
                dataArticle.isDel, dataArticle.isPublic, dataArticle.category, dataArticle.author, dataArticle.createTimestamp,
                dataArticle.updateTimestamp, dataArticle.createDateString, dataArticle.updateDateString);

              var tag = new Tag(el.tag.name);
              var tagArticle = new TagArticle(el.id, article, tag);
              tagsArticles.push(tagArticle)
            });
            articleTagCollection.setTagsArticles(tagsArticles);
          }


          console.log(tagsArticles)

          var oldArticleTagCollection = Object.assign({},articleTagCollection)
          console.log('&7777777777777777')
          console.log(articleTagCollection)
          context.commit('setOldArticleTagCollection', oldArticleTagCollection);
          context.commit('setArticleTagCollection', articleTagCollection);
        })
    }else {
      context.commit('setArticleTagCollection', articleTagCollection);
      context.commit('setOldArticleTagCollection', null);
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
