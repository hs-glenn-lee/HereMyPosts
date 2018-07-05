import CategoryTree from '@/model/category-tree/category-tree'
import api from "@/api/api";

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
  },
  getOldSelectedNode: state => {
    return state.oldSelectedNode;
  },
  needToSaveSelectedCategory: state => {
    console.log('***needToSaveSelectedCategory')
    if(state.oldSelectedNode === null) {
      if(state.selectedNode === null) {
        return false;
      }else {
        return true;
      }
    }else {
      return !(state.oldSelectedNode.id === state.selectedNode.id);
    }
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
  },
  setOldSelectedNode: (state, payload) => {
    state.oldSelectedNode = payload;
  },
  setOldSelectedNodeById: (state, payload) => {
    state.oldSelectedNode = state.categoryTree.find(payload);
  }
};
const actions = {
  initCategoryTree: context => {
    //reset
    context.commit('setCategoryTree', new CategoryTree());
    context.commit('setSelectedNode', null);
    context.commit('setOldSelectedNode', null);

    if(!context.state.categoryTree.isEmpty()){
      return Promise.resolve(this.categoryTree);
    }
    return api.getAllMyCategory()
      .then( data => {
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
  getters
}
