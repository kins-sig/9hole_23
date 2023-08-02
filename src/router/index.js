// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome.vue'),
      },
      {
        path: '/overview/:players/:holes',
        name: 'Overview',
        component: () => import('@/views/Overview.vue'),
      },
      {
        path: '/edit',
        name: 'Edit',
        component: () => import('@/views/EditView.vue'),
        props: { clickedHole: 7}
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
