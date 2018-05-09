import CategoryNode from '@/model/CategoryTree/CategoryNode'
import CategoryTree from '@/model/CategoryTree/CategoryTree'
import { axiosAppJson } from "../../model/axios-instances";

const state = {
  computed: {
  },
  categoryTree: {},
  created () {
    //start -> (loading) -> loaded
    this.categoryTree.state = 'start'
  }
};
const getters = {
  getCategoryTree () {

  },
  categoryTreeStatus () {

  }
};
const mutations = {

};
const actions = {
  load () {

  }
};

const api = {}
api.getCategoryList = function() {
  return axiosAppJson.get('/category/all')
    .then(res => {
      let catList = res.data
      return catList
    })
    .catch(err => {
      if(err.status === 403) {
        console.log(err)
      }
    })
};