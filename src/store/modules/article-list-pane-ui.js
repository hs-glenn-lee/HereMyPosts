import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  isArticleListPaneShowing: true,
  isArticleListLoading: false
};
const getters = {
  isArticleListPaneShowing: state => {
    return state.isArticleListPaneShowing;
  },
  isArticleListLoading: state => {
    return state.isArticleListLoading;
  }
};
const mutations = {
  setArticleListPaneShowing: (state, payload) => {
    state.isArticleListPaneShowing = payload;
  },
  setIsArticleListLoading: (state, payload) => {
    state.isArticleListLoading = payload;
  }
};
const actions = {
  /*initCategoryTree: context => {
    console.log('initCategoryTree')


  }*/

};
export default {
  state,
  mutations,
  actions,
  getters
}
