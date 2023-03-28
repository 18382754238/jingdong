import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/CartList',
    name: 'cartList',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/CartList/CartList.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/test.vue'),
  },
  {
    path: '/OrderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/orderConfirmation/orderConfirmation.vue'),
  },
  {
    path: '/OrderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/orderList/orderList.vue'),
  },
  {
    path: '/shop/:id',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/Shop.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "reigister" */ '@/views/register/register.vue'),
    beforeEnter(to,from,next){
      const {isLogin} =localStorage
      isLogin?next({name:'home'}):next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
    beforeEnter(to,from,next){
      const {isLogin} =localStorage
      isLogin?next({name:'home'}):next()
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.isLogin
  if(isLogin || to.name==='login' || to.name==='register'){
    next()
  }else{
    next({name:'login'})
  }
})

export default router
