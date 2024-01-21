import { createRouter, createWebHistory } from 'vue-router'

import adminRouter from "@/router/modules/admin";
import commonRouter from "@/router/modules/common";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        { path: 'home', name: 'main', component: () => import('@/views/main/main.vue') },
        { path: 'welcome', name: 'welcome', component: () => import('@/views/main/main-welcome.vue'),},
        { path: 'subscribe', name: 'subscribe', component: () => import('@/views/main/main-welcome.vue'),},
        { path: 'about', name: 'about', component: () => import('@/views/main/main-about.vue') },
        ...adminRouter,
        ...commonRouter
      ]
    },



    // {
    //   path: '/404',
    //   name: '404',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/error-page/404.vue')
    // }
  ]
})

export default router
