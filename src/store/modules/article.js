import api from '@/api/api'
import Article from '@/model/Article'
import validator from '@/model/validator/validator.js'
import PageParameter from "../../model/PageParameter";


const state = {
  article: null/*new Article(null, '', '<!DOCTYPE html><html><head></head><body></body></html>', '', 0, false, 0, null, null)*/,
  oldArticle: null, //to compare after modifiy article
  isSavedArticle: false,

  articleList: [],
  listOf: 'recent', //recent, category,
  sortDirection: 'desc', //desc, asc
  sortProperty: 'updateTimestamp', // updateTimestamp, title
  searchWord: ''
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
    var articleList = state.articleList;
    var direction = (state.sortDirection === 'desc')? -1 : 1 ;

    var filtered = [];
    //filter
    if( (state.searchWord) && state.searchWord !== '') {
      articleList.forEach( el => {
        if(el.title.indexOf(state.searchWord) > -1) {
          filtered.push(el);
        }
      })
    }else {
      filtered = state.articleList
    }

    //sort
    filtered.sort( (a, b) => {
      var ret = (a[state.sortProperty] < b[state.sortProperty])? -1 : (a[state.sortProperty] === b[state.sortProperty]) ? 0 : 1;
      return ret * direction
    });
    return filtered
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
  getListOf: state => {
    return state.listOf
  },
  getSortDirection: state => {
    return state.sortDirection
  },
  getSortProperty: state => {
    return state.sortProperty
  },
  getSearchWord: state => {
    return state.searchWord;
  },
  isValidArticleToSave: (state) => {
    try {
      validator.validate('saveArticle',state.article);
      return true;
    }catch (err) {
      return false;
    }
  },
  needToSaveArticle: state => {
    /*console.log('needToSaveArticle%%%%%%%%%%%%%%');*/

    if(state.oldArticle) {
      if(state.article) {
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
  },
  setArticleList: (state, payload) => {
    state.articleList = payload;
  },
  setListOf: (state, payload) => {
    state.listOf = payload;
  },
  setSortDirection: (state, payload) => {
    state.sortDirection = payload;

  },
  setSortProperty: (state, payload) => {
    state.sortProperty = payload;
  },
  setSearchWord: (state, payload) => {
    state.searchWord = payload;
  },
  sortArticleList: (state) => {
    var articleList = state.articleList;
    var direction = (state.sortDirection === 'desc')? -1 : 1 ;

    articleList.sort( (a, b) => {
      var ret = (a[state.sortProperty] < b[state.sortProperty])? -1 : (a[state.sortProperty] === b[state.sortProperty]) ? 0 : 1;
      return ret * direction
    })
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
    //extract summary
    let summary;
    var vSpan= document.createElement('span');
    vSpan.innerHTML= state.article.content;

    var children= vSpan.querySelectorAll('*');
    for(var i = 0 ; i < children.length ; i++) {
      if(children[i].textContent)
        children[i].textContent+= ' ';
      else
        children[i].innerText+= ' ';
    }
    summary = [vSpan.textContent || vSpan.innerText].toString().replace(/ +/g,' ');
    summary = (summary.length > 60)? summary.substring(0, 60) : summary;
    summary += ' ...';
    state.article.summary = summary;

    return api.saveArticle(state.article)
      .then( data => {
        return data;
      })
      .catch( err => {
        throw err;
      })
  },
  getArticlesOfCategory : (context, payload) => {
    return api.getArticlesOfCategory(payload)
      .then(data => {
        context.commit('setArticleList',data)
        context.commit('setListOf','category')
        context.commit('sortArticleList');
      })
  },
  getRecentArticles: (context, payload) => {
    var page = payload;
    var pageParameter = new PageParameter(page,10,'desc','updateTimestamp');
    var username = context.getters.getAccount.username;

    return api.getRecentArticles(username, pageParameter)
      .then( data => {
        context.commit('setArticleList', data);
        context.commit('setListOf','recent');
        context.commit('sortArticleList');
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
  },
  deleteArticle: (context, payload) => {
    var articleId = payload.articleId;
    return api.deleteArticle(articleId)
      .then( data => {
        var aList = context.state.articleList
        aList.forEach( (el, idx) => {
          if(el.id === articleId) {
            aList.splice(idx,1);
            return
          }
        });
        return data;
      })
      .catch( err => {
        return Promise.reject(err);
      })
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
