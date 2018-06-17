import Vue from 'vue'
import VueComponent from 'vue'

import App from './App'
import router from './router/router'
import { store } from './store/store';

import './assets/css/reset.css'
import './assets/css/global.css'

import './assets/css/fonts/nanumbrush/font-nanumbrush.css'
import './assets/css/fonts/nanum-gothic/font-nanumgothic.css'

//textarea-plugin
import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize);

//import './assets/lang'
Vue.config.productionTip = false
/*
Vue.mixin({
  mounted() {//$el is undefined until mounted


    var rootEl = this.$el;
    if(rootEl.setAttribute){
      rootEl.setAttribute('component-name',this.$options.name);
    }

    console.log(this);
  }
});*/

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  name:'App'
})
