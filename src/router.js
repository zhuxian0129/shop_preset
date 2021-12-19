import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', component: () => import('@/views/home/index'),
    children: [
      { path: '/home', name: 'home', component: () => import('@/views/home/component/welcome')},
      { path: '/users', name: 'users', component: () => import('@/views/userList/index')},
      { path: '/rights', name: 'rights', component: () => import('@/views/role/right')},
      { path: '/roles', name: 'roles', component: () => import('@/views/role/role')},
      { path: '/goods', name: 'goods', component: () => import('@/views/home/component/welcome')},
      { path: '/params', name: 'params', component: () => import('@/views/home/component/welcome')},
      { path: '/categories', name: 'categories', component: () => import('@/views/home/component/welcome')},
      { path: '/orders',name: 'orders', component: () => import('@/views/home/component/welcome')},
      { path: '/reports',name: 'reports', component: () => import('@/views/home/component/welcome')}
    ]
  },
  { path: '/404', name: '404', component: () => import('@/views/404') },
  { path: '*', redirect: '404' }
]

const router = new VueRouter({
  routes
})

export default router
