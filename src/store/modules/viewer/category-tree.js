import CategoryTree from '@/model/category-tree/category-tree'
import Category from '@/model/Category.js'
import CategoryNode from '@/model/category-tree/category-node.js'
import api from "@/api/api";
import validator from '@/model/validator/validator.js'

const namespaced = true;
const state = {
  categoryTree: new CategoryTree(),
  selectedNode: null,
  oldSelectedNode: null,
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
  setCategoryTree: (state, payload) => {
    state.categoryTree = payload;
  },
  setCategoryList: (state, payload) => {
    state.categoryTree.setCategoryList(payload)
  },
  setSelectedNodeById: (state, payload) => {
    state.selectedNode = state.categoryTree.find(payload) //node id
  },
  setSelectedNode: (state, payload) => {
    state.selectedNode = payload;
  }
};
const actions = {
  initCategoryTree: (context, payload) => {
    const username = payload.username;

    //reset
    context.commit('setCategoryTree', new CategoryTree());
    context.commit('setSelectedNode', null);

    return api.getAllCategories(username)
      .then( data => {
        console.log(data);
        context.commit('setCategoryList',data);
        return this.categoryTree
      })
      .catch(err => {
        console.error(err)
        alert(err)
      })
  }

};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
