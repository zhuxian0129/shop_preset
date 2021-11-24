import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/login/index.vue'

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', redirect: '/users',
    children: [
      // { path: '/home', name: 'home', component: () => import('@/views/home/component/welcome')},
      { path: '/users', name: 'users', component: () => import('@/views/userList/index')},
      { path: '/rights', name: 'rights', component: () => import('@/views/home/component/welcome')},
      { path: '/roles', name: 'roles', component: () => import('@/views/home/component/welcome')},
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

const path = ['/login', '/404']
// 路由导航守卫控制访问权限
router.beforeEach((to, from, next) =>{
  console.log(router.getRoutes())
  console.log(to)
  if(path.includes(to.path)) return next()
  const pathKey = window.sessionStorage.getItem('token')
  if(!pathKey) return next('/login')
  next()
})

Vue.use(VueRouter)

export default router
