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

const path = ['/login', '/404']
// 路由导航守卫控制访问权限
router.beforeEach((to, from, next) =>{
  if(path.includes(to.path)) return next()
  const pathKey = window.sessionStorage.getItem('token')
  if(!pathKey) return next('/login')
  next()
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
