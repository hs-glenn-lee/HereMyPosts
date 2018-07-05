import api from '@/api/api'
import Article from '@/model/Article'
import validator from '@/model/validator/validator.js'
const state = {
  article: null/*new Article(null, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null)*/,
  oldArticle: null, //to compare after modifiy article
  articleList: [],
  isSavedArticle: false
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
  getArticleList: state => {
    return state.articleList
  },
  getOldArticle: state => {
    return state.oldArticle;
  },
  isArticleListEmpty: state => {
    return state.articleList.length < 1
  },
  isSavedArticle: state => {
    return state.isSavedArticle;
  },
  needToSaveArticle: state => {
    console.log('needToSaveArticle%%%%%%%%%%%%%%')
    console.log(state.oldArticle);
    console.log(state.article);

    if(state.oldArticle) {
      if(state.article) {

        console.log(state.article.title)
        console.log(state.oldArticle.title)

        console.log(state.article.content)
        console.log(state.oldArticle.content)

        return (state.article.title !== state.oldArticle.title) || (state.article.content !== state.oldArticle.content)
      }else {
        return false;
      }

    }else {
      if(state.article) {
        return !( state.article.title === '')
        return !( state.article.content === '<!DOCTYPE html><html><head></head><body></body></html>')
      }else {
        return false;
      }

    }
  }
};
const mutations = {
  setNewArticle: (state, payload) => {
    let id = payload;
    state.article = new Article(id, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null);
  },
  setTitle: (state, payload) => {
    state.article.title = payload;
  },
  setContent: (state, payload) => {
    state.article.content = payload;
  },
  setArticle: (state, payload) => {
    state.article = payload;
  },
  setOldArticle: (state, payload) => {
    state.oldArticle = payload;
  },
  setIsSavedArticle: (state, payload) => {
    state.isSavedArticle = payload;
  }
};
const actions = {
  initArticle:  (context, payload) => {
    var articleId = payload;
    if(articleId) {
      return context.dispatch('setSavedArticle', articleId, {root: true})
    }else {
      context.dispatch('setNewArticleWithId');
      return Promise.resolve('success');
    }
  },
  saveArticle: context => {
    state.article.category = context.getters.getSelectedNode.cloneAsCategory();
    state.article.author = context.getters.getAccount;

    //validate
    validator.validate('saveArticle',state.article);

    return api.saveArticle(state.article)
      .then( data => {
        return data;
      })
      .catch( err => {
        throw err;
      })
  },
  getArticlesOfCategory : (context, payload) => {
    api.getArticlesOfCategory(payload)
      .then(data => {
        data.sort((a,b) => {//createTimestamp desc
          if(a.createTimestamp < b.createTimestamp) {
            return 1;
          }
          if(a.createTimestamp >= b.createTimestamp) {
            return -1;
          }
          return 0;
        })
        console.log(data)
        state.articleList = data;
      })
  },
  setNewArticleWithId: (context) => {
    return api.getNewArticleId()
      .then(newArticleId => {
        console.log(newArticleId)
        context.commit('setNewArticle', newArticleId)
        context.commit('setOldArticle', null);
      })
  },
  setSavedArticle: (context, payload) => {
    return api.getArticle(payload)
      .then(data => {
        var copy = Object.assign({},data)
        context.commit('setArticle',data);
        context.commit('setIsSavedArticle', true);
        context.commit('setOldArticle', copy);
        return data;
      })
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
