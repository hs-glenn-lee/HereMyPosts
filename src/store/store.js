import Vue from 'vue';
import Vuex from 'vuex';
import Sign from './modules/sign'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  modules: {
    Sign
  }
})
