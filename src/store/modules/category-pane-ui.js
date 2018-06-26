import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  isCategoryPaneShowing: true
};
const getters = {
  isCategoryPaneShowing: state => {
    return state.isCategoryPaneShowing;
  }
};
const mutations = {
  setCategoryPaneIsShowing: (state, payload) => {
    state.isCategoryPaneShowing = payload;
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
