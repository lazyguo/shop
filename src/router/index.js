import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index.js'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home'
import tradeMark from '@/views/product/tradeMark'
import attr from '@/views/product/attr'
import sku from '@/views/product/sku'
import spu from '@/views/product/spu'
import DashBord from '../views/dashBord/index.vue'
import User from '../views/power/user'
import Role from '../views/power/role'
import Menu from '../views/power/menu'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    redirect: '/dashBord'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/dashBord',
        name: 'dashBord',
        component: DashBord
      }
    ]
  },
  {
    path: '/power',
    name: 'power',
    component: Home,
    children: [
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/role',
        name: 'role',
        component: Role
      },
      {
        path: '/menu',
        name: 'menu',
        component: Menu
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: Home,
    children: [
      {
        path: '/tradeMark',
        name: 'tradeMark',
        component: tradeMark
      },
      {
        path: '/attr',
        name: 'attr',
        component: attr
      },
      {
        path: '/sku',
        name: 'sku',
        component: sku
      },
      {
        path: '/spu',
        name: 'spu',
        component: spu
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('TOKEN')
    if (token === null) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
