// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import PullTo from 'vue-pull-to'
import footer from './views/footer'
import axios from 'axios'
import wx from 'weixin-js-sdk'


import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Cookies from 'js-cookie' //引入Cookies
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import applyList from './assets/js/applyList.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'lib-flexible'
import './assets/scss/common.scss'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(applyList)
Vue.config.productionTip = false
// Vue.prototype.$Cookies = Cookies   //引入Cookies



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
