/** When your routing table is too long, you can split it into small modules **/

const commonRouter = [
  {path: '/main-about', component: () => import(/* webpackChunkName: "investanda_common" */'@/views/main/main-about.vue')},
  {path: '/charts/line', component: () => import(/* webpackChunkName: "investanda_common" */'@/views/charts/LineChartSample.vue')},
  // //common
  // {path: 'profile', component: () => import(/* webpackChunkName: "investanda_common" */'@/views/login/profile'),                         name: 'Profile',            meta: {title: 'Profile'}},
  // {path: 'main/content', component: () => import(/* webpackChunkName: "investanda_common" */'@/views/info/info-content'),                name: 'MainContent',       meta: {title: 'Main Content'}},

  // //board
  // {path: 'board/notice', component: () => import(/* webpackChunkName: "investanda_common" */'@/views/info/info-notice'), name: 'Board Notice', meta: {title: 'Board Notice'}},

  //error
  {path: '/404', component: () => import(/* webpackChunkName: "common" */'@/views/error-page/404.vue')}
]


export default commonRouter
