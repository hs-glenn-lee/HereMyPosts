import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  isArticleListPaneShowing: true
};
const getters = {
  isArticleListPaneShowing: state => {
    return state.isArticleListPaneShowing;
  }
};
const mutations = {
  setArticleListPaneShowing: (state, payload) => {
    state.isArticleListPaneShowing = payload;
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
