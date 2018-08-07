import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  isCategoryPaneShowing: false
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


};
export default {
  state,
  mutations,
  actions,
  getters
}
