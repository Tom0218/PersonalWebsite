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
      component: () => import('../views/VtextAndVmodel.vue'),
      children: [
        {
          path: 'Note',
          component: () => import('../views/Note.vue')         
        },
        {
          path: 'About',
          component: () => import('../views/About.vue')         
        },
      ]
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
      path: '/RealEstate',
      name: 'RealEstate',
      component: () => import('../views/RealEstate.vue'),
      children: [
        {
          path: 'RealEstateLocationSearch',
          component: () => import('../components/RealEstateLocationSearch.vue')         
        },
        {
          path: 'RealEstateCenterAreaPage',
          component: () => import('../components/RealEstateCenterAreaPage.vue') 
        },
        {
          path: 'ObjectA',
          component: () => import('../components/ObjectA.vue') 
        },
        {
          path: 'RealEstateLogInPage',
          component: () => import('../components/RealEstateLogInPage.vue') 
        },
        {
          path: 'RealEstatePersonalPage',
          component: () => import('../components/RealEstatePersonalPage.vue') 
        },
        {
          path: 'RealEstateAsk',
          component: () => import('../components/RealEstateAsk.vue') 
        },
      ]
    },
    {
      path: '/WaterFall',
      name: 'WaterFall',
      component: () => import('../views/WaterFall.vue')
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
    {
      path: '/WatchandComputed',
      name: 'WatchandComputed',
      component: () => import('../views/WatchandComputed.vue')
    },
    {
      path: '/WeatherAPI',
      name: 'WeatherAPI',
      component: () => import('../views/WeatherAPI.vue')
    },
    {
      path: '/ProvideAndInject',
      name: 'ProvideAndInject',
      component: () => import('../views/ProvideAndInject.vue')
    },
    {
      path: '/FindPrimeNumbers',
      name: 'FindPrimeNumbers',
      component: () => import('../views/FindPrimeNumbers.vue')
    },
    {
      path: '/ExpenseTracker',
      name: 'ExpenseTracker',
      component: () => import('../views/ExpenseTracker.vue')
    },
    {
      path: '/ExpenseTrackerRegister',
      name: 'ExpenseTrackerRegister',
      component: () => import('../components//ExpenseTrackerRegister.vue')
    },
    {
      path: '/ExpenseTrackerMain',
      name: 'ExpenseTrackerMain',
      component: () => import('../components//ExpenseTrackerMain.vue')
    },
    {
      path: '/Note',
      name: 'Note',
      component: () => import('../views//Note.vue') 
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('../views//About.vue') 
    },
    {
      path: '/weatherAPIV2',
      name: 'weatherAPIV2',
      component: () => import('../views//weatherApiV2.vue') 
    },
    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: () => import('../views//Questionnaire.vue') 
    },
    {
      path: '/Test',
      name: 'Test',
      component: () => import('../views//Test.vue') 
    },
  ]
})

export default router
