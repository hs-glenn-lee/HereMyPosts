import CategoryTree from '@/model/category-tree/category-tree'
import Category from '@/model/Category.js'
import CategoryNode from '@/model/category-tree/category-node.js'
import api from "@/api/api";
import validator from '@/model/validator/validator.js'

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
        return true
      }
    }else {
      if(state.selectedNode === null) {
        return true
      }else {

        return !(state.oldSelectedNode.id === state.selectedNode.id);
      }
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
  },
  createCategoryNode: (context, payload) => {
    var parentId = payload.parentId;
    var newCategoryName = payload.newCategoryName;

    var parentCategoryNode = context.state.categoryTree.find(parentId);
    var newCategory = new Category(null, parentCategoryNode.id, newCategoryName, parentCategoryNode.children.length, false, false);

    try {
      validator.validate('createCategory', { newCategory, parentCategoryNode });
    }catch (err) {
      return Promise.reject(err);
    }

    return api.createCategory(newCategory)
      .then( data => {
        parentCategoryNode.addChild(new CategoryNode(data));
      });
  },
  updateCategory: (context, payload) => {//name, isPublic ---- {isDel, parentId, seq} won't updated
    var tobeCategory = payload.tobeCategory;
    var targetCategoryNode = context.state.categoryTree.find(tobeCategory.id);
    try {
      validator.validate('updateCategory', { tobeCategory, targetCategoryNode })
    }catch (err) {
      return Promise.reject(err);
    }
    return api.updateCategory(tobeCategory)
      .then( data => {
        Object.assign(targetCategoryNode, data);// critical
        console.log(targetCategoryNode);
      })
      .catch( err => {
        return Promise.reject(err);
      })
  },
  removeCategory: (context, payload) => {
    var categoryId = payload;
    var targetCat = context.state.categoryTree.find(categoryId).cloneAsCategory();
    return api.removeCategory(targetCat)
      .then( data => {
        var tree = context.state.categoryTree;
        tree.removeCategoryNode(categoryId);
        return data;
      })
      .catch( err => {
        return Promise.reject(err);
      })

  }

};
export default {
  state,
  mutations,
  actions,
  getters
}
