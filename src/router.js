import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },{
    path: '/home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  },
  {
    path: '*',
    redirect: '404'
  }
]

const router = new VueRouter({
  routes
})

export default router
