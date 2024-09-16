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
      },
      {
        path: '/setup',
        name: 'GameSetup',
        component: () => import('@/views/GameSetup.vue'),
      },
      {
        path: '/overview/:players/:holes',
        name: 'Overview',
        component: () => import('@/views/Overview.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
