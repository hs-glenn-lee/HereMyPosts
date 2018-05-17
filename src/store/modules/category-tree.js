import CategoryTree from '@/model/CategoryTree/CategoryTree'
import api from "@/api/api";

const state = {
  categoryTree: new CategoryTree()
};
const getters = {
  getCategoryTree: state => {
    return state.categoryTree
  },
  getCategoryTreeRoot: state => {
    return state.categoryTree.root;
  }
};
const mutations = {
  setCategoryList: (state, payload) => {
    state.categoryTree.setCategoryList(payload)
  }
};
const actions = {
  initCategoryTree: context => {
    console.log(context.state.categoryTree)
    if(!context.state.categoryTree.isEmpty()){
      return this.categoryTree
    }
    return api.getAllMyCategory()
      .then( data => {
        context.commit('setCategoryList',data );
        return this.categoryTree
      })
      .catch(err => alert(err))
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
