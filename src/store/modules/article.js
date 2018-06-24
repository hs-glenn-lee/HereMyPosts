import api from '@/api/api'
import Article from '@/model/Article'
import validator from '@/model/validator/validator.js'
const state = {
  article: null/*new Article(null, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null)*/,
  initialArticle: null, //to compare after modifiy article
  articleList: []
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
  isArticleListEmpty: state => {
    return state.articleList.length < 1
  }
};
const mutations = {
  newArticle: state => {
    state.article = new Article(null, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null);
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
  setInitialArticle: (state, payload) => {
    state.initialArticle = payload;
  }
};
const actions = {
  initArticle:  (context, payload) => {
    var articleId = payload;
    if(articleId) {
      return context.dispatch('setSavedArticle', articleId, {root: true})
    }else {
      context.commit('newArticle');
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
        context.dispatch('saveArticleTags',null,{root:true})
          .then(() => {
            //save done
          })
        return data;
      })
      .catch( err => {
        throw err;
      })
  },
  getArticlesOfCategory : (context, payload) => {
    api.getArticlesOfCategory(payload)
      .then(data => {
        //todo getArticlesOfCategory data ordering
        console.log(data)
        state.articleList = data;
      })
  },
  setSavedArticle: (context, payload) => {
    return api.getArticle(payload)
      .then(data => {
        context.commit('setArticle',data);
        context.commit('setInitialArticle',data);
      })
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
