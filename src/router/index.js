// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [  
  {
    path: '/',  name: 'Main',
    component: () => import('@/views/Home')
  },
  {
    path: '/demo',   name: 'Demo',
    component: () => import('@/views/Demo')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
