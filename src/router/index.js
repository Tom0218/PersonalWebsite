import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/VtextAndVmodel',
      name: 'VtextAndVmodel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VtextAndVmodel.vue')
    },
    {
      path: '/Practice01',
      name: 'Practice01',
      component: () => import('../views/Practice01.vue')
    },
    {
      path: '/Practice02',
      name: 'Practice02',
      component: () => import('../views/Practice02.vue')
    },
    {
      path: '/GuessNumber',
      name: 'GuessNumber',
      component: () => import('../views/GuessNumber.vue')
    },
    {
      path: '/Snack',
      name: 'Snack',
      component: () => import('../views/Snack.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/WaterFall',
      name: 'WaterFall',
      component: () => import('../views/WaterFall.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/VifandVshow',
      name: 'VifandVshow',
      component: () => import('../views/VifandVshow.vue')
    },
    {
      path: '/Props',
      name: 'Props',
      component: () => import('../views/Props.vue')
      // chi
    },
    {
      path: '/Emit',
      name: 'Emit',
      component: () => import('../views/Emit.vue')
    },
    {
      path: '/PropsAndEmit',
      name: 'EmPropsAndEmitit',
      component: () => import('../views/PropsAndEmit.vue')
    },
  ]
})

export default router
