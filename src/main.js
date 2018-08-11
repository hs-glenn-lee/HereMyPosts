import Vue from 'vue'
import VueComponent from 'vue'

import App from './App'
import router from './router/router'
import { store } from './store/store';

import './assets/css/reset.css'
import './assets/css/global.css'

import './assets/css/fonts/nanumbrush/font-nanumbrush.css'
import './assets/css/fonts/nanum-gothic/font-nanumgothic.css'

import './assets/prism/prism.css'
import './assets/prism/prism.js'

//textarea-plugin
import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize);

Vue.filter('timestampToPastTimeString', function (timestamp) {
  let date = new Date(timestamp);
  const currentDate = new Date();

  const diffYear = currentDate.getFullYear() - date.getFullYear();
  if(diffYear > 0) {
    return diffYear + ' 년 전';
  }

  const diffMonth = currentDate.getMonth() - date.getMonth();
  if(diffMonth > 0) {
    return diffMonth + ' 개월 전';
  }

  const diffDate = currentDate.getDate() - date.getDate();
  if(diffDate > 0) {
    return diffDate + ' 일 전';
  }
  const diffHours = currentDate.getHours() - date.getHours();
  if(diffDate > 0) {
    return diffDate + ' 시간 전';
  }

  const diffMinute = currentDate.getMinutes() - date.getMinutes();
  if(diffDate > 0) {
    return diffDate + ' 분 전';
  }

  return '방금 전';
});

Vue.filter('toLocalDateString', function (timestamp) {


});



//import './assets/lang'
Vue.config.productionTip = false
/*
Vue.mixin({
  mounted() {//$el is undefined until mounted


    var rootEl = this.$el;
    if(rootEl.setAttribute){
      rootEl.setAttribute('component-name',this.$options.name);
    }

    (this);
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
