import Vue from 'vue'
import App from './App'
import router from './router/router'

import './assets/css/reset.css'
import './assets/css/global.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
