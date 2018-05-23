import Vue from 'vue';
import Vuex from 'vuex';

import managerModule from '@/store/modules/manager.js'
import signModule from '@/store/modules/sign.js'
import categoryTreeModule from '@/store/modules/category-tree.js'
import article from '@/store/modules/article.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  modules: {
    managerModule,
    signModule,
    categoryTreeModule,
    article
  }
})
