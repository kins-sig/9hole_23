// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Authentication',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Authentication.vue'),
        props: true
      },
      {
        path: '/games/:user?',
        name: 'PreviousGames',
        component: () => import('@/views/GameTable.vue'),
        props: true
      },
      {
        path: '/setup/:user?',
        name: 'NewGame',
        component: () => import('@/views/GameSetup.vue'),
        props: true
      },
      {
        path: '/overview/:players?/:holes?/game/:game?',
        name: 'Overview',
        component: () => import('@/views/Overview.vue'),
        props: true
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
