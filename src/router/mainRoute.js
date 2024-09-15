import Home from '@/views/Home';
import ProductLanding from '@/views/Product/Landing';

export const routes =
{
  path: '/',
  meta: {
    requiresAuth: true
  },
  redirect: '/',
  component: () => import('@/layouts/template/Main.vue'),
  children: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue'), meta: { requiresAuth: true } },
    {
      path: '/product/:id?', name: 'product', component: () => import('@/views/Product/Landing.vue'), meta: { requiresAuth: true }
    },
    { path: '/warranty-claim', name: 'warranty-claim', component: () => import('@/views/WarrantyClaim/Landing.vue'), meta: { requiresAuth: true } },
  ]
}