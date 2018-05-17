import Vue from 'vue';
import Vuex from 'vuex';

import managerModule from '@/store/modules/manager.js'
import signModule from '@/store/modules/sign.js'
import categoryTreeModule from '@/store/modules/category-tree.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  modules: {
    managerModule,
    signModule,
    categoryTreeModule
  }
})
