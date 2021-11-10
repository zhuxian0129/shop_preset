import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/css/reset.scss'

import api from './api/index'
Vue.prototype.$api = api

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
