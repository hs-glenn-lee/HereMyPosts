import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  isTagPaneShowing: false
};
const getters = {
  isTagPaneShowing: state => {
    return state.isTagPaneShowing;
  }
};
const mutations = {
  setIsTagPaneShowing: (state, payload) => {
    state.isTagPaneShowing = payload;
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
