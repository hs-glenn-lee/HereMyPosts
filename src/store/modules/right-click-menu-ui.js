import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  isRightClickMenuShowing: false
};
const getters = {
  isRightClickMenuShowing: state => {
    return state.isRightClickMenuShowing;
  }
};
const mutations = {
  setRightClickMenuShowing: (state, payload) => {
    state.isRightClickMenuShowing = payload;
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
