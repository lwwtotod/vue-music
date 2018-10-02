// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import './common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(lazyload,{
  loading:require('common/image/loading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
