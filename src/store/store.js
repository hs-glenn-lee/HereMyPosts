import Vue from 'vue';
import Vuex from 'vuex';

import manager from '@/store/modules/manager.js'
import sign from '@/store/modules/sign.js'
import categoryTree from '@/store/modules/category-tree.js'
import article from '@/store/modules/article.js'
import alert from '@/store/modules/alert.js';
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  modules: {
    manager,
    sign,
    categoryTree,
    article,
    alert
  }
})
