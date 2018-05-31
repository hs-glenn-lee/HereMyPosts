import Vue from 'vue'
import VueComponent from 'vue'
import App from './App'
import router from './router/router'
import { store } from './store/store';

import './assets/css/reset.css'
import './assets/css/global.css'

import './assets/css/fonts/nanumbrush/font-nanumbrush.css'
//import './assets/lang'
Vue.config.productionTip = false

Vue.mixin({
  mounted() {//$el is undefined until mounted
    if(this.$el.setAttribute){
      this.$el.setAttribute('component-name',this.$options.name);
    }
  }
});

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  name:'App'
})
