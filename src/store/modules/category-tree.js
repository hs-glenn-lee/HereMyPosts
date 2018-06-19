import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

const state = {
  categoryTree: new CategoryTree(),
  selectedNode: {}
};
const getters = {
  getCategoryTree: state => {
    return state.categoryTree
  },
  getCategoryTreeRoot: state => {
    return state.categoryTree.root;
  },
  getSelectedNode: state => {
    return state.selectedNode;
  }
};
const mutations = {
  setCategoryList: (state, payload) => {
    state.categoryTree.setCategoryList(payload)
  },
  setSelectedNode: (state, payload) => {
    state.selectedNode = state.categoryTree.find(payload) //node id
  }
};
const actions = {
  initCategoryTree: context => {

    if(!context.state.categoryTree.isEmpty()){
      return Promise.resolve(this.categoryTree);
    }
    return api.getAllMyCategory()
      .then( data => {
        context.commit('setCategoryList',data);
        return this.categoryTree
      })
      .catch(err => alert(err))
  },
  setSelectedNode: (context, payload) => {
    context.commit('setSelectedNode',payload)
  }

};
export default {
  state,
  mutations,
  actions,
  getters
}
