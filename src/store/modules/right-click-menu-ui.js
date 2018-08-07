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
  setIsRightClickMenuShowing: (state, payload) => {
    state.isRightClickMenuShowing = payload;
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
